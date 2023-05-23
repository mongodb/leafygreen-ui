import { entries, has, isEqual, isUndefined, keys } from 'lodash';
import { GeneratedStoryConfig } from 'packages/lib/src/storybook/GeneratedStoryDecorator.types';

export function shouldExcludePropCombo<T extends React.ComponentType<any>>({
  propName,
  val,
  props,
  exclude,
}: {
  propName: string;
  val: any;
  props: Record<string, any>;
  exclude: GeneratedStoryConfig<T>['excludeCombinations'];
}): boolean {
  if (isUndefined(exclude) || exclude.length === 0) return false;

  // Return true if _any_ of the exclude rules match
  return exclude.some(rule => {
    if (Array.isArray(rule)) {
      if (rule.every(x => typeof x === 'string')) {
        /**
         * Case 1: mutually exclusive
         */
        if (rule.includes(propName) && !isUndefined(val)) {
          // Return whether any item in this rule
          // is included in the currently defined props
          // (and if that prop value is defined)
          return rule.some(
            p =>
              keys(props).includes(p as string) &&
              !isUndefined(props[p as string]),
          );
        } else {
          return false;
        }
      } else if (rule.some(x => typeof x === 'string')) {
        /**
         * Case 2: Conditional props
         */
        const checkProp = rule.find(x => typeof x === 'string');
        const conditions = rule.find(y => typeof y === 'object');

        // Assert types
        if (
          isUndefined(checkProp) ||
          typeof checkProp !== 'string' ||
          isUndefined(conditions) ||
          typeof conditions !== 'object'
        ) {
          console.warn(
            'Invalid condition in `excludeCombinations` definition',
            rule,
          );
          return false;
        }

        // If the current prop (or any previous prop) is the checkProp
        // check if any prop:value pair defined in `conditions`
        // matches the prop:value defined in `props`
        // (or the current prop & val)
        if (checkProp === propName) {
          return entries(conditions).every(([name, value]) => {
            return has(props, name) && areValuesEqual(props[name], value); // The condition is in previously defined props
          });
        } else if (
          keys(props).includes(checkProp as string) &&
          !isUndefined(props[checkProp])
        ) {
          return entries(conditions).every(
            ([name, value]) => name === propName && areValuesEqual(val, value), // the condition is matched in the current prop
          );
        }
      } else {
        // Unknown case
        return false;
      }
    } else {
      /**
       * Specific exclude conditions
       */

      // If the exclude rule has the current prop defined,
      // and the current value matches the excluded value
      if (has(rule, propName) && areValuesEqual(rule[propName], val)) {
        // Check that every other rule is satisfied by previous props

        return entries(rule).every(([name, value]) => {
          return (
            name === propName ||
            (has(props, name) && areValuesEqual(props[name], value))
          );
        });
      }
    }
  });

  return false;
}

/**
 * @returns true if both elements are JSX objects with the same display name.
 * Otherwise returns _.isEqual
 */
function areValuesEqual(v1: any, v2: any): boolean {
  if (
    typeof v1 === 'object' &&
    typeof v2 === 'object' &&
    has(v1, 'type') &&
    has(v2, 'type')
  ) {
    return v1.type.displayName === v2.type.displayName;
  }

  return isEqual(v1, v2);
}
