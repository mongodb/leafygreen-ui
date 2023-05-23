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
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { typeScales } from '@leafygreen-ui/tokens';
import { Error } from '@leafygreen-ui/typography';
import { GeneratedStoryConfig } from 'packages/lib/src/storybook/GeneratedStoryDecorator.types';
import { entries } from 'lodash';
import { shouldExcludePropCombo } from './utils/shouldExcludePropCombo';

export const PARAM_NAME = 'generate';
export const GENERATED_STORY_NAME = 'Generated';

const indent = 16;

const generatedStoryWrapper = css`
  /* padding: ${indent}px; */
`;

const propSectionStyles = css`
  &#darkMode {
    display: flex;
  }
`;

const combinationClassName = createUniqueClassName('combo');
const combinationStyles = css`
  position: relative;
  padding: 4px ${indent}px;
  overflow: visible;
  border-left: 1px solid;
  color: ${palette.gray.base};
  border-color: ${palette.gray.light1};
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  width: max-content;
  max-width: 100%;

  &#darkMode-true,
  &#darkMode-false {
    flex: 1;
    max-width: 50%;
    padding: ${indent}px;
  }

  &#darkMode-true,
  &#darkMode-true .${combinationClassName} {
    background-color: ${palette.black};
    color: ${palette.gray.base};
    border-color: ${palette.gray.dark2};
  }
  &#darkMode-false,
  &#darkMode-false .${combinationClassName} {
    background-color: ${palette.white};
    color: ${palette.gray.base};
    border-color: ${palette.gray.light1};
  }
`;

const instanceStyles = css`
  padding: 8px ${indent}px 0;
`;

const decorator: Decorator = (StoryFn: StoryFn, context: StoryContext) => {
  const { story: storyName, parameters, component, args } = context;

  if (component && storyName === GENERATED_STORY_NAME) {
    type GenerateConfigType = GeneratedStoryConfig<typeof component>;
    const generate: GenerateConfigType = parameters[PARAM_NAME];

    if (!generate) {
      return Err(
        `Story generation parameters not found for story "${GENERATED_STORY_NAME}". Be sure to add \`parameters.${PARAM_NAME}\` to the default export.`,
      );
    }

    const { props, excludeCombinations } = generate;

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
          args={args}
          exclude={excludeCombinations}
        />
      </div>
    );
  } else {
    return <StoryFn />;
  }
};

export default decorator;

/**
 * Generates all combinations of each variable
 */
function PropCombinations<T extends React.ComponentType<any>>({
  component,
  variables,
  args,
  exclude,
}: {
  component: T;
  variables: Array<[string, Array<any> | undefined]>;
  args: Args;
  exclude: GeneratedStoryConfig<T>['excludeCombinations'];
}): ReactElement<any> {
  let comboCount = 0;
  const AllCombinations = RecursiveCombinations({}, [...variables]);
  console.log(
    `Rendering ${comboCount} prop combinations for component: ${component.displayName}`,
  );
  return AllCombinations;

  function RecursiveCombinations(
    props: Record<string, any>,
    vars: Array<[string, Array<any> | undefined]>,
  ): ReactElement<any> {
    if (vars.length === 0) {
      comboCount += 1;
      return (
        <div className={instanceStyles}>
          {React.createElement(component, { ...args, ...props })}
        </div>
      );
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
          {propName} = {`${valStr(val)}`}
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
