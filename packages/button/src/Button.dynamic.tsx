/* eslint-disable react/jsx-key */
import React, { ComponentProps } from 'react';
import { keys } from 'lodash';

import Icon from '@leafygreen-ui/icon';

import { Variant } from '.';

export type PropName<T extends React.ComponentType<any>> =
  keyof ComponentProps<T>;

export type PropCombination<T extends React.ComponentType<any>> = {
  [key in PropName<T>]: ComponentProps<T>[key];
};

export interface DynamicStoryConfig {
  baseCsf: string;
  stories: () => {
    [key: string]: any;
  };
}

interface CombinedArgs {
  [prop: string]: Array<any>;
}

export default {
  baseCsf: `
import { Button } from "./Button";
export default { 
  title: 'Components/Button/Generated',
  component: Button,
  args: { label: 'Button' },
  tags: ['autodocs'] 
};
  `,
  stories: () => {
    const combinedArgs = {
      darkMode: [false, true],
      rightGlyph: [undefined, <Icon glyph={'ArrowRight'} />],
      leftGlyph: [undefined, <Icon glyph={'Cloud'} />],
      children: ['MongoDB', undefined],
      variant: Object.values(Variant),
    } satisfies CombinedArgs;

    console.log(combinedArgs);

    const combinations = createCombinations(combinedArgs).reduce(
      (result, combo) => {
        const label = Object.entries(combo.args)
          .map(([propName, propValue]) => `${propName}=${propValue}`)
          .join('-');
        return (result[label] = combo);
      },
      {} as any,
    );

    console.log({ combinedArgs, combinations });

    return combinations;
  },
} satisfies DynamicStoryConfig;

const createCombinations = (
  combinedArgs: CombinedArgs,
): Array<{
  args: PropCombination<any>;
}> => {
  const argsArray = Object.entries(combinedArgs);
  return recursiveCombinations(argsArray).map(combo => ({ args: combo }));
};

/**
 * Recursively loop through all prop combinations defined in `vars`
 */
export function recursiveCombinations<T extends React.ComponentType<any>>(
  args: Array<[PropName<T>, Array<any> | undefined]>,
  cumulativeArgs: Record<PropName<T>, any> | {} = {},
  // exclude: GeneratedStoryConfig<T>['excludeCombinations'],
): Array<PropCombination<T>> {
  // If this is the last variable, this is our base case
  if (args.length === 0 && keys(cumulativeArgs).length > 0) {
    return [{ ...(cumulativeArgs as PropCombination<T>) }];
  }

  const [propName, propValues] = args.pop()!;

  if (propValues?.length) {
    return propValues.flatMap(val => {
      const shouldInclude = true;
      // const shouldInclude = !shouldExcludePropCombo<T>({
      //   propName: propName as string,
      //   val,
      //   cumulativeArgs,
      //   exclude,
      // });

      if (shouldInclude) {
        return recursiveCombinations(
          [...args],
          { [propName]: val, ...cumulativeArgs },
          // exclude,
        );
      }

      return [];
    });
  }

  return [];
}
