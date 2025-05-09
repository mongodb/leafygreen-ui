import { connectToMongoDB } from './utils/connectToMongoDB';
import { processLangchainDocument } from './utils/processLangchainDocument';
import { recursiveCrawlFromBaseURL } from './utils/recursiveCrawlFromBase';
import { SOURCES } from './constants';

/**
 * AWS Lambda handler function to crawl websites
 */
exports.handler = async (_e: any) => {
  const mongoClient = await (async () => {
    try {
      return await connectToMongoDB();
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  })();

  try {
    for (const source of SOURCES) {
      await recursiveCrawlFromBaseURL(
        ({ document, title, href }) =>
          processLangchainDocument({
            doc: document,
            title,
            href,
            collectionName: source.collection,
            mongoClient,
          }),
        {
          baseUrl: source.url,
          maxDepth: 3,
        },
      );
    }
  } catch (error) {
    console.error('Error during crawling:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success', data: SOURCES }),
  };
};
