import { ReactElement } from 'react';

/**
 * Type signature that enhances React.forwardRef to support generics more effectively.
 * 
 * This removes the public properties `propTypes` and `displayName`.
 * 
 * You can still use `propTypes` but you have to silence the TS error with `@ts-expect-error`.
 * 
 * `displayName` can be replaced by a named function. 
 * 
 * E.g.
 * 
 * ```
 * const forwardRefWithGenerics: ForwardRefWithGenerics = React.forwardRef;
 * 
 * export const Row = forwardRefWithGenerics(
  function Row<T extends LGRowData>(){})
 *
 * // @ts-expect-error
 * Row.propTypes = {};
 * ```
 */
export interface ForwardRefWithGenerics {
  <T, P = NonNullable<unknown>>(
    render: (props: P, ref: React.ForwardedRef<T>) => ReactElement | null,
  ): (
    props: React.PropsWithoutRef<P> & React.RefAttributes<T>,
  ) => ReactElement | null;
}
