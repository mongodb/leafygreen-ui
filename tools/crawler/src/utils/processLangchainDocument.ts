/* eslint-disable no-console */
import { Document as LangChainDocument } from '@langchain/core/documents';
import chalk from 'chalk';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { type MongoClient } from 'mongodb';

import { CrawlerDocument, CrawlerDocumentWithEmbeddings } from '../types';
import { vectorize } from '../vectorize';

import { createChecksum } from './createChecksum';
import { insertDocuments } from './insertDocuments';
import { makeLangChainDocumentMapper } from './mapLangChainDocument';

export interface ProcessLangchainDocumentOptions {
  doc: LangChainDocument;
  title: string;
  href: string;
  collectionName: string;
  mongoClient: MongoClient;
  createEmbeddings?: boolean;
  verbose?: boolean;
  dryRun?: boolean;
}

export interface ProcessLangchainDocumentResult {
  docCount: number;
  documents?: Array<CrawlerDocument>;
}

const _emptyResult: ProcessLangchainDocumentResult = {
  docCount: 0,
};

/**
 * Process a single LangChain document.
 *
 * split the text into chunks,
 * creates vector embeddings,
 * and store results in MongoDB.
 *
 * Additionally, extracts and returns all links found on the page
 * for further recursive crawling.
 */
export async function processLangchainDocument({
  doc,
  title,
  href,
  collectionName,
  mongoClient,
  createEmbeddings = true,
  verbose = false,
  dryRun = false,
}: ProcessLangchainDocumentOptions): Promise<ProcessLangchainDocumentResult> {
  try {
    verbose &&
      console.log(chalk.gray(`Loaded document`, `"${chalk.bold(title)}"`));

    // Split text into chunks for better processing/storage
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const chunkedDocs = await textSplitter.splitDocuments([doc]);

    verbose &&
      console.log(chalk.gray(`Split into ${chunkedDocs.length} chunks`));

    const checksum = createChecksum(href, doc.pageContent);

    let documents: Array<CrawlerDocument | CrawlerDocumentWithEmbeddings> =
      chunkedDocs.map(makeLangChainDocumentMapper({ title, href, checksum }));

    if (chunkedDocs.length <= 0) {
      verbose &&
        console.log(chalk.gray(`No content to process for URL: ${href}`));
      return {
        ..._emptyResult,
      };
    }

    let docCount = 0;

    if (dryRun) {
      if (verbose) {
        console.log(
          chalk.yellow(
            `[DRY RUN] Would embed & insert ${documents.length} documents into collection: "${collectionName}"`,
          ),
        );
      }
      // For dry run, we'll count the documents that would have been processed
      docCount = documents.length;
    } else {
      if (createEmbeddings) {
        // Create embeddings for each document before inserting into MongoDB
        verbose && console.log(chalk.blue('Vectorizing documents...'));

        // Process documents one by one to create vector embeddings;
        documents = (await Promise.all(
          documents.map(async (doc: CrawlerDocument) => {
            try {
              return await vectorize(doc);
            } catch (error) {
              console.error(
                chalk.red(`Error vectorizing document for URL ${doc.Link}:`),
                chalk.gray(error),
              );
              // Return the original document without embeddings if vectorization fails
              return doc;
            }
          }),
        )) as Array<CrawlerDocumentWithEmbeddings>;

        verbose &&
          console.log(
            chalk.green(
              `Successfully vectorized ${documents.length} documents`,
            ),
          );
      }
    }

    await insertDocuments({
      mongoClient,
      collectionName,
      documents,
      verbose,
    });

    return {
      docCount,
      documents,
    };
  } catch (error) {
    console.error(
      chalk.red(`Error processing URL ${href}:`),
      chalk.gray(error),
    );
    return _emptyResult;
  }
}
