import React from 'react';
import PropTypes from 'prop-types';

type BoxDivDefault = {
  as?: never;
  href?: never;
} & React.ComponentPropsWithRef<'div'>;

type BoxAnchorDefault = {
  as?: never;
  href: string;
} & React.ComponentPropsWithRef<'a'>;

type BoxIntrinsic<
  TElement extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements
> = {
  as: TElement;
} & React.ComponentPropsWithRef<TElement>;

type BoxComponent<TProps = {}> = {
  as: React.ComponentType<TProps>;
} & React.PropsWithRef<TProps>;

export type BoxProps =
  | BoxAnchorDefault
  | BoxIntrinsic
  | BoxComponent
  | BoxDivDefault;

function InlineBox(props: BoxDivDefault, ref: React.Ref<any>): JSX.Element;
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
  Props,
  Default extends React.ElementType = 'div'
> {
  (props: React.ComponentPropsWithRef<Default> & Props): JSX.Element | null;
  (props: BoxAnchorDefault & Props): JSX.Element | null;
  <TElement extends keyof JSX.IntrinsicElements>(
    props: BoxIntrinsic<TElement> & Props,
  ): JSX.Element | null;
  <TProps>(props: BoxComponent<TProps> & Props): JSX.Element | null;
}
