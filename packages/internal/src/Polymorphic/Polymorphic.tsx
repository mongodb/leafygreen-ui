/* eslint-disable react/display-name */
/**
 * Based on https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/
 */

import React from 'react';

/** An interface that defines the `as` prop */
export interface AsProp<T extends React.ElementType> {
  /** The component or element to render as */
  as?: T;
}

/**
 * The type of the Ref element
 */
export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref'];

/**
 * Union of re-declared types
 */
type PropsToOmit<T extends React.ElementType, P> = keyof (P & AsProp<T>);

type InheritedProps<T extends React.ElementType> = T extends 'a'
  ? Omit<React.ComponentPropsWithoutRef<T>, 'href'> & {
      /** `href` is required for Anchor tags */
      href: string;
    }
  : React.ComponentPropsWithoutRef<T>;

/**
 * The basic props for the Polymorphic component
 */
export type PolymorphicProps<
  T extends React.ElementType,
  P = {},
> = React.PropsWithChildren<P & AsProp<T>> &
  Omit<InheritedProps<T>, PropsToOmit<T, P>>;

/**
 * Add the `ref` prop type to PolymorphicProps
 *
 * @type {T}
 */
export type PolymorphicPropsWithRef<
  T extends React.ElementType,
  P = {},
> = PolymorphicProps<T, P> & {
  /** The ref object returned by `React.useRef` */
  ref?: PolymorphicRef<T>;
};

/**
 * An explicit definition of the component type
 *
 * @type {T}
 */
type PolymorphicComponentType = <T extends React.ElementType = 'div'>(
  props: PolymorphicPropsWithRef<T>,
) => React.ReactElement | null;

// type PolymorphicComponentType<T extends React.ElementType = 'div'> =
//   React.ForwardRefExoticComponent<PolymorphicPropsWithRef<T>>;

export const Polymorphic = React.forwardRef(
  <T extends React.ElementType = 'div'>(
    { as, children, ...rest }: PolymorphicPropsWithRef<T>,
    ref: PolymorphicRef<T>,
  ) => {
    const Component = as || 'div';

    return (
      <Component {...rest} ref={ref}>
        {children}
      </Component>
    );
  },
) as PolymorphicComponentType;

// eslint-disable-next-line react/display-name
// export const Polymorphic = PolymorphicForwardRef(
//   <T extends React.ElementType = 'div'>(
//     { as, children, ...rest }: PolymorphicPropsWithRef<T>,
//     ref: PolymorphicRef<T>,
//   ) => {
//     const Component = as || 'div';

//     return (
//       <Component {...rest} ref={ref}>
//         {children}
//       </Component>
//     );
//   },
// );

// function PolymorphicForwardRef<T extends React.ElementType>(
//   render: (
//     props: PolymorphicPropsWithRef<T>,
//     ref: PolymorphicRef<T>,
//   ) => React.ReactElement,
// ): React.ComponentType<PolymorphicPropsWithRef<T>> {
//   return React.forwardRef<PolymorphicRef<T>, PolymorphicPropsWithRef<T>>(
//     render,
//   );
// }

// type Q<T extends React.ElementType> = { as: T } & Omit<
//   PolymorphicProps<T, { title?: string | undefined }>,
//   'title' | 'as'
// > & { children: string | undefined };
