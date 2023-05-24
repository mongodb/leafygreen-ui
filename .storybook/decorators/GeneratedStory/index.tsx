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

import React, { ReactElement } from 'react';
import { Decorator, StoryContext, StoryFn } from '@storybook/react';
import { Args } from '@storybook/csf';
import { cx } from '@leafygreen-ui/emotion';
import { Error } from '@leafygreen-ui/typography';
import { GeneratedStoryConfig } from 'packages/lib/src/storybook/GeneratedStoryDecorator.types';
import { entries } from 'lodash';
import { shouldExcludePropCombo } from './utils/shouldExcludePropCombo';
import {
  combinationClassName,
  combinationStyles,
  generatedStoryWrapper,
  instanceStyles,
  propSectionStyles,
} from './GeneratedStory.styles';
import { StoryMetaType } from '@leafygreen-ui/lib';

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

    const generate: GeneratedStoryConfig<typeof component> | undefined =
      parameters[PARAM_NAME];

    if (!generate) {
      return Err(
        `Story generation parameters not found for story "${GENERATED_STORY_NAME}". Be sure to add \`parameters.${PARAM_NAME}\` to the default export.`,
      );
    }

    const {
      props,
      excludeCombinations,
      args: generatedArgs,
      decorator,
    } = generate;

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
    return (
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
  } else {
    return <StoryFn />;
  }
};

export default GeneratedStoryDecorator;

/**
 * Generates all combinations of each variable
 */
function PropCombinations<T extends React.ComponentType<any>>({
  component,
  variables,
  args,
  exclude,
  decorator = (SFn: StoryFn) => <SFn />,
}: {
  component: T;
  variables: Array<[string, Array<any> | undefined]>;
  args: Args;
  exclude: GeneratedStoryConfig<T>['excludeCombinations'];
  decorator: GeneratedStoryConfig<T>['decorator'];
}): ReactElement<any> {
  let comboCount = 0;

  const AllCombinations = RecursiveCombinations({}, [...variables]);
  setTimeout(() => {
    comboCount &&
      console.log(
        `Rendering ${comboCount} prop combinations for component: ${component.displayName}`,
      );
  }, 0);
  return AllCombinations;

  function RecursiveCombinations(
    props: Record<string, any>,
    vars: Array<[string, Array<any> | undefined]>,
  ): ReactElement<any> {
    if (vars.length === 0) {
      comboCount += 1;
      return decorator(() => (
        <div className={instanceStyles}>
          {React.createElement(component, { ...args, ...props })}
        </div>
      ));
    } else {
      const [propName, propValues] = vars.pop()!;

      if (propValues) {
        return (
          <div
            id={`${propName}`}
            data-value-count={propValues.length}
            className={propSectionStyles}
          >
            {propValues.map(val =>
              shouldExcludePropCombo<T>({
                propName,
                val,
                props,
                exclude,
              }) ? (
                <></>
              ) : (
                <PropDetailsComponent
                  key={propName + val}
                  propName={propName}
                  val={val}
                  props={props}
                  vars={vars}
                />
              ),
            )}
          </div>
        );
      } else {
        return <div>No Prop Values</div>;
      }
    }
  }

  function PropDetailsComponent({
    propName,
    val,
    props,
    vars,
  }: {
    propName: string;
    val: any;
    props: Record<string, any>;
    vars: Array<[string, Array<any> | undefined]>;
  }) {
    return (
      <details
        open
        id={`${propName}-${valStr(val)}`}
        className={cx(combinationClassName, combinationStyles)}
      >
        <summary>
          {propName} = "{`${valStr(val)}`}"
        </summary>
        {RecursiveCombinations({ [propName]: val, ...props }, [...vars])}
      </details>
    );
  }
}

/**
 * @returns the provided value as a string
 */
function valStr(val: any): string {
  const MAX_STR_LEN = 24;
  if (typeof val === 'object') {
    if (val.type) {
      if (typeof val.type === 'string') return `<${val.type} />`;
      return `<${val.type.displayName} />` ?? 'JSX Element';
    }
    if (Array.isArray(val)) return 'Array';
    else return 'Object';
  }
  if (typeof val === 'string' && val.length > MAX_STR_LEN) {
    return val.slice(0, MAX_STR_LEN) + '…';
  }
  return `${val}`;
}

/**
 * Renders an error message, and logs an error
 */
function Err(msg: string): JSX.Element {
  console.error(msg);
  return <Error>{msg}</Error>;
}
