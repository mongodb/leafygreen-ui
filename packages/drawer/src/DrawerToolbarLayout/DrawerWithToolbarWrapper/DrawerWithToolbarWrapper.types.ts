import { HTMLElementProps } from '@leafygreen-ui/lib';

export type DrawerWithToolbarWrapperProps = Omit<
  HTMLElementProps<'div'>,
  'children'
> & {
  drawer: React.ReactNode;
  children: React.ReactNode;
};
