import React, { PropsWithChildren } from 'react';
import { Polymorph, type PolymorphicAs } from '@leafygreen-ui/polymorphic';

/**
 * Wraps a string in the provided `as` component,
 * or renders the provided `ReactNode`.
 *
 * Useful when rendering `children` props that can be any react node
 *
 * @example
 * ```
 * <TextNode as={h1}>Hello!</TextNode> // <h1>Hello!</h1>
 * ```
 *
 * @example
 * ```
 * <TextNode><h2>Hello!</h2></TextNode> // <h2>Hello!</h2>
 * ```
 */
export const TextNode = ({
  children,
  as,
}: PropsWithChildren<{ as?: PolymorphicAs }>) => {
  return typeof children === 'string' || typeof children === 'number' ? (
    <Polymorph as={as}>{children}</Polymorph>
  ) : (
    children
  );
};
