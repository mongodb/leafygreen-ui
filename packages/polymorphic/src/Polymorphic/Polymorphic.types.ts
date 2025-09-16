/**
 * Based on https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/
 */
import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  FunctionComponent,
  PropsWithChildren,
  WeakValidationMap,
} from 'react';

export type IntrinsicElements<P = any> =
  | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K]
        ? K
        : never;
    }[keyof JSX.IntrinsicElements];

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
  | ComponentPropsWithRef<T>['ref']
  | null;
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
 * Extends `{@link ComponentPropsWithoutRef<T>}`, but
 * omits any props also included in type `XP`
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
 * The return type of a render function.
 * Note: This type changed from `ReactElement` to `ReactNode` in React 18 + TS 5
 */
export type PolymorphicReturnType = ReturnType<FunctionComponent>;

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
  ): PolymorphicReturnType;
  displayName?: string;
  propTypes?: WeakValidationMap<PolymorphicProps<DefaultAs, XP>>;
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
  ): PolymorphicReturnType;
  displayName?: string;
  propTypes?: never;
}
