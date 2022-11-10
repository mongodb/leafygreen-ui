import React from 'react';
import PropTypes from 'prop-types';

type Override<T, U> = Omit<T, keyof U> & U;
// type Override2<T, U, V> = Override<Override<T, U>, V>;

export type AsPropType = keyof JSX.IntrinsicElements | React.ComponentType;

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
type BoxIntrinsic<
  TElement extends keyof JSX.IntrinsicElements,
  ExtraProps = {},
> = Override<
  React.PropsWithChildren<React.ComponentPropsWithRef<TElement> & ExtraProps>,
  {
    /**
     * The component or HTML Element that the box is rendered as.
     *
     * @type HTML Element | React.Component
     */
    as: TElement;
  }
>;

/**
 * If an `as` prop is provided as a component, we render as that component
 */
type BoxComponent<
  TComponent extends React.ComponentType<Props>,
  Props = {},
> = Override<
  React.PropsWithChildren<React.PropsWithRef<Props>>,
  {
    /**
     * The component or HTML Element that the button is rendered as.
     */
    as: TComponent;
  }
>;

export type BoxProps<
  T extends AsPropType,
  ExtraProps = {},
> = T extends React.ComponentType<any>
  ? BoxComponent<T, ExtraProps>
  : T extends keyof JSX.IntrinsicElements
  ? BoxIntrinsic<T, ExtraProps>
  : BoxAnchorProps<never, ExtraProps> | BoxDefaultProps<never, ExtraProps>;

/**
 * Type Checkers
 */
const isIntrinsicProps = <T extends AsPropType>(
  props: any,
): props is BoxIntrinsic<T> => {
  return props.as != null;
};

const isComponentProps = <T extends AsPropType, P = {}>(
  props: any,
): props is BoxComponent<T, P> => {
  return props.as != null;
};

const isAnchorProps = (props: any): props is BoxAnchorProps => {
  if (props.as) return false;
  else return (props as BoxAnchorProps).href != null;
};

/**
 * Overloads for the internal Box component
 */
function _Box(
  props: BoxDefaultProps,
  ref: React.ForwardedRef<'div'>,
): JSX.Element;
function _Box(props: BoxAnchorProps, ref: React.ForwardedRef<'a'>): JSX.Element;
function _Box<TElement extends keyof JSX.IntrinsicElements, ExtraProps>(
  props: BoxIntrinsic<TElement, ExtraProps>,
  ref: React.ForwardedRef<TElement>,
): JSX.Element;
function _Box<TComponent extends React.ComponentType<Props>, Props>(
  props: TComponent,
  ref: React.ForwardedRef<TComponent>,
): JSX.Element;
function _Box<T extends AsPropType, P extends {}>(
  props: BoxProps<T, P>,
  ref: React.ForwardedRef<T>,
) {
  if (isIntrinsicProps<T>(props) || isComponentProps<T, P>(props)) {
    /// @ts-expect-error
    const { as: Component, ...rest } = props;
    /// @ts-expect-error
    return <Component {...rest} ref={ref} />;
  }

  if (isAnchorProps(props)) {
    return <a {...props} ref={ref} />; //eslint-disable-line jsx-a11y/anchor-has-content
  }

  return <div {...props} ref={ref} />;
}

_Box.displayName = 'Box';

/**
 * The Box component handles the `as` prop, allowing the component to be rendered using alternate HTML elements.
 *
 * It also defaults to an `<a>` tag when a `href` prop is set.
 */
// @ts-expect-error
const Box = React.forwardRef(_Box) as typeof _Box;

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
  <TElement extends keyof JSX.IntrinsicElements>(
    props: BoxIntrinsic<TElement, ExtraProps>,
  ): JSX.Element | null;
  (props: BoxAnchorProps<ExtraProps>): JSX.Element | null;
  (props: BoxDefaultProps<Default, ExtraProps>): JSX.Element | null;
  <TProps>(props: BoxComponent<TProps, ExtraProps>): JSX.Element | null;
}
