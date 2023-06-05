import { StoryContext } from '@storybook/react';
import { isUndefined, startCase } from 'lodash';
import { GENERATED_STORY_NAME, PARAM_NAME } from './PropCombinations';

export const isGeneratedStory = (context: StoryContext<unknown>) => {
  return (
    !isUndefined(context.parameters[PARAM_NAME]) &&
    (context.parameters[PARAM_NAME].storyNames
      .map(startCase)
      .includes(context.name) ||
      context.name === GENERATED_STORY_NAME)
  );
};
