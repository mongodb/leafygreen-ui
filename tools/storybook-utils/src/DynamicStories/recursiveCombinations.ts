import { keys } from 'lodash';

import { PropCombination, PropName } from './types';

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
