/* eslint-disable no-console */
import chalk from 'chalk';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { type MongoClient } from 'mongodb';

import { CrawlerDocument, CrawlerDocumentWithEmbeddings } from '../types';
import { vectorize } from '../vectorize';

import { checkRobots } from './checkRobots';
import { createChecksum } from './createChecksum';
import { insertDocuments } from './insertDocuments';
import { loadPageContents } from './loadPageContents';
import { makeLangChainDocumentMapper } from './mapLangChainDocument';

interface ProcessSingleUrlOptions {
  href: string;
  collectionName: string;
  mongoClient: MongoClient;
  verbose?: boolean;
  dryRun?: boolean;
}

interface ProcessSingleUrlResult {
  docCount: number;
  links: Array<string>;
  documents?: Array<CrawlerDocument>;
}

const _emptyResult = {
  docCount: 0,
  links: [],
};

/**
 * Process a single URL using LangChain,
 * scrape the page contents,
 * split the text into chunks,
 * creates vector embeddings,
 * and store results in MongoDB.
 *
 * Additionally, extracts and returns all links found on the page
 * for further recursive crawling.
 */
export async function processSingleUrl({
  href,
  collectionName,
  mongoClient,
  verbose = false,
  dryRun = false,
}: ProcessSingleUrlOptions): Promise<ProcessSingleUrlResult> {
  try {
    verbose && console.log(chalk.gray(`Processing URL:`), chalk.blue(href));
    const { hostname, pathname } = new URL(href);

    const isCrawlingAllowed = checkRobots(hostname, pathname, verbose);

    if (!isCrawlingAllowed) {
      verbose &&
        console.log(
          chalk.red(
            `Crawling disallowed by robots.txt for ${hostname}. Skipping...`,
          ),
        );
      return _emptyResult;
    }

    const { doc, title, links } = await loadPageContents(href);

    verbose &&
      console.log(
        chalk.gray(
          `Loaded document`,
          `"${chalk.bold(title)}"`,
          `from`,
          chalk.blue(href),
        ),
      );

    // Split text into chunks for better processing/storage
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const chunkedDocs = await textSplitter.splitDocuments([doc]);

    verbose &&
      console.log(chalk.gray(`Split into ${chunkedDocs.length} chunks`));

    const checksum = createChecksum(href, doc.pageContent);

    const documents = chunkedDocs.map(
      makeLangChainDocumentMapper({ title, href, checksum }),
    );

    if (chunkedDocs.length <= 0) {
      verbose &&
        console.log(chalk.gray(`No content to process for URL: ${href}`));
      return {
        ..._emptyResult,
        links,
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
      // Create embeddings for each document before inserting into MongoDB
      verbose && console.log(chalk.blue('Vectorizing documents...'));

      // Process documents one by one to create vector embeddings;
      const documentsWithEmbeddings: Array<CrawlerDocumentWithEmbeddings> =
        (await Promise.all(
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
            `Successfully vectorized ${documentsWithEmbeddings.length} documents`,
          ),
        );
    }

    await insertDocuments({
      mongoClient,
      collectionName,
      documents,
      verbose,
    });

    return {
      docCount,
      links,
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
