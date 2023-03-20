import {
  ComponentClass,
  ReactElement,
  ValidationMap,
  WeakValidationMap,
} from 'react';

interface React18FunctionComponent<P = {}> {
  (props: P, context?: any): ReactElement<any, any> | null;
  propTypes?: WeakValidationMap<P> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}

/**
 * React 18 slightly modifies the typing of `FunctionComponent`.
 * This discrepancy causes issues with checking for anchor-link
 * inferred polymorphic components.
 *
 * @deprecated
 * This should be removed when we upgrade to React 18
 */
export type React18ChildlessComponentType<P = {}> =
  | ComponentClass<P>
  | React18FunctionComponent<P>;
