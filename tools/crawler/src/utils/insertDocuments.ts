/* eslint-disable no-console */
import chalk from 'chalk';
import {
  Document as MDBDocument,
  InsertManyResult,
  MongoClient,
} from 'mongodb';

import { MDB_DB } from '../constants';
import { CrawlerDocument, CrawlerDocumentWithEmbeddings } from '../types';

export const insertDocuments = async ({
  documents,
  collectionName,
  mongoClient,
  verbose,
}: {
  documents: Array<CrawlerDocument | CrawlerDocumentWithEmbeddings>;
  collectionName: string;
  mongoClient: MongoClient;
  verbose?: boolean;
}): Promise<{
  docCount: number;
  result?: InsertManyResult<MDBDocument>;
}> => {
  let docCount = 0;
  let result: InsertManyResult<MDBDocument> | undefined = undefined;

  const db = mongoClient.db(MDB_DB);
  const collection = db.collection(collectionName);

  verbose &&
    console.log(
      chalk.green(
        `Inserting ${documents.length} documents into collection: "${collectionName}"`,
      ),
    );

  if (documents.length > 0) {
    result = await collection.insertMany(documents);
    docCount = result.insertedCount;

    verbose &&
      console.log(
        chalk.gray(
          `Successfully inserted ${result.insertedCount} documents into collection ${collectionName}`,
        ),
      );
  } else {
    verbose && console.log(chalk.gray(`No documents to insert`));
  }

  return { docCount, result };
};
