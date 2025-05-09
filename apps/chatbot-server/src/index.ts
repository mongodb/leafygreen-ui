import {
  AppConfig,
  logger,
  makeApp,
  SystemPrompt,
} from 'mongodb-chatbot-server';

import { initChatBot } from './init';

// System prompt for chatbot
const systemPrompt: SystemPrompt = {
  role: 'system',
  content: `You are an assistant to users of the MongoDB Chatbot Framework.
Answer their questions about the framework in a friendly conversational tone.
Format your answers in Markdown.
Be concise in your answers.
`,
};

const {
  llm,
  embeddedContentStore,
  generateUserPrompt,
  mongodbClient,
  conversations,
} = await initChatBot();

// Create the MongoDB Chatbot Server Express.js app configuration
const config: AppConfig = {
  conversationsRouterConfig: {
    llm,
    conversations,
    generateUserPrompt,
    systemPrompt,
  },
  maxRequestTimeoutMs: 30000,
};

// Start the server and clean up resources on SIGINT.
const PORT = process.env.PORT || 3030;

const startServer = async () => {
  logger.info('Starting server...');
  const app = await makeApp(config);
  const server = app.listen(PORT, () => {
    logger.info(`Server listening on port: ${PORT}`);
  });

  process.on('SIGINT', async args => {
    logger.info('SIGINT signal received', args);
    await mongodbClient.close();
    await embeddedContentStore.close();
    await new Promise<void>((resolve, reject) => {
      server.close((error: any) => {
        error ? reject(error) : resolve();
      });
    });
    process.exit(1);
  });
};

try {
  startServer();
} catch (e) {
  logger.error(`Fatal error: ${e}`);
  process.exit(1);
}
