import React from 'react';

export interface BoxComponentProps<
  C extends React.ElementType = React.ElementType
> {
  component?: C;
}

export type BoxProps<C extends React.ElementType> = BoxComponentProps<C> &
  Omit<React.ComponentPropsWithRef<C>, keyof BoxComponentProps>;

// eslint-disable-next-line
export const Box = React.forwardRef(
  (
    { component: Component = 'div', ...rest }: BoxComponentProps,
    ref: React.Ref<Element>,
  ) => {
    return <Component ref={ref} {...rest} />;
  },
) as <C extends React.ElementType = 'div'>(props: BoxProps<C>) => JSX.Element;

export default Box;

export type OverrideComponentProps<E extends React.ElementType, P> = P &
  BoxProps<E>;
