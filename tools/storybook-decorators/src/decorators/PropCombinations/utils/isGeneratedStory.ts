import { GeneratedStoryConfig } from '@lg-tools/storybook-utils';
import { StoryContext } from '@storybook/react';
import isUndefined from 'lodash/isUndefined';
import startCase from 'lodash/startCase';

import { GENERATED_STORY_NAME, PARAM_NAME } from '../constants';

export const isGeneratedStory = (context: StoryContext<unknown>) => {
  const currentStoryName = context.name;
  const params = context.parameters[PARAM_NAME] as
    | GeneratedStoryConfig<any>
    | undefined;

  return (
    !isUndefined(params) &&
    (params?.storyNames?.map(startCase)?.includes(currentStoryName) ||
      currentStoryName === GENERATED_STORY_NAME)
  );
};
