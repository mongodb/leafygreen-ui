import React from 'react';
import PropTypes from 'prop-types';

type InferComponentType<C, H> = H extends string
  ? 'a' | React.ComponentType
  : C;

interface BoxComponentProps<
  C extends React.ElementType = React.ElementType,
  H extends string | undefined = undefined
> {
  href?: H;
  component?: InferComponentType<C, H>;
}

type BoxProps<
  C extends React.ElementType,
  H extends string | undefined
> = BoxComponentProps<C, H> &
  Omit<
    React.ComponentPropsWithRef<C extends React.ComponentType ? any : C>,
    keyof BoxComponentProps
  >;

type BoxType = <
  C extends React.ElementType = 'div',
  H extends string | undefined = undefined
>(
  props: BoxProps<InferComponentType<C, H>, H>,
) => JSX.Element;

// eslint-disable-next-line
export const Box = React.forwardRef(
  <
    C extends React.ElementType = 'div',
    H extends string | undefined = undefined
  >(
    { component, href, ...rest }: BoxProps<C, H>,
    ref: React.Ref<any>,
  ) => {
    const Component = component ? component : href ? 'a' : 'div';
    return <Component href={href} ref={ref} {...rest} />;
  },
) as BoxType;

// @ts-ignore Property 'displayName' does not exist on type 'BoxType'.
Box.displayName = 'Box';

// @ts-ignore Property 'propTypes' does not exist on type 'BoxType'
Box.propTypes = {
  component: PropTypes.elementType,
  href: PropTypes.string,
};

export default Box;

export type OverrideComponentProps<
  C extends React.ElementType,
  H extends string | undefined,
  P
> = P & BoxProps<C, H>;

export type OverrideComponentCast<P> = <
  C extends React.ElementType = 'div',
  H extends string | undefined = undefined
>(
  props: OverrideComponentProps<InferComponentType<C, H>, H, P>,
) => JSX.Element | null;
