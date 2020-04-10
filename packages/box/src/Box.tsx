import React from 'react';

export interface BoxComponentProps<
  C extends React.ElementType = React.ElementType
> {
  component?: C;
}

export type BoxProps<C extends React.ElementType> = BoxComponentProps<C> &
  Omit<React.ComponentPropsWithRef<C>, keyof BoxComponentProps>;

//eslint-disable-next-line react/display-name
const Box = React.forwardRef(
  ({ component, ...rest }: BoxComponentProps, ref) => {
    const Root = component ?? 'div';

    return <Root {...rest} ref={ref} />;
  },
) as <C extends React.ElementType = 'div'>(props: BoxProps<C>) => JSX.Element;

export default Box;
