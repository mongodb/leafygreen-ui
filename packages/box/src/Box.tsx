import React from 'react';

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

function InlineBox(props: BoxDivDefault): JSX.Element;
function InlineBox(props: BoxAnchorDefault): JSX.Element;
function InlineBox<TElement extends keyof JSX.IntrinsicElements>(
  props: BoxIntrinsic<TElement>,
): JSX.Element;
function InlineBox<TProps>(props: BoxComponent<TProps>): JSX.Element;

function InlineBox(props: BoxProps) {
  if (props.as !== undefined) {
    const { as: Component, ...rest } = props;
    // @ts-expect-error
    return <Component {...rest} />;
  }

  if (props.href !== undefined) {
    return <a {...props} />; //eslint-disable-line jsx-a11y/anchor-has-content
  }

  return <div {...props} />;
}

// @ts-expect-error
const Box = React.forwardRef(Box) as typeof InlineBox;

export default Box;

export interface ExtendableBox<Props> {
  (props: BoxDivDefault & Props): JSX.Element | null;
  (props: BoxAnchorDefault & Props): JSX.Element | null;
  <TElement extends keyof JSX.IntrinsicElements>(
    props: BoxIntrinsic<TElement> & Props,
  ): JSX.Element | null;
  <TProps>(props: BoxComponent<TProps> & Props): JSX.Element | null;
}
