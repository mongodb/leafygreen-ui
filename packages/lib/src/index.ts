import * as typeIs from './typeIs';
import createUniqueClassName from './createUniqueClassName';
import getNodeTextContent from './getNodeTextContent';
import DarkModeProps, { Theme } from './DarkModeProps';
import { type LgIdProps } from './LgIdProps';
import getTheme from './getTheme';
export * from './helpers';
export { validateChildren, isComponentType } from './validateChildren';
export { createSyntheticEvent } from './createSyntheticEvent';
export type {
  ExclusiveUnion,
  Mutable,
  Only,
  Optional,
  PartialRequired,
  RecursiveRecord,
  ValuesOf,
} from './types';

export { typeIs, createUniqueClassName, getNodeTextContent, getTheme, Theme };
export type { DarkModeProps, LgIdProps };

/** Helper type to extract an HTML element's valid props */
export type HTMLElementProps<
  Element extends keyof JSX.IntrinsicElements,
  RefType extends HTMLElement = never,
> = React.PropsWithChildren<Omit<JSX.IntrinsicElements[Element], 'ref'>> & {
  ref?: [RefType] extends [never] ? never : React.Ref<RefType>;
  key?: React.Key | null;
};

/**
 * Helper that constructs a type requiring at least one of the passed keys
 * to be present in the passed interface.
 *
 * Example
 * ```
 * interface ExampleInterface {
 *   alwaysRequired: boolean,
 *   sometimesRequired: boolean,
 *   requiredOtherTimes: boolean,
 * }
 *
 * type ExampleEither = Either<ExampleInterface, 'sometimesRequired' | 'requiredOtherTimes'>
 *
 * // The above is equivalent to:
 * interface SharedInExampleInterface {
 *   alwaysRequired: boolean,
 * }
 *
 * interface FirstIsRequired extends SharedInExampleInterface {
 *   sometimesRequired: boolean,
 *   requiredOtherTimes?: boolean,
 * }
 *
 * interface SecondIsRequired extends SharedInExampleInterface {
 *   sometimesRequired?: boolean,
 *   requiredOtherTimes: boolean,
 * }
 *
 * type EquivalentToExampleEither = FirstIsRequired | SecondIsRequired
 * ```
 */
export type Either<T, Keys extends keyof T = keyof T> = Omit<T, Keys> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

/**
 * Helper that constructs mutually exclusive record types. Refer to tests for usage.
 */
export type OneOf<T1, T2> =
  | (T1 & Partial<Record<Exclude<keyof T2, keyof T1>, never>>)
  | (T2 & Partial<Record<Exclude<keyof T1, keyof T2>, never>>);

/**
 * Utility for making it easier to couple a React Component to a css selector.
 * Useful when writing css selectors that rely on interactivity, i.e. :hover.
 * Example:
 *  const checkBoxWrapper = createDataProp('checkbox-wrapper');
 *  // Used as selector:
 *  css`&:hover ${checkboxWrapper.selector} { }`
 *  // Used on React Component
 *  <div {...checkboxWrapper.prop} />
 * @param {string} name Name of element we want to reference.
 *
 * @deprecated
 */
export function createDataProp(name: string) {
  // ts:emit throws an error if this is not typed. Usually this can be inferred.
  const prefix = 'data-leafygreen-ui' as string;

  return {
    prop: {
      [prefix]: name,
    },
    selector: `[${prefix}="${name}"]`,
  };
}

/** Object mapping keyCodes to keys */
export const keyMap = {
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  Backspace: 'Backspace',
  BracketLeft: '[',
  Delete: 'Delete',
  Enter: 'Enter',
  Escape: 'Escape',
  Space: ' ',
  Tab: 'Tab',
} as const;

/**
 * An enum of accepted values for the "aria-current" attribute, used for
 * indicating current/active state across several contexts.
 *
 * The values "false", the empty string, and an ommission of this attribute
 * are all treated identically by user agents and screen readers.
 *
 * W3C Recommendation: https://www.w3.org/TR/wai-aria-1.1/#aria-current
 */
export const AriaCurrentValue = {
  Page: 'page', // current value in a set of pagination links
  Step: 'step', // current value in a step indicator
  Location: 'location', // current value in a chart or other visual flow
  Date: 'date', // current value in a calendar or date picker
  Time: 'time', // current value in a timetable or time picker
  True: 'true', // (fallback) current value in any set of options/elements
  Unset: 'false', // equivalent to omitting the aria-current attribute
} as const;

export type AriaCurrentValue =
  (typeof AriaCurrentValue)[keyof typeof AriaCurrentValue];

/**
 * Accepts a type as an argument and makes all of the keys of the type optional
 */
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<RecursivePartial<U>>
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P] extends infer U | undefined
    ? RecursivePartial<U> | undefined
    : T[P] extends infer U | null
    ? RecursivePartial<U> | null
    : T[P];
};

/**
 * Helper function to use the typechecker to catch when
 * not all cases of a type have been handled.
 *
 * Example 1:
 *   let color: 'red' | 'blue' | 'green';
 *   switch (color) {
 *      case 'red':
 *        ...
 *        break;
 *      case 'blue':
 *        ...
 *        break;
 *      default:
 *        enforceExhaustive(color);
 *                          ^^^^^
 *          Argument of type 'string' is not assignable to parameter of type 'never'.
 *   }
 *
 * Example 2:
 *   let key: number | string | symbol;
 *
 *   if (typeof key === 'string') {
 *     ...
 *     return;
 *   }
 *
 *   if (typeof key === 'number') {
 *      ...
 *      return;
 *   }
 *
 *   enforceExhaustive(key);
 *                     ^^^
 *     Argument of type 'symbol' is not assignable to parameter of type 'never'.
 */
export function enforceExhaustive(value: never): never {
  throw Error(`Received unhandled value: ${value}`);
}
