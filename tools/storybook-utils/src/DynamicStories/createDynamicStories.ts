import { recursiveCombinations } from './recursiveCombinations';
import { CombinedArgs, PropCombination } from './types';

/**
 *
 * Receives a config object of args to combine to render stories,
 * and returns CSF for Storybook to parse
 *
 * @param combinedArgs
 * @returns
 */
export const createDynamicStories = (
  combinedArgs: CombinedArgs,
): Record<
  string,
  {
    args: PropCombination<any>;
  }
> => {
  const argsArray = Object.entries(combinedArgs);
  const combos = recursiveCombinations(argsArray).map(combo => ({
    args: combo,
  }));

  return combos.reduce((result, combo) => {
    const label = Object.entries(combo.args)
      .map(([propName, propValue]) => `${propName}_${String(propValue)}`)
      .join('__');

    result[label] = {
      ...combo,
      parameters: {
        // For now, we'll disable chromatic snapshots on these stories
        chromatic: { disableSnapshot: true },
      },
    };
    return result;
  }, {} as Record<string, any>);
};
