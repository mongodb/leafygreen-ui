import { cx } from '@leafygreen-ui/emotion';
import { GeneratedStoryConfig } from '@leafygreen-ui/lib';
import { Args, StoryFn } from '@storybook/react';
import React, { ReactElement } from 'react';
import {
  instanceClassName,
  instanceStyles,
  propSectionStyles,
} from '../GeneratedStory.styles';
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

  // Not sure what's going on here, but we need this timeout
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
          <div
            id={`${propName}`}
            data-options-count={propValues.length}
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
                >
                  {RecursiveCombinations({ [propName]: val, ...props }, [
                    ...vars,
                  ])}
                </PropDetailsComponent>
              ),
            )}
          </div>
        );
      } else {
        return <div>No Prop Values</div>;
      }
    }
  }
}
