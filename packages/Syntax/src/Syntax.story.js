import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import Syntax from '.';
import { SupportedLanguages } from './types';

const codeSnippet = `\
const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';
const client = new MongoClient(url);

// Use connect method to connect to the server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertDocuments(db, function() {
    client.close();
  });
});
`;

storiesOf('Syntax', module).add('Syntax', () => (
  <Syntax
    lang={select(
      'language',
      [...Object.values(SupportedLanguages), 'auto'],
      'auto',
    )}
  >
    {codeSnippet}
  </Syntax>
));
