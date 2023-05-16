import React from 'react';
import { palette } from '@leafygreen-ui/palette';
import {
  DecoratorFn,
  ReactFramework,
  StoryContext,
  StoryFn,
} from '@storybook/react';

const GENERATED_STORY_NAME = 'Generated';

const decorator: DecoratorFn = (
  StoryFn: StoryFn,
  context: StoryContext<ReactFramework>,
) => {
  const {
    story: storyName,
    parameters: { generate },
    component: Component,
  } = context;

  if (storyName === GENERATED_STORY_NAME && generate) {
    return <div>GENERATED</div>;
  } else {
    return <StoryFn />;
  }
};

export default decorator;
