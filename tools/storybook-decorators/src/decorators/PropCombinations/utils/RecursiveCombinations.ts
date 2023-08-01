import { keys } from 'lodash';

import { GeneratedStoryConfig } from '@leafygreen-ui/lib';

import { PropCombination, PropName } from './types';
import { shouldExcludePropCombo } from '.';

/**
 * Recursively loop through all prop combinations defined in `vars`
 */
export function RecursiveCombinations<T extends React.ComponentType<any>>(
  props: Record<PropName<T>, any> | {},
  vars: Array<[PropName<T>, Array<any> | undefined]>,
  exclude: GeneratedStoryConfig<T>['excludeCombinations'],
): Array<PropCombination<T>> {
  // If this is the last variable, this is our base case
  if (vars.length === 0 && keys(props).length > 0) {
    return [{ ...(props as PropCombination<T>) }];
  }

  const [propName, propValues] = vars.pop()!;

  if (propValues?.length) {
    return propValues.flatMap(val => {
      const shouldInclude = !shouldExcludePropCombo<T>({
        propName: propName as string,
        val,
        props,
        exclude,
      });

      if (shouldInclude) {
        return RecursiveCombinations(
          { [propName]: val, ...props },
          [...vars],
          exclude,
        );
      }

      return [];
    });
  }

  return [];
}
