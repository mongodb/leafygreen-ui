import { StoryContext } from '@storybook/react';
import { isUndefined, startCase } from 'lodash';

import { GeneratedStoryConfig } from '@leafygreen-ui/lib';

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
