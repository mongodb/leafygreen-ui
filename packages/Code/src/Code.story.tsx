import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { Variant, Lang } from '@leafygreen-ui/syntax';
import Code from '.';

const codeSnippets: { [K in string]: string } = {
  [Lang.Javascript]: `
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
`,

  [Lang.Ruby]: `\
require 'mongo/collection/view/builder'
require 'mongo/collection/view/immutable'
require 'mongo/collection/view/iterable'
require 'mongo/collection/view/explainable'
require 'mongo/collection/view/aggregation'
require 'mongo/collection/view/change_stream'
require 'mongo/collection/view/map_reduce'
require 'mongo/collection/view/readable'
require 'mongo/collection/view/writable'

module Mongo
  class Collection

    # Representation of a query and options producing a result set of documents.
    #
    # A +View+ can be modified using helpers. Helpers can be chained,
    # as each one returns a +View+ if arguments are provided.
    #
    # The query message is sent to the server when a "terminator" is called.
    # For example, when #each is called on a +View+, a Cursor object is
    # created, which then sends the query to the server.
    #
    # A +View+ is not created directly by a user. Rather, +View+
    # creates a +View+ when a CRUD operation is called and returns it to
    # the user to interact with.
    #
    # @note The +View+ API is semipublic.
    # @api semipublic
    class View
      extend Forwardable
      include Enumerable
      include Immutable
      include Iterable
      include Readable
      include Retryable
      include Explainable
      include Writable

      # @return [ Collection ] The +Collection+ to query.
      attr_reader :collection

      # @return [ Hash ] The query filter.
      attr_reader :filter

      # Delegate necessary operations to the collection.
      def_delegators :collection,
                      :client,
                      :cluster,
                      :database

      # Delegate to the cluster for the next primary.
      def_delegators :cluster, :next_primary

      alias :selector :filter

      # Compare two +View+ objects.
      #
      # @example Compare the view with another object.
      #   view == other
      #
      # @return [ true, false ] Equal if collection, filter, and options of two
      #   +View+ match.
      #
      # @since 2.0.0
      def ==(other)
        return false unless other.is_a?(View)
        collection == other.collection &&
            filter == other.filter &&
            options == other.options
      end
      alias_method :eql?, :==

      # A hash value for the +View+ composed of the collection namespace,
      # hash of the options and hash of the filter.
      #
      # @example Get the hash value.
      #   view.hash
      #
      # @return [ Integer ] A hash value of the +View+ object.
      #
      # @since 2.0.0
      def hash
        [ collection.namespace, options.hash, filter.hash ].hash
      end

      # Creates a new +View+.
      #
      # @example Find all users named Emily.
      #   View.new(collection, {:name => 'Emily'})
      #
      # @example Find all users named Emily skipping 5 and returning 10.
      #   View.new(collection, {:name => 'Emily'}, :skip => 5, :limit => 10)
      #
      # @example Find all users named Emily using a specific read preference.
      #   View.new(collection, {:name => 'Emily'}, :read => :secondary_preferred)
      #
      # @param [ Collection ] collection The +Collection+ to query.
      # @param [ Hash ] filter The query filter.
      # @param [ Hash ] options The additional query options.
      #
      # @option options :comment [ String ] Associate a comment with the query.
      # @option options :batch_size [ Integer ] The number of docs to return in
      #   each response from MongoDB.
      # @option options :fields [ Hash ] The fields to include or exclude in
      #   returned docs.
      # @option options :hint [ Hash ] Override default index selection and force
      #   MongoDB to use a specific index for the query.
      # @option options :limit [ Integer ] Max number of docs to return.
      # @option options :max_scan [ Integer ] Constrain the query to only scan the
      #   specified number of docs. Use to prevent queries from running too long.
      #   Deprecated as of MongoDB server version 4.0.
      # @option options :read [ Symbol ] The read preference to use for the query.
      #   If none is provided, the collection's default read preference is used.
      # @option options :show_disk_loc [ true, false ] Return disk location info as
      #   a field in each doc.
      # @option options :skip [ Integer ] The number of documents to skip.
      # @option options :snapshot [ true, false ] Prevents returning a doc more than
      #   once. Deprecated as of MongoDB server version 4.0.
      # @option options :sort [ Hash ] The key and direction pairs used to sort the
      #   results.
      # @option options [ Hash ] :collation The collation to use.
      #
      # @since 2.0.0
      def initialize(collection, filter = {}, options = {})
        validate_doc!(filter)
        @collection = collection
        parse_parameters!(BSON::Document.new(filter), BSON::Document.new(options))
      end

      # Get a human-readable string representation of +View+.
      #
      # @example Get the inspection.
      #   view.inspect
      #
      # @return [ String ] A string representation of a +View+ instance.
      #
      # @since 2.0.0
      def inspect
        "#<Mongo::Collection::View:0x#{object_id} namespace='#{collection.namespace}'" +
            " @filter=#{filter.to_s} @options=#{options.to_s}>"
      end

      # Get the write concern on this +View+.
      #
      # @example Get the write concern.
      #   view.write_concern
      #
      # @return [ Mongo::WriteConcern ] The write concern.
      #
      # @since 2.0.0
      def write_concern
        WriteConcern.get(options[:write] || options[:write_concern] || collection.write_concern)
      end

      private

      def initialize_copy(other)
        @collection = other.collection
        @options = other.options.dup
        @filter = other.filter.dup
      end

      def parse_parameters!(filter, options)
        query = filter.delete(QUERY)
        modifiers = (filter || {}).merge(options.delete(MODIFIERS) || {})
        @filter = (query || filter).freeze
        @options = Builder::Modifiers.map_driver_options(modifiers).merge!(options).freeze
      end

      def new(options)
        View.new(collection, filter, options)
      end

      def apply_collation!(doc, server, opts = {})
        if coll = doc[:collation] || opts[:collation] || opts['collation'] || collation
          validate_collation!(server, coll)
          doc[:collation] = coll
        end
      end

      def validate_collation!(server, coll)
        if coll &&!server.features.collation_enabled?
          raise Error::UnsupportedCollation.new
        end
      end

      def view; self; end

      def with_session(opts = {}, &block)
        client.send(:with_session, @options.merge(opts), &block)
      end
    end
  end
end
  `,

  [Lang.Java]: `
package com.mongodb;

import com.mongodb.lang.Nullable;
import org.bson.BsonDocument;
import org.bson.BsonString;

import static com.mongodb.assertions.Assertions.notNull;

/**
 * A read concern allows clients to choose a level of isolation for their reads.
 *
 * @mongodb.server.release 3.2
 * @mongodb.driver.manual reference/readConcern/ Read Concern
 * @since 3.2
 */
public final class ReadConcern {
  private final ReadConcernLevel level;

  /**
   * Construct a new read concern
   *
   * @param level the read concern level
   */
  public ReadConcern(final ReadConcernLevel level) {
    this.level = notNull("level", level);
  }

  /**
   * Use the servers default read concern.
   */
  public static final ReadConcern DEFAULT = new ReadConcern();

  /**
   * The local read concern.
   */
  public static final ReadConcern LOCAL = new ReadConcern(ReadConcernLevel.LOCAL);

  /**
   * The majority read concern.
   */
  public static final ReadConcern MAJORITY = new ReadConcern(ReadConcernLevel.MAJORITY);

  /**
   * The linearizable read concern.
   *
   * <p>
   * This read concern is only compatible with {@link ReadPreference#primary()}.
   * </p>
   *
   * @since 3.4
   * @mongodb.server.release 3.4
   */
  public static final ReadConcern LINEARIZABLE = new ReadConcern(ReadConcernLevel.LINEARIZABLE);

  /**
   * The snapshot read concern.
   *
   * @since 3.8
   * @mongodb.server.release 4.0
   */
  public static final ReadConcern SNAPSHOT = new ReadConcern(ReadConcernLevel.SNAPSHOT);

  /**
   * The available read concern.
   *
   * @since 3.9
   * @mongodb.server.release 3.6
   */
  public static final ReadConcern AVAILABLE = new ReadConcern(ReadConcernLevel.AVAILABLE);

  /**
   * Gets the read concern level.
   *
   * @return the read concern level, which may be null (which indicates to use the server's default level)
   * @since 3.6
   */
  @Nullable
  public ReadConcernLevel getLevel() {
    return level;
  }

  /**
   * @return true if this is the server default read concern
   */
  public boolean isServerDefault() {
    return level == null;
  }

  /**
   * Gets this read concern as a document.
   *
   * @return The read concern as a BsonDocument
   */
  public BsonDocument asDocument() {
    BsonDocument readConcern = new BsonDocument();
    if (level != null) {
        readConcern.put("level", new BsonString(level.getValue()));
    }
    return readConcern;
  }

  @Override
  public boolean equals(final Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }

    ReadConcern that = (ReadConcern) o;

    return level == that.level;
  }

  @Override
  public int hashCode() {
    return level != null ? level.hashCode() : 0;
  }

  private ReadConcern() {
    this.level = null;
  }
}`,
};

storiesOf('Code', module).add('Multiline', () => {
  const language = select(
    'Language',
    Object.keys(codeSnippets),
    Lang.Javascript,
  );

  const margin = 50;
  const wrapperStyle = css`
    margin: ${margin}px;
    max-width: calc(100% - ${margin * 2}px);
  `;

  return (
    <div className={wrapperStyle}>
      <Code
        showLineNumbers={boolean('Show line numbers', false)}
        showWindowChrome={boolean('Show window chrome', false)}
        multiline={boolean('Multiline', true)}
        chromeTitle={text('Chrome label', 'directory/fileName.js')}
        variant={select('Variant', Object.values(Variant), Variant.Light)}
      >
        {codeSnippets[language]}
      </Code>
    </div>
  );
});
