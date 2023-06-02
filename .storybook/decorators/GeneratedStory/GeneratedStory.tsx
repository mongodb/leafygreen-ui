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
import { entries, isUndefined } from 'lodash';

import {
  type GeneratedStoryConfig,
  type StoryMetaType,
} from '@leafygreen-ui/lib';

import { generatedStoryWrapper } from './GeneratedStory.styles';
import { Err } from './utils/Err';
import { PropCombinations } from './utils/PropCombinations';
import { isGeneratedStory } from './isGeneratedStory';

export const PARAM_NAME = 'generate';
export const GENERATED_STORY_NAME = 'Generated';

type ContextType<T extends React.ComponentType<any>> = StoryContext<T> &
  StoryMetaType<T>;

const GeneratedStoryDecorator: Decorator = (
  StoryFn: StoryFn,
  context: StoryContext<unknown>,
) => {
  const { component } = context;

  console.log(context);

  if (component) {
    const { parameters, args: metaArgs } = context as ContextType<
      typeof component
    >;

    const decoratorConfig: GeneratedStoryConfig<typeof component> | undefined =
      parameters[PARAM_NAME];

    if (!isUndefined(decoratorConfig)) {
      const {
        props,
        excludeCombinations,
        args: generatedArgs,
        decorator,
      } = decoratorConfig;
      if (isGeneratedStory(context)) {
        // Check for props
        if (!props || entries(props).length === 0) {
          return Err('`props` not found in story generation parameters');
        }

        // Remove any args that are explicitly defined
        for (let key in { ...generatedArgs }) {
          if (props[key]) {
            delete props[key];
          }
        }

        // Convert the object to an array
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
      }
    }
  }

  return <StoryFn />;
};

export default GeneratedStoryDecorator;
