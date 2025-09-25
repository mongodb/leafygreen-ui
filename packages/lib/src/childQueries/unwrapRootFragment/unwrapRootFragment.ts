import { Children, Fragment, isValidElement, ReactNode } from 'react';

/**
 * If the provided `ReactNode` is a single Fragment,
 * return the children of that fragment.
 *
 * Otherwise, returns the `children` or an empty array
 *
 * @example
 * ```tsx
 * unwrapRootFragment(
 *  <Fragment>
 *    <Foo />
 *    <Bar />
 *  </Fragment>
 * ) // [<Foo />, <Bar />]
 * ```
 */
export const unwrapRootFragment = (
  children: ReactNode,
): Array<ReactNode> | undefined => {
  if (!children) return undefined;

  if (Children.count(children) === 0) {
    return [];
  }

  if (Children.count(children) === 1) {
    const rootChild = Children.toArray(children)[0];

    if (isValidElement(rootChild) && rootChild.type === Fragment) {
      return Children.toArray(rootChild.props.children);
    }

    return [children];
  }

  return children as Array<ReactNode>;
};
