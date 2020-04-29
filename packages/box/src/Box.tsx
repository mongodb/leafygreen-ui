import React from 'react';

type InferComponentType<C, H> = H extends string ? 'a' : C;

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
  Omit<React.ComponentPropsWithRef<C>, keyof BoxComponentProps>;

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
    const Component = component ?? 'div';
    return <Component href={href} ref={ref} {...rest} />;
  },
) as BoxType;

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
