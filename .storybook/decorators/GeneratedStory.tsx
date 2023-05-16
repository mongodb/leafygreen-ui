/**
 * ~~~~~~~~~~ CAUTION ~~~~~~~~~~
 *
 * Updating this file will likely flag a change in _every_
 * component that leverages generated stories.
 *
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

const generatedStoryWrapper = css`
  padding: 12px;
`;

const propSectionStyles = css`
  &#darkMode {
    display: flex;
  }
`;

const combinationClassName = createUniqueClassName('combo');
const combinationStyles = css`
  position: relative;
  padding: ${typeScales.body1.lineHeight}px 12px 0px;
  overflow: visible;
  border-left: 1px solid;
  color: inherit;

  &:before {
    position: absolute;
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    width: max-content;
    transform: translateY(-${typeScales.body1.lineHeight}px);
  }

  &#darkMode-true,
  &#darkMode-true .${combinationClassName} {
    background-color: ${palette.gray.dark4};
    color: ${palette.gray.light2};
    border-color: ${palette.gray.dark2};
  }
  &#darkMode-false,
  &#darkMode-false .${combinationClassName} {
    color: ${palette.gray.dark1};
    border-color: ${palette.gray.light1};
  }
`;

combinationStyles;

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
  console.log([...variables]);
  return RecursiveCombinations({}, [...variables]);

  function RecursiveCombinations(
    props: Record<string, any>,
    vars: Array<[string, Array<any> | undefined]>,
  ): ReactElement<any> {
    if (vars.length === 0) {
      return (
        <div
          className={css`
            padding: 4px 0;
          `}
        >
          {React.createElement(component, { ...args, ...props })}
        </div>
      );
    } else {
      const [propName, propValues] = vars.pop()!;

      if (propValues) {
        return (
          <div id={`${propName}`} className={propSectionStyles}>
            {propValues.map(val => {
              return (
                <div
                  id={`${propName}-${val}`}
                  className={cx(
                    combinationClassName,
                    combinationStyles,
                    css`
                      &:before {
                        content: '${propName} = ${`${val}`}';
                      }
                    `,
                  )}
                >
                  {RecursiveCombinations({ [propName]: val, ...props }, [
                    ...vars,
                  ])}
                </div>
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
