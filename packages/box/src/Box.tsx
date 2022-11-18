import React from 'react';
import PropTypes from 'prop-types';
import { IntrinsicElementTag } from './ElementsWithChildren';

type Override<T, U> = Omit<T, keyof U> & U;
// type Override2<T, U, V> = Override<Override<T, U>, V>;

/** The `as` prop can be (nearly) any HTML element tag, or any React component */
export type AsPropType = IntrinsicElementTag | React.ComponentType<any>;

/**
 * Box Props types
 */

/** The fallback BoxProps renders as a div */
type BoxDefaultProps<T extends never = never, ExtraProps = {}> = Override<
  React.PropsWithChildren<React.ComponentPropsWithRef<'div'> & ExtraProps>,
  {
    as?: T;
    href?: never;
  }
>;

/** If only an `href` is provided as a prop, we render as an anchor */
type BoxAnchorProps<T extends never = never, ExtraProps = {}> = Override<
  React.PropsWithChildren<React.ComponentPropsWithRef<'a'> & ExtraProps>,
  {
    as?: T;
    href: string;
  }
>;

/**
 * If an as prop string is provided, then we render as that HTML element
 */
type BoxPropsIntrinsicElement<
  TElement extends IntrinsicElementTag,
  ExtraProps = {},
> = React.PropsWithChildren<
  React.ComponentPropsWithRef<TElement> & ExtraProps
> & {
  /**
   * The component or HTML Element that the box is rendered as.
   *
   * @type HTML Element | React.Component
   */
  as?: TElement;
};

/**
 * If an `as` prop is provided as a component, we render as that component
 */
type BoxPropsComponent<
  TComponent extends React.ComponentType<Props>,
  Props = {},
> = React.PropsWithChildren<React.PropsWithRef<Props>> & {
  /**
   * The component or HTML Element that the button is rendered as.
   */
  as?: TComponent;
};

export type BoxProps<T extends AsPropType, ExtraProps = {}> =
  // | BoxPropsComponent<React.ComponentType<any>, ExtraProps>
  // | BoxPropsIntrinsicElement<IntrinsicElementTag, ExtraProps>
  // | BoxAnchorProps<never, ExtraProps>
  // | BoxDefaultProps<never, ExtraProps>;

  // prettier-ignore
  // if we've received a React component
  T extends React.ComponentType<any> ? BoxPropsComponent<T, ExtraProps> :
  // If we've received an HTML Element, extend those props
  T extends IntrinsicElementTag ? BoxPropsIntrinsicElement<T, ExtraProps> :
  // Otherwise it's either an anchor or a div
  BoxAnchorProps<never, ExtraProps> | BoxDefaultProps<never, ExtraProps>;

/**
 * Type Checkers
 */
const isIntrinsicProps = <T extends AsPropType, Props extends BoxProps<T>>(
  props: Props,
): props is T extends IntrinsicElementTag
  ? BoxPropsIntrinsicElement<T>
  : never => {
  return props.as != null && typeof props.as === 'string';
};

const isComponentProps = <T extends AsPropType, Props extends BoxProps<T>>(
  props: Props,
): props is T extends React.ComponentType<any>
  ? BoxPropsComponent<T, Props>
  : never => {
  return props.as != null && ['function', 'object'].includes(typeof props.as);
};

const isAnchorProps = <P extends BoxProps>(
  props: P,
): props is BoxAnchorProps<never, any> => {
  if (props.as) return false;
  else return (props as BoxAnchorProps<never, P>).href != null;
};

/**
 * Overloads for the internal Box component
 */
function InternalBox(
  props: BoxDefaultProps,
  ref: React.ForwardedRef<'div'>,
): JSX.Element;
function InternalBox(
  props: BoxAnchorProps,
  ref: React.ForwardedRef<'a'>,
): JSX.Element;
function InternalBox<TElement extends IntrinsicElementTag, ExtraProps>(
  props: BoxPropsIntrinsicElement<TElement, ExtraProps>,
  ref: React.ForwardedRef<TElement>,
): JSX.Element;
function InternalBox<TComponent extends React.ComponentType<Props>, Props>(
  props: TComponent,
  ref: React.ForwardedRef<TComponent>,
): JSX.Element;
function InternalBox<T extends AsPropType, P extends {}>(
  props: BoxProps<P>,
  ref: React.ForwardedRef<T>,
) {
  if (isIntrinsicProps(props) || isComponentProps(props)) {
    const { as: Component, ...rest } = props;
    return <Component {...rest} ref={ref} />;
  }

  if (isAnchorProps(props)) {
    return <a {...props} ref={ref} />; //eslint-disable-line jsx-a11y/anchor-has-content
  }

  return <div {...props} ref={ref} />;
}

InternalBox.displayName = 'Box';

/**
 * The Box component handles the `as` prop, allowing the component to be rendered using alternate HTML elements.
 *
 * It also defaults to an `<a>` tag when a `href` prop is set.
 */
// @ts-expect-error
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
  <TElement extends IntrinsicElementTag>(
    props: BoxPropsIntrinsicElement<TElement, ExtraProps>,
  ): JSX.Element | null;
  (props: BoxAnchorProps<ExtraProps>): JSX.Element | null;
  (props: BoxDefaultProps<Default, ExtraProps>): JSX.Element | null;
  <TProps>(props: BoxPropsComponent<TProps, ExtraProps>): JSX.Element | null;
}
