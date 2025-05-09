import { AzureOpenAI } from 'mongodb-rag-core/openai';

interface TestOpenAIClientParams {
  client: AzureOpenAI;
  model: string;
  type?: 'embedding' | 'chat';
  timeoutMs?: number;
}

export const testOpenAIClient = async ({
  client,
  model,
  type = 'embedding',
  timeoutMs = 5000,
}: TestOpenAIClientParams) => {
  try {
    // eslint-disable-next-line no-console
    console.log(`✨ Testing Azure OpenAI client with ${type} model...`);

    // Define the test request based on model type
    const testPromise =
      type === 'embedding'
        ? client.embeddings.create({
            input: 'test connection',
            model,
          })
        : client.chat.completions.create({
            messages: [{ role: 'user', content: 'Hello, test connection' }],
            model,
          });

    // Set a timeout to catch if the request hangs
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(
        () => reject(new Error('Azure OpenAI client connection timed out')),
        timeoutMs,
      );
    });

    // Race the request against the timeout
    return await Promise.race([testPromise, timeoutPromise]);
  } catch (error) {
    throw new Error(
      `Failed to connect to Azure OpenAI: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
};
