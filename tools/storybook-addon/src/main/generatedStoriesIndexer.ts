import { DynamicStoryConfig } from '@lg-tools/storybook-utils';
import { serverRequire } from '@storybook/core-common';
import { loadCsf } from '@storybook/csf-tools';
import { Indexer } from '@storybook/types';
import { parseModule } from 'magicast';

export const DYNAMIC_STORIES_REGEX = /\.dynamic\.[tj]sx?/;

// When we load a file that matches the `test` pattern
// we run this indexer that tells Storybook how it should read this file
export const generatedStoriesIndexer: Indexer = {
  test: DYNAMIC_STORIES_REGEX,
  createIndex: async (fileName, opts) => {
    delete require.cache[fileName];
    const config = await serverRequire(fileName); // load the .dynamic.tsx  file
    const compiled = await compileDynamicStory(config); // compile the file into CSF
    // Read & index the CSF
    const indexed = await loadCsf(compiled, {
      ...opts,
      fileName,
    }).parse();

    return indexed.indexInputs;
  },
};

// Converts a `DynamicStoryConfig` object in to a dynamic CSF file
export const compileDynamicStory = async (config: DynamicStoryConfig) => {
  const { baseCsf } = config;
  const stories = await config.stories();

  const module = parseModule(baseCsf);
  Object.entries(stories).forEach(([key, story]) => {
    module.exports[key] = story;
  });

  const { code } = module.generate();
  return code;
};
