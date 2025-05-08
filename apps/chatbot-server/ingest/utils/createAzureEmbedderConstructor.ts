import { EmbedArgs, Embedder } from 'mongodb-rag-core';
import { AzureOpenAI } from 'mongodb-rag-core/openai';
import { Constructor } from 'mongodb-rag-ingest';

/**
 * Returns a constructor function for an embedder that uses Azure OpenAI
 * to create embeddings.
 * @returns
 */
export const createAzureEmbedderConstructor =
  ({
    azureClient,
    model,
  }: {
    azureClient: AzureOpenAI;
    model: string;
  }): Constructor<Embedder> =>
  () => {
    const embed: Embedder['embed'] = async (args: EmbedArgs) => {
      const result = await azureClient.embeddings.create({
        input: args.text,
        model,
      });

      return {
        // @ts-expect-error
        embedding: result.data as Array<number>,
      };
    };

    return {
      embed,
      modelName: model,
    };
  };
