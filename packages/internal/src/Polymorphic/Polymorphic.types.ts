/**
 * Based on https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/
 */
import React from 'react';

// TODO: Consider restricting HTML elements to only elements that accept children
/**
 * A subset of HTMLElements that accept children
 */
/*
export type HTMLElements = Omit<
  HTMLElementTagNameMap,
  // Excludes Void & Foreign elements
  // (https://html.spec.whatwg.org/multipage/syntax.html#void-elements)
  | 'object'
  | 'area'
  | 'base'
  | 'br'
  | 'col'
  | 'embed'
  | 'hr'
  | 'img'
  | 'input'
  | 'link'
  | 'meta'
  | 'source'
  | 'track'
  | 'wbr'
  | 'template'
  | 'script'
  | 'style'
  | keyof React.ReactSVG
>;
export type ElementTag = keyof HTMLElements
*/

/** An interface that defines the `as` prop */
export interface AsProp<T extends React.ElementType> {
  /** The component or element to render as */
  as?: T;
}

/**
 * The type of the Ref element based on the `as` prop type
 */
export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref'];

/**
 * Union of prop types potentially re-defined in React.ComponentProps
 */
type PropsToOmit<T extends React.ElementType, P> = keyof (P & AsProp<T>);

/**
 * Parses the expected inherited Props,
 * and adds restrictions based on the passed in type
 */
type InheritedProps<T extends React.ElementType> = T extends 'a'
  ? Omit<React.ComponentPropsWithoutRef<T>, 'href'> & {
      /** `href` is required for Anchor tags */
      href: string;
    }
  : React.ComponentPropsWithoutRef<T>;

/**
 * The basic props for the Polymorphic component.
 *
 * Prefer using `PolymorphicPropsWithRef` in most cases
 */
export type PolymorphicProps<T extends React.ElementType, P = {}> =
  React.PropsWithChildren<P & AsProp<T>> &
    Omit<InheritedProps<T>, PropsToOmit<T, P>>;

/**
 * Add the `ref` prop type to PolymorphicProps
 *
 * Note: Prefer using this type
 * even in cases where you do not anticipate using a ref
 *
 * @type {T}
 */
export type PolymorphicPropsWithRef<T extends React.ElementType, P = {}> =
  PolymorphicProps<T, P> & {
    /** The ref object returned by `React.useRef` */
    ref?: PolymorphicRef<T>;
  };

/**
 * An explicit definition of the component type
 *
 * @type {T}
 */
export interface PolymorphicComponentType<P = {}> {
  <T extends React.ElementType = 'div'>(
    props: PolymorphicPropsWithRef<T, P>,
    ref: PolymorphicRef<T>,
  ): React.ReactElement | null;
  displayName?: string;
}
