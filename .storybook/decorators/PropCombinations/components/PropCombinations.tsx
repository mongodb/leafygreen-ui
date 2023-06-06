import { cx } from '@leafygreen-ui/emotion';
import { GeneratedStoryConfig } from '@leafygreen-ui/lib';
import { Args, StoryFn } from '@storybook/react';
import React, { ReactElement } from 'react';
import { PropCombination, PropName } from './types';
import { generateCombinations } from './generateCombinations';
import { instanceClassName, instanceStyles } from '../PropCombinations.styles';

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
  variables: Array<[PropName<T>, Array<any> | undefined]>;
  args: Args;
  exclude: GeneratedStoryConfig<T>['excludeCombinations'];
  decorator: GeneratedStoryConfig<T>['decorator'];
}): ReactElement<any> {
  const allCombinations = generateCombinations({
    variables,
    exclude,
  });

  const comboCount = allCombinations.length;
  console.log(
    `Rendering ${comboCount} prop combinations for component: ${component.displayName}`,
  );

  console.log(allCombinations);

  return (
    <table>
      {allCombinations.map(combo => (
        <tr>
          <td>
            <pre>{JSON.stringify(combo, null, 2)}</pre>
          </td>
          <td>
            <Instance
              component={component}
              instanceProps={{ ...args, ...combo }}
              decorator={decorator}
            />
          </td>
        </tr>
      ))}
    </table>
  );
}

function Instance<T extends React.ComponentType<any>>({
  component,
  instanceProps,
  decorator,
}: {
  component: T;
  instanceProps: PropCombination<T>;
  decorator: Required<GeneratedStoryConfig<T>>['decorator'];
}): ReactElement<any> {
  return decorator(
    (extraArgs: Args) => (
      <div className={cx(instanceClassName, instanceStyles)}>
        {React.createElement(component, {
          ...instanceProps,
          ...extraArgs,
        })}
      </div>
    ),
    { args: { ...instanceProps } },
  );
}
