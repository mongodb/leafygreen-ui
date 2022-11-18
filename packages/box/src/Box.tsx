import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import { ElementTag } from './ElementsWithChildren';

// TS Proof of concept https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wChSYBPMJOAUQBskQkA7GAFWtoF44BrJJQiY4AKQDKADQB0ASXZRgrAM7A0jZmxgqK3OAGFckVtq404fZOhgyj4CKfbmkAHhStKAPj0WAqqzAji6W9EwszvoAPobGjmbc5FQWmhEwAAo4YCquHHBIAB4wbAAmKmFakTReoQDepHCNcJgQEABccBykAL5J+vYm2pkQ2bn5RaXlA-FVSDV89U3NrR1dvb60AOJsSEpow6N5hcWsZXABQawu83ANTUcTp+WpCRYA-BVpBzkcNR13jQeJzO0ycnH0H1BQyyOShsz+ALgpgAbrtyJgAK6sDCXOAlCASXBIGAAC2UAHMAOrAUnbUx7b5jY6Tc6BYLcLwACjAMI6dN26kZvwAlHB6ojgKJOcAVC92N9uTDhaLFksmmhHCoIEwZAwIOTOfgADLE4pQNr4AA0cB5IxUMhaEGFiPW60x2JguJlcoyMKZjzOF3Z1U5xRUvrtfJ2DL9IrgHTDEeycBlnXGwOe4VetA+PqFfyRSFRUDFiKIMAxUFYcGSSBENaQ4e+Dtalh4fHw4aUrHJ+DgADJ+3AANr4FBWgglYDIiedsAefAAXRkyjQDAxJUbocbSftjud3SAA

type Override<T, U> = Omit<T, keyof U> & U;
// type Override2<T, U, V> = Override<Override<T, U>, V>;

/** The `as` prop can be (nearly) any HTML element tag, or any React component */
export type AsPropType = ElementTag | React.ComponentType<any>;

/**
 * Box Props types
 */

/** The fallback BoxProps renders as a div */
type BoxDefaultProps<T extends 'div' = 'div', ExtraProps = {}> = Override<
  React.PropsWithChildren<JSX.IntrinsicElements['div'] & ExtraProps>,
  {
    as?: T;
    href?: never;
  }
>;

/** If only an `href` is provided as a prop, we render as an anchor */
type BoxAnchorProps<T extends 'a' = 'a', ExtraProps = {}> = Override<
  React.PropsWithChildren<JSX.IntrinsicElements['a'] & ExtraProps>,
  {
    as: T;
    href: string;
  }
>;

/**
 * If an as prop string is provided, then we render as that HTML element
 */
type BoxPropsIntrinsicElement<
  TTag extends ElementTag,
  ExtraProps = {},
> = React.PropsWithChildren<JSX.IntrinsicElements[TTag] & ExtraProps> & {
  /**
   * The component or HTML Element that the box is rendered as.
   *
   * @type HTML Element | React.Component
   */
  as: TTag;
};

/**
 * If an `as` prop is provided as a component, we render as that component
 */
type BoxPropsComponent<
  TComponent extends React.ComponentType<Props>,
  Props = {},
> = React.PropsWithChildren<Props> & {
  /**
   * The component or HTML Element that the button is rendered as.
   */
  as: TComponent;
};

// prettier-ignore
export type BoxProps<T extends AsPropType, ExtraProps = {}> =
  // if we've received a React component
  T extends React.ComponentType<any> ? BoxPropsComponent<T, ExtraProps> :
  // If we've received an HTML Element, extend those props
  T extends ElementTag ? BoxPropsIntrinsicElement<T, ExtraProps> :
  // Otherwise it's either an anchor or a div
  BoxAnchorProps<'a', ExtraProps> | BoxDefaultProps<'div', ExtraProps>;

/**
 * Type Checkers
 */
// HTML Element
const isIntrinsicProps = <T extends AsPropType>(
  props: any,
): props is T extends ElementTag
  ? BoxPropsIntrinsicElement<T, unknown>
  : never => {
  return props.as != null && typeof props.as === 'string';
};

const isIntrinsicRef = <T extends AsPropType>(
  ref: React.ForwardedRef<any>,
): ref is T extends ElementTag
  ? React.ForwardedRef<HTMLElementTagNameMap[T]>
  : never => {
  return true;
};

// React Component
const isComponentProps = <T extends AsPropType>(
  props: any,
): props is T extends React.ComponentType<any>
  ? BoxPropsComponent<T, unknown>
  : never => {
  return props.as != null && ['function', 'object'].includes(typeof props.as);
};

// Anchor
const isAnchorProps = <T extends AsPropType>(
  props: any,
): props is T extends 'a' ? BoxAnchorProps<T, unknown> : never => {
  return (props as BoxAnchorProps<'a'>).href != null;
};

const isDefaultProps = <T extends AsPropType>(
  props: any,
): props is T extends 'div' ? BoxDefaultProps<T, unknown> : never => {
  return isUndefined((props as BoxDefaultProps<'div'>).href);
};

/**
 * Overloads for the internal Box component
 */
function InternalBox<T extends 'div', P>(
  props: BoxDefaultProps<T, P>,
  ref: React.ForwardedRef<HTMLDivElement>,
): JSX.Element;
function InternalBox<T extends 'a', P>(
  props: BoxAnchorProps<T, P>,
  ref: React.ForwardedRef<HTMLAnchorElement>,
): JSX.Element;
function InternalBox<Tag extends ElementTag, P>(
  props: BoxPropsIntrinsicElement<Tag, P>,
  ref: React.ForwardedRef<HTMLElementTagNameMap[Tag]>,
): JSX.Element;
function InternalBox<TComponent extends React.ComponentType<P>, P>(
  props: BoxPropsComponent<TComponent, P>,
  ref: React.ForwardedRef<TComponent>,
): JSX.Element;
function InternalBox<T extends AsPropType, P extends {}>(
  props: BoxProps<T, P>,
  ref: React.ForwardedRef<any>,
) {
  if (isIntrinsicProps(props) && isIntrinsicRef(ref)) {
    return renderIntrinsicElement(props, ref);
  } else if (isComponentProps(props)) {
    return renderReactCompoment(props, ref);
  } else if (isAnchorProps(props)) {
    return renderAnchorElement(props, ref);
  } else if (isDefaultProps(props)) {
    return <div {...props} ref={ref} />;
  }
}

/**
 * Internal Render Functions
 */

function renderIntrinsicElement<T extends ElementTag, P>(
  props: BoxPropsIntrinsicElement<T, P>,
  ref: React.ForwardedRef<HTMLElementTagNameMap[T]>,
): JSX.Element {
  const { as: Component, ...rest } = props;
  return (
    <Component
      // {...rest}
      ref={ref}
    />
  );
}

function renderReactCompoment<C extends React.ComponentType<any>, P>(
  props: BoxPropsComponent<C, P>,
  ref: React.ForwardedRef<C>,
): JSX.Element {
  const { as: Component, ...rest } = props;
  const allProps: LibraryManagedAttriutes<C> = { ...rest, ref };
  return (
    <Component
      // {...rest}
      // ref={ref}
      {...allProps}
    />
  );
}

function renderAnchorElement<T extends 'a', P>(
  props: BoxAnchorProps<T, P>,
  ref: React.ForwardedRef<HTMLAnchorElement>,
): JSX.Element {
  const { children, ...rest } = props;
  return (
    <a ref={ref} {...rest}>
      {children}
    </a>
  );
}

InternalBox.displayName = 'Box';

/**
 * The Box component handles the `as` prop, allowing the component to be rendered using alternate HTML elements.
 *
 * It also defaults to an `<a>` tag when a `href` prop is set.
 */
const Box = React.forwardRef(InternalBox) as typeof InternalBox;
Box.displayName = 'Box';

// @ts-expect-error
Box.propTypes = {
  as: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.element,
    PropTypes.func,
  ]),
  href: PropTypes.string,
};

export default Box;

export interface ExtendableBox<
  ExtraProps,
  Default extends React.ElementType = 'div',
> extends Pick<
    React.FunctionComponent<BoxProps<Default, ExtraProps>>,
    'displayName' | 'propTypes'
  > {
  <TElement extends ElementTag>(
    props: BoxPropsIntrinsicElement<TElement, ExtraProps>,
  ): JSX.Element | null;
  (props: BoxAnchorProps<ExtraProps>): JSX.Element | null;
  (props: BoxDefaultProps<Default, ExtraProps>): JSX.Element | null;
  <TProps>(props: BoxPropsComponent<TProps, ExtraProps>): JSX.Element | null;
}
