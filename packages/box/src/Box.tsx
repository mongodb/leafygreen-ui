import React from 'react';
import PropTypes from 'prop-types';

type InferComponentType<Component, Href> = Href extends string
  ? 'a' | React.ComponentType | Component
  : Component;

export type BoxProps<
  Component extends React.ElementType,
  Href extends string | undefined,
  Props extends Record<string, any> = {}
> = Props & {
  href?: Href;
  as?: InferComponentType<Component, Href>;
} & Omit<
    React.ComponentPropsWithRef<
      Component extends React.ComponentType ? any : Component
    >,
    'href' | 'as'
  >;

type BoxType = <
  Component extends React.ElementType = 'div',
  Href extends string | undefined = undefined
>(
  props: BoxProps<InferComponentType<Component, Href>, Href>,
) => JSX.Element | null;

// eslint-disable-next-line
const Box = React.forwardRef(
  <
    C extends React.ElementType = 'div',
    H extends string | undefined = undefined
  >(
    { as, href, ...rest }: BoxProps<C, H>,
    ref: React.Ref<any>,
  ) => {
    const Component = as ? as : href ? 'a' : 'div';

    return <Component href={href} ref={ref} {...rest} />;
  },
) as BoxType;

// @ts-ignore Property 'displayName' does not exist on type 'BoxType'.
Box.displayName = 'Box';

// @ts-ignore Property 'propTypes' does not exist on type 'BoxType'
Box.propTypes = {
  as: PropTypes.elementType,
  href: PropTypes.string,
};

export default Box;

export type OverrideComponentCast<P> = <
  C extends React.ElementType = 'div',
  H extends string | undefined = undefined
>(
  props: BoxProps<C, H, P>,
) => JSX.Element | null;
