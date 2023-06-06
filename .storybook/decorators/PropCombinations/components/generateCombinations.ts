import { GeneratedStoryConfig } from '@leafygreen-ui/lib';
import { keys } from 'lodash';
import { shouldExcludePropCombo } from '../utils';
import { PropCombination, PropName } from './types';

export function generateCombinations<T extends React.ComponentType<any>>({
  variables,
  exclude,
}: {
  variables: Array<[PropName<T>, Array<any> | undefined]>;
  exclude: GeneratedStoryConfig<T>['excludeCombinations'];
}): Array<PropCombination<T>> {
  const AllCombinations: Array<PropCombination<T>> = [];
  RecursiveCombinations({}, [...variables]);
  return AllCombinations;

  /**
   * Recursively loop through all prop combinations defined in `variables`
   */
  function RecursiveCombinations<T extends React.ComponentType<any>>(
    props: Record<PropName<T>, any> | {},
    vars: Array<[PropName<T>, Array<any> | undefined]>,
  ): void {
    // If this is the last variable, this is our base case
    if (vars.length === 0 && keys(props).length > 0) {
      AllCombinations.push({ ...(props as PropCombination<T>) });
      return;
    }
    const [propName, propValues] = vars.pop()!;

    if (propValues) {
      {
        propValues.forEach(val => {
          if (
            !shouldExcludePropCombo<T>({
              propName: propName as string,
              val,
              props,
              exclude,
            })
          ) {
            RecursiveCombinations({ [propName]: val, ...props }, [...vars]);
          }
        });
      }
    }
  }
}
