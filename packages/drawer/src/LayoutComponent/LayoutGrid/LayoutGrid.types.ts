import { HTMLElementProps } from '@leafygreen-ui/lib';

export type LayoutGridProps = Omit<HTMLElementProps<'div'>, 'children'> & {
  drawer: React.ReactNode;
  children: React.ReactNode;
};
