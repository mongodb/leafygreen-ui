import React from 'react';
import PropTypes from 'prop-types';

type Override<T, U> = Omit<T, keyof U> & U;
type Override2<T, U, V> = Override<Override<T, U>, V>;

type BoxDefault<
  Default extends React.ElementType = 'div',
  ExtraProps = {},
> = Override2<
  React.ComponentPropsWithRef<Default>,
  {
    as?: never;
    href?: never;
  },
  ExtraProps
>;

type BoxAnchorDefault<ExtraProps = {}> = Override2<
  React.ComponentPropsWithRef<'a'>,
  {
    as?: never;
    href: string;
  },
  ExtraProps
>;

type BoxIntrinsic<
  TElement extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements,
  ExtraProps = {},
> = Override2<
  React.ComponentPropsWithRef<TElement>,
  {
    /**
     * The component or HTML Element that the button is rendered as.
     *
     * @type HTML Element | React.Component
     */
    as: TElement;
  },
  ExtraProps
>;

type BoxComponent<TProps = {}, ExtraProps = {}> = Override2<
  React.PropsWithRef<TProps>,
  {
    /**
     * The component or HTML Element that the button is rendered as.
     */
    as: React.ComponentType<React.PropsWithChildren<TProps>>;
  },
  ExtraProps
>;

// TODO: TSDoc
export type BoxProps<
  Default extends React.ElementType = 'div',
  ExtraProps = {},
> =
  | BoxAnchorDefault<ExtraProps>
  | BoxIntrinsic<keyof JSX.IntrinsicElements, ExtraProps>
  | BoxComponent<{}, ExtraProps>
  | BoxDefault<Default, ExtraProps>;

function InlineBox(props: BoxDefault, ref: React.Ref<any>): JSX.Element;
function InlineBox(props: BoxAnchorDefault, ref: React.Ref<any>): JSX.Element;
function InlineBox<TElement extends keyof JSX.IntrinsicElements>(
  props: BoxIntrinsic<TElement>,
  ref: React.Ref<any>,
): JSX.Element;
function InlineBox<TProps>(
  props: BoxComponent<TProps>,
  ref: React.Ref<any>,
): JSX.Element;

function InlineBox(props: BoxProps, ref: React.Ref<any>) {
  if (props.as != null) {
    const { as: Component, ...rest } = props;
    // @ts-expect-error
    return <Component {...rest} ref={ref} />;
  }

  if (props.href != null) {
    return <a {...props} ref={ref} />; //eslint-disable-line jsx-a11y/anchor-has-content
  }

  return <div {...props} ref={ref} />;
}

InlineBox.displayName = 'InlineBox';

/**
 * The Box component handles the `as` prop, allowing the component to be rendered using alternate HTML elements.
 *
 * It also defaults to an `<a>` tag when a `href` prop is set.
 */
// @ts-expect-error
const Box = React.forwardRef(InlineBox) as typeof InlineBox;

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
    React.FunctionComponent<
      React.PropsWithChildren<BoxProps<Default, ExtraProps>>
    >,
    'displayName' | 'propTypes'
  > {
  <TElement extends keyof JSX.IntrinsicElements>(
    props: BoxIntrinsic<TElement, ExtraProps>,
  ): JSX.Element | null;
  (props: BoxAnchorDefault<ExtraProps>): JSX.Element | null;
  (props: BoxDefault<Default, ExtraProps>): JSX.Element | null;
  <TProps>(props: BoxComponent<TProps, ExtraProps>): JSX.Element | null;
}
