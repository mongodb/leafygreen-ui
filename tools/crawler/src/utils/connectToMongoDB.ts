/* eslint-disable no-console */
import chalk from 'chalk';
import { MongoClient } from 'mongodb';

import { MDB_URI } from '../constants';

/**
 * Connect to MongoDB
 */
export async function connectToMongoDB() {
  try {
    // Use the Atlas cluster URI instead of local MongoDB
    const uri = MDB_URI;
    const client = new MongoClient(uri);
    await client.connect();
    console.log(chalk.green('Connected to MongoDB Atlas'));
    return client;
  } catch (error) {
    console.error(chalk.red('Error connecting to MongoDB Atlas:'), error);
    throw error;
  }
}
