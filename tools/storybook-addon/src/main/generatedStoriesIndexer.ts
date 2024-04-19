import { serverRequire } from '@storybook/core-common';
import { loadCsf } from '@storybook/csf-tools';
// import fsx from 'fs-extra';
import { Indexer } from '@storybook/types';
import { parseModule } from 'magicast';

export interface DynamicStoryConfig {
  baseCsf: string;
  stories: () => {
    [key: string]: any;
  };
}

const DYNAMIC_STORIES_REGEX = /\.dynamic\.[tj]sx?/;

export const generatedStoriesIndexer: Indexer = {
  test: DYNAMIC_STORIES_REGEX,
  createIndex: async (fileName, opts) => {
    console.log('Indexing', fileName);
    delete require.cache[fileName];
    const config = await serverRequire(fileName);
    const compiled = await compile(config);
    const indexed = await loadCsf(compiled, {
      ...opts,
      fileName,
    }).parse();

    console.log(indexed);
    return indexed.indexInputs;
  },
};

export const compile = async (config: DynamicStoryConfig) => {
  const { baseCsf } = config;
  const stories = await config.stories();

  const mod = parseModule(baseCsf);
  Object.entries(stories).forEach(([key, story]) => {
    mod.exports[key] = story; //prepareStory(story);
  });

  const { code } = mod.generate();
  return code;
};
