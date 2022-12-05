/**
 * Based on https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/
 */
// TODO: Consider restricting HTML elements to only elements that accept children
import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  PropsWithChildren,
  ReactElement,
} from 'react';

export type PolymorphicAs = ElementType;

/**
 * An interface that enables the `as` prop.
 *
 * By defining an `as` prop on a component,
 * we set the type T for all related types/interfaces
 */
export interface AsProp<T extends PolymorphicAs> {
  /** The component or element to render as */
  as?: T;
}

/**
 * The type of the Ref element based on the `as` prop type
 */
export type PolymorphicRef<T extends PolymorphicAs> =
  ComponentPropsWithRef<T>['ref'];

/**
 * Union of prop types potentially re-defined in React.ComponentProps
 */
type PropsToOmit<T extends PolymorphicAs, P> = keyof (P & AsProp<T>);

/**
 * Ensures `href` is required for anchors
 */
export type AnchorProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  /** `href` is required for Anchor tags */
  href: string;
};

/**
 * Parses the expected inherited Props,
 * and adds restrictions based on the passed in type
 */
type InheritedProps<T extends PolymorphicAs> = T extends 'a'
  ? AnchorProps
  : ComponentPropsWithoutRef<T>;

/**
 * The basic props for the Polymorphic component.
 *
 * Note: Prefer using `PolymorphicPropsWithRef` in most cases
 */
export type PolymorphicProps<
  T extends PolymorphicAs,
  P = {},
> = PropsWithChildren<P & AsProp<T>> &
  Omit<InheritedProps<T>, PropsToOmit<T, P>>;

/**
 * Add the `ref` prop type to PolymorphicProps
 *
 * Prefer this type even in cases where you do not anticipate using a ref
 *
 * @type {T}
 */
export type PolymorphicPropsWithRef<
  T extends PolymorphicAs,
  P = {},
> = PolymorphicProps<T, P> & {
  /** The ref object returned by `React.useRef` */
  ref?: PolymorphicRef<T>;
};

/**
 * An explicit definition of the component type
 *
 * Components returned by the `Polymorphic` factory function
 * have this type
 *
 * PolymorphicComponentType is an interface with a generic function,
 * and a displayName.
 */
export interface PolymorphicComponentType<P = {}> {
  <T extends PolymorphicAs>(
    props: PolymorphicPropsWithRef<T, P>,
    ref: PolymorphicRef<T>,
  ): ReactElement | null;
  displayName?: string;
}
