import Box, { BoxProps } from './Box';
export { BoxProps };

export type OverrideComponentProps<C extends React.ElementType, P> = P &
  BoxProps<C>;

export default Box;
