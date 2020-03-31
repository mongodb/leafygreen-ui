import * as typeIs from './typeIs';
import * as testHelpers from './testHelpers';

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

/** Helper type to extract an HTML element's valid props */
export type HTMLElementProps<
  Element extends keyof JSX.IntrinsicElements
> = JSX.IntrinsicElements[Element] extends React.DetailedHTMLProps<
  infer Props,
  any
>
  ? Props
  : never;

export { typeIs, testHelpers };

/** Helper type to check if element is a specific React Component  */
export function isComponentType<T = React.ReactElement>(
  element: React.ReactNode,
  displayName: string,
): element is T {
  return (
    element != null &&
    typeof element === 'object' &&
    'type' in element &&
    (element.type as any).displayName === displayName
  );
}

/** Object mapping keyCodes to keys */
export const keyMap = {
  ArrowUp: 38,
  ArrowDown: 40,
  ArrowLeft: 37,
  ArrowRight: 39,
  Enter: 13,
  Escape: 27,
  Space: 32,
  Tab: 9,
};

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

export type AriaCurrentValue = typeof AriaCurrentValue[keyof typeof AriaCurrentValue];

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
