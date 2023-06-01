/**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CAUTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 * Updating this file will flag a change
 * in _every_ component that leverages generated stories.
 *
 * Modify with caution
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

import React from 'react';
import { Decorator, StoryContext, StoryFn } from '@storybook/react';
import { entries } from 'lodash';

import {
  type GeneratedStoryConfig,
  type StoryMetaType,
} from '@leafygreen-ui/lib';

import { generatedStoryWrapper } from './GeneratedStory.styles';
import { Err } from './utils/Err';
import { PropCombinations } from './utils/PropCombinations';

export const PARAM_NAME = 'generate';
export const GENERATED_STORY_NAME = 'Generated';

const GeneratedStoryDecorator: Decorator = (
  StoryFn: StoryFn,
  context: StoryContext<unknown>,
) => {
  const { name: storyName, component } = context;

  if (component && storyName === GENERATED_STORY_NAME) {
    const { parameters, args: metaArgs } = context as StoryContext<
      typeof component
    > &
      StoryMetaType<typeof component>;

    const decoratorConfig: GeneratedStoryConfig<typeof component> | undefined =
      parameters[PARAM_NAME];

    if (!decoratorConfig) {
      return Err(
        `Story generation parameters not found for story "${GENERATED_STORY_NAME}". Be sure to add \`parameters.${PARAM_NAME}\` to the default export.`,
      );
    }

    const {
      props,
      excludeCombinations,
      args: generatedArgs,
      decorator,
    } = decoratorConfig;

    if (!props) {
      return Err('`props` not found in story generation parameters');
    }

    const variables = entries(props);

    // Dark mode should be the first prop
    if (props['darkMode'] && variables[0][0] !== 'darkMode') {
      console.warn(
        `${component.displayName} generated story: \`darkMode\` should be the first variable defined in \`parameters.${PARAM_NAME}\`.`,
      );
    }

    // reversing since the PropCombos recursion is depth-first
    variables.reverse();
    const GeneratedStory: StoryFn<unknown> = () => (
      <div className={generatedStoryWrapper}>
        <PropCombinations
          component={component}
          variables={variables}
          args={{ ...metaArgs, ...generatedArgs }}
          exclude={excludeCombinations}
          decorator={decorator}
        />
      </div>
    );

    return <GeneratedStory />;
  } else {
    return <StoryFn />;
  }
};

export default GeneratedStoryDecorator;
