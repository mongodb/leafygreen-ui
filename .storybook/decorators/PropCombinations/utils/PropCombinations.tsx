import { cx } from '@leafygreen-ui/emotion';
import { GeneratedStoryConfig } from '@leafygreen-ui/lib';
import { Args, StoryFn } from '@storybook/react';
import React, { ReactElement } from 'react';
import { instanceClassName, instanceStyles } from '../PropCombinations.styles';
import { PropDetailsComponent } from './PropDetails';
import { shouldExcludePropCombo } from './shouldExcludePropCombo';

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
  variables: Array<[string, Array<any> | undefined]>;
  args: Args;
  exclude: GeneratedStoryConfig<T>['excludeCombinations'];
  decorator: GeneratedStoryConfig<T>['decorator'];
}): ReactElement<any> {
  let comboCount = 0;

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
    vars: Array<[string, Array<any> | undefined]>,
  ): ReactElement<any> {
    // If this is the last variable, this is our base case
    if (vars.length === 0) {
      comboCount += 1;
      return decorator(
        (extraArgs: typeof args) => (
          <div
            className={cx(instanceClassName, instanceStyles)}
            data-props={JSON.stringify(props)}
          >
            {React.createElement(component, {
              ...args,
              ...extraArgs,
              ...props,
            })}
          </div>
        ),
        { args: { ...props, ...args } },
      );
    } else {
      const [propName, propValues] = vars.pop()!;

      if (propValues) {
        return (
          <>
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
          </>
        );
      } else {
        return <div>No Prop Values</div>;
      }
    }
  }
}
