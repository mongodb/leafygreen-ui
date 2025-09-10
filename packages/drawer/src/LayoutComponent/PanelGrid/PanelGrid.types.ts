import { HTMLElementProps } from '@leafygreen-ui/lib';

export type PanelGridProps = Omit<HTMLElementProps<'div'>, 'children'> & {
  children: React.ReactNode;
};
