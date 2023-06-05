import React, { ReactElement } from 'react';
import { cx } from '@leafygreen-ui/emotion';
import { GeneratedStoryConfig } from '@leafygreen-ui/lib';
import { Args, StoryFn } from '@storybook/react';
import {
  instanceStyles,
  propWrapperStyles,
  propWrapperStylesDarkModeProp,
  propWrapperStylesFirstProp,
} from '../PropCombinations.styles';
import { shouldExcludePropCombo } from '../utils';
import { PropDetailsComponent } from './PropDetails';

/**
 * Generates all combinations of each variable
 */
export function PropCombinations<T extends React.ComponentType<any>>({
  component,
  variables,
  args,
  exclude,
  decorator = (SFn: StoryFn) => <SFn />,
}: {
  component: T;
  variables: Array<[string, Array<any>]>;
  args: Args;
  exclude: GeneratedStoryConfig<T>['excludeCombinations'];
  decorator: GeneratedStoryConfig<T>['decorator'];
}): ReactElement<any> {
  let comboCount = 0;

  const [firstPropName] =
    variables.length > 1
      ? variables.find(([propName]) => propName !== 'darkMode')!
      : [undefined];

  const AllCombinations = RecursiveCombinations({}, [...variables]);

  console.log(
    `Rendering ${comboCount} prop combinations for component: ${component.displayName}`,
  );

  return AllCombinations;

  /**
   * Recursively loop through all prop combinations defined in `variables` and render them
   */
  function RecursiveCombinations(
    props: Record<string, any>,
    vars: Array<[string, Array<any>]>,
  ): ReactElement<any> {
    // If this is the last variable, this is our base case
    if (vars.length === 0) {
      comboCount += 1;
      return decorator(
        (extraArgs: typeof args) => (
          <td className={cx(instanceStyles)} data-props={JSON.stringify(props)}>
            {React.createElement(component, {
              ...args,
              ...extraArgs,
              ...props,
            })}
          </td>
        ),
        { args: { ...props, ...args } },
      );
    } else {
      const [propName, propValues] = vars.shift()!;
      const isDarkModeProp = propName === 'darkMode';
      const isFirstProp = propName === firstPropName;
      const isLastProp = vars.length === 0;

      const Wrapper = isDarkModeProp
        ? 'div'
        : isLastProp
        ? 'tr'
        : React.Fragment;

      if (propValues) {
        return (
          <Wrapper
            className={cx(propWrapperStyles, {
              [propWrapperStylesDarkModeProp]: isDarkModeProp,
              // [propWrapperStylesFirstProp]: propName === firstPropName,
            })}
            id={propName}
          >
            {propValues.map(
              val =>
                !shouldExcludePropCombo<T>({
                  propName,
                  val,
                  props,
                  exclude,
                }) && (
                  <PropDetailsComponent propName={propName} val={val}>
                    {RecursiveCombinations({ [propName]: val, ...props }, [
                      ...vars,
                    ])}
                  </PropDetailsComponent>
                ),
            )}
          </Wrapper>
        );
      } else {
        return <div>No Prop Values</div>;
      }
    }
  }
}
