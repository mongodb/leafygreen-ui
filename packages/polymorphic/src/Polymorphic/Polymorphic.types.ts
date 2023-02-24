/**
 * Based on https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/
 */
import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  PropsWithChildren,
  PropsWithoutRef,
  ReactElement,
  RefAttributes,
  WeakValidationMap,
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
export type PropsToOmit<T extends PolymorphicAs, P> = keyof (P & AsProp<T>);

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
export type AllInheritedProps<T extends PolymorphicAs> = T extends 'a'
  ? AnchorProps
  : ComponentPropsWithoutRef<T>;

/**
 * Omits any props inclided in type `P` from the inherited props
 */
export type InheritedProps<T extends PolymorphicAs, XP = {}> = Omit<
  AllInheritedProps<T>,
  PropsToOmit<T, XP>
>;

/**
 * The basic props for the Polymorphic component.
 *
 * Note: Prefer using `PolymorphicPropsWithRef` in most cases
 */
export type PolymorphicProps<
  T extends PolymorphicAs,
  XP = {},
> = PropsWithChildren<XP & AsProp<T>> & InheritedProps<T, XP>;

/**
 * Add the `ref` prop type to PolymorphicProps
 *
 * Prefer this type even in cases where you do not anticipate using a ref
 *
 * @type {T}
 */
export type PolymorphicPropsWithRef<
  T extends PolymorphicAs,
  XP = {},
> = PolymorphicProps<T, XP> & {
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
export interface PolymorphicComponentType<
  XP = {},
  DefaultAs extends PolymorphicAs = PolymorphicAs,
> {
  <T extends PolymorphicAs = DefaultAs>(
    props: PolymorphicPropsWithRef<T, XP>,
    ref: PolymorphicRef<T>,
  ): ReactElement | null;
  displayName?: string;
  propTypes?:
    | WeakValidationMap<
        PropsWithoutRef<
          PolymorphicPropsWithRef<PolymorphicAs, XP> & RefAttributes<any>
        >
      >
    | undefined;
}

/**
 * An explicit definition of the component render function
 *
 * Differs from `PolymorphicComponentType` only by the `propTypes` attribute.
 *
 */
export interface PolymorphicRenderFunction<
  XP = {},
  DefaultAs extends PolymorphicAs = PolymorphicAs,
> {
  <T extends PolymorphicAs = DefaultAs>(
    props: PolymorphicPropsWithRef<T, XP>,
    ref: PolymorphicRef<T>,
  ): ReactElement | null;
  displayName?: string;
  propTypes?: never;
}

// (I'm not entirely clear why we can't use `Omit`, but that doesn't work - AT)
// export type PolymorphicRenderFunction<
//   XP = {},
//   DefaultAs extends PolymorphicAs = PolymorphicAs,
// > = Omit<PolymorphicComponentType<XP, DefaultAs>, 'propTypes'> & {
//   propTypes: never;
// };
