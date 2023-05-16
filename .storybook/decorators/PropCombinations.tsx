import React, { ReactElement } from 'react';
import {
  DecoratorFn,
  ReactFramework,
  StoryContext,
  StoryFn,
} from '@storybook/react';
import { Args } from '@storybook/csf';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

const GENERATED_STORY_NAME = 'Generated';

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
      <div
        className={css`
          & #darkMode-true {
            background-color: ${palette.gray.dark4};
            color: ${palette.gray.light2};
            padding-bottom: 16px;
            &,
            * {
              outline-color: ${palette.gray.dark2};
              border-color: ${palette.gray.dark2};
            }
          }
          & #darkMode-false {
            color: ${palette.gray.dark1};
            padding-bottom: 16px;
            &,
            * {
              outline-color: ${palette.gray.light1};
              border-color: ${palette.gray.light1};
            }
          }
        `}
      >
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
        <span
          className={css`
            display: inline-block;
            padding: 2px;
          `}
        >
          {React.createElement(component, { ...args, ...props })}
        </span>
      );
    } else {
      const [propName, propValues] = vars.pop()!;

      if (propValues) {
        return (
          <div id={`${propName}`}>
            {propValues.map(val => {
              return (
                <span
                  id={`${propName}-${val}`}
                  className={css`
                    position: relative;
                    display: inline-block;
                    padding: 16px 8px 0px;
                    overflow: visible;
                    /* outline: 1px solid; */
                    border-left: 1px solid;
                    color: inherit;

                    &:before {
                      content: '${propName}-${`${val}`}';
                      position: absolute;
                      font-size: 10px;
                      line-height: 12px;
                      width: max-content;
                      transform: translateY(-16px);
                    }
                  `}
                >
                  {RecursiveCombinations({ [propName]: val, ...props }, [
                    ...vars,
                  ])}
                </span>
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
