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
import {
  DecoratorFn,
  ReactFramework,
  StoryContext,
  StoryFn,
} from '@storybook/react';
import { Args } from '@storybook/csf';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { typeScales } from '@leafygreen-ui/tokens';

export const GENERATED_STORY_NAME = 'Generated';

const indent = 16;

const generatedStoryWrapper = css`
  padding: ${indent}px;
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
  color: inherit;
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  width: max-content;

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

const decorator: DecoratorFn = (
  StoryFn: StoryFn,
  context: StoryContext<ReactFramework>,
) => {
  const {
    story: storyName,
    parameters: { generate },
    component,
    args,
  } = context;

  if (storyName === GENERATED_STORY_NAME && component && generate) {
    const variables: Array<[string, Array<any>]> = Object.entries(generate);

    return (
      <div className={generatedStoryWrapper}>
        <PropCombinations
          component={component}
          variables={variables}
          args={args}
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
function PropCombinations({
  component,
  variables,
  args,
}: {
  component: React.ComponentType<any>;
  variables: Array<[string, Array<any> | undefined]>;
  args: Args;
}): ReactElement<any> {
  let comboCount = 0;
  const AllCombinations = RecursiveCombinations({}, [...variables]);
  console.info(
    `Rendering ${comboCount} prop combinations for ${component.displayName}`,
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
            {propValues.map(val => {
              return (
                <details
                  open
                  id={`${propName}-${val}`}
                  className={cx(combinationClassName, combinationStyles)}
                >
                  <summary>
                    {propName} = {`${val}`}
                  </summary>
                  {RecursiveCombinations({ [propName]: val, ...props }, [
                    ...vars,
                  ])}
                </details>
              );
            })}
          </div>
        );
      } else {
        return <div>No Prop Values</div>;
      }
    }
  }
}
