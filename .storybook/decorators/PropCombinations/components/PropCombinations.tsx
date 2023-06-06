import { cx } from '@leafygreen-ui/emotion';
import { GeneratedStoryConfig } from '@leafygreen-ui/lib';
import { Args, StoryFn } from '@storybook/react';
import React, { ReactElement } from 'react';
import { PropName } from './types';
import { generateCombinations } from './generateCombinations';

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
    <>
      {allCombinations.map(combo => (
        <>{JSON.stringify(combo)}</>
      ))}
    </>
  );
}

// decorator(
//   (extraArgs: typeof args) => (
//     <div
//       className={cx(instanceClassName, instanceStyles)}
//       data-props={JSON.stringify(props)}
//     >
//       {React.createElement(component, {
//         ...args,
//         ...extraArgs,
//         ...props,
//       })}
//     </div>
//   ),
//   { args: { ...props, ...args } },
// );
