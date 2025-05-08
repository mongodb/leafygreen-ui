import { connectToMongoDB } from './utils/connectToMongoDB';
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
      await recursiveCrawlFromBaseURL({
        baseUrl: source.url,
        collectionName: source.collection,
        mongoClient,
        maxDepth: 3,
      });
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
