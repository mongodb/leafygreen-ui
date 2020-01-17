import * as typeIs from './typeIs';

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

export { typeIs };

/** Helper type to check if element is a specific React Component  */
export function isComponentType(
  element: React.ReactNode,
  displayName: string,
): element is React.ReactElement {
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
