import { CredalClient } from '@credal/sdk';
import {
  execFileSync,
  ExecFileSyncOptionsWithStringEncoding,
} from 'child_process';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import {
  ChatLlm,
  LlmAnswerQuestionParams,
  OpenAiAwaitedResponse,
  OpenAiChatMessage,
  OpenAiStreamingResponse,
} from 'mongodb-rag-core';

interface CredalLlmConfig {
  credalBaseUrl: string;
  credalApiKey: string;
  credalAgentId: string;
  credalUserEmail: string;
  kanopyBinaryPath?: string;
}

function generateKanopyToken(kanopyBinaryPath?: string): string {
  const actualKanopyBinaryPath = kanopyBinaryPath || 'kanopy-oidc';

  if (!fs.existsSync(actualKanopyBinaryPath)) {
    throw new Error(`Kanopy binary not found at ${actualKanopyBinaryPath}`);
  }

  const options: ExecFileSyncOptionsWithStringEncoding = {
    encoding: 'utf-8',
    timeout: 15000, // Timeout to prevent indefinite hanging
  };

  try {
    const stdout: string = execFileSync(
      actualKanopyBinaryPath,
      ['login'],
      options,
    );
    const token = stdout.trim();

    if (!token) {
      // The binary might output to stderr on success for some reason or exit without error but no token
      console.warn(
        `Kanopy binary at ${actualKanopyBinaryPath} produced an empty token.`,
      );
      throw new Error('Kanopy binary returned an empty token.');
    }

    return token;
  } catch (error: any) {
    let errorMessage = `Error generating Kanopy token with ${actualKanopyBinaryPath}`;

    if (error.stderr) {
      errorMessage += `\nStderr: ${error.stderr.toString().trim()}`;
    }

    if (error.stdout) {
      errorMessage += `\nStdout: ${error.stdout.toString().trim()}`;
    }

    if (error.message) {
      errorMessage += `\nMessage: ${error.message}`;
    }

    if (error.status) {
      errorMessage += `\nExit Code: ${error.status}`;
    }

    if (error.signal) {
      errorMessage += `\nSignal: ${error.signal}`;
    }
    console.error(errorMessage, error);
    const runtimeError = new Error(errorMessage);
    throw runtimeError;
  }
}

export function makeCredalChatLlm(config: CredalLlmConfig): ChatLlm {
  const credalClient = new CredalClient({
    baseUrl: config.credalBaseUrl,
    apiKey: config.credalApiKey,
  });

  const internalSendMessage = async (userMessage: string): Promise<string> => {
    const kanopyToken = generateKanopyToken(config.kanopyBinaryPath);

    const response = await credalClient.copilots.sendMessage(
      {
        agentId: config.credalAgentId,
        message: userMessage,
        userEmail: config.credalUserEmail, // Consider how to make this dynamic if needed
      },
      {
        headers: {
          'X-Kanopy-Authorization': `Bearer ${kanopyToken}`,
        },
      },
    );

    if (response.sendChatResult.type === 'blocked_result') {
      throw new Error(`Error: message blocked`);
    }

    return response.sendChatResult.response.message;
  };

  // Helper to convert OpenAI style messages to a single string for Credal
  const formatMessagesForCredal = (
    messages: Array<OpenAiChatMessage>,
  ): string => {
    if (!messages.length) return '';
    return messages.map(m => `${m.role}: ${m.content}`).join('\n---\n');
  };

  const answerQuestionAwaited = async ({
    messages,
  }: LlmAnswerQuestionParams): Promise<OpenAiAwaitedResponse> => {
    console.log('answerQuestionAwaited()');

    const userMessage = formatMessagesForCredal(messages);

    if (!userMessage) {
      console.warn(
        'Formatted message for Credal is empty. Messages:',
        messages,
      );
      return { role: 'assistant', content: '' };
    }

    try {
      const responseContent = await internalSendMessage(userMessage);
      return {
        role: 'assistant',
        content: responseContent,
      };
    } catch (error: any) {
      console.error('Error in Credal answerQuestionAwaited:', error.message);
      throw new Error(
        `Failed to get awaited response from Credal: ${error.message}`,
      );
    }
  };

  // This is the actual async generator that produces the stream
  async function* streamLogic(
    params: LlmAnswerQuestionParams,
  ): OpenAiStreamingResponse {
    const { messages } = params;
    const userMessage = formatMessagesForCredal(messages);
    const streamId = `credal-chatcmpl-${randomUUID()}`; // Generate a unique ID for the stream
    const creationTimestamp = Math.floor(Date.now() / 1000); // Unix timestamp in seconds

    if (!userMessage) {
      console.warn(
        'Formatted message for Credal in stream is empty. Messages:',
        messages,
      );
      // Yield an empty completion
      yield {
        id: streamId,
        created: creationTimestamp,
        choices: [
          {
            index: 0,
            delta: { role: 'assistant', content: '' },
            finish_reason: 'stop',
          },
        ],
      };
      return;
    }

    try {
      const responseContent = await internalSendMessage(userMessage);
      // Simulate streaming: send the whole message in one chunk.
      // For true streaming, Credal would need to support a streaming API.
      yield {
        id: streamId,
        created: creationTimestamp,
        choices: [
          {
            index: 0,
            delta: { role: 'assistant', content: responseContent },
            finish_reason: 'stop',
          },
        ],
      };
    } catch (error: any) {
      console.error('Error in Credal answerQuestionStream:', error.message);
      throw new Error(
        `Failed to get streaming response from Credal: ${error.message}`,
      );
    }
  }

  // Async generator
  const answerQuestionStream = async (
    params: LlmAnswerQuestionParams,
  ): Promise<OpenAiStreamingResponse> => {
    console.log('answerQuestionStream()');
    return streamLogic(params);
  };

  return {
    answerQuestionAwaited,
    answerQuestionStream,
  };
}
