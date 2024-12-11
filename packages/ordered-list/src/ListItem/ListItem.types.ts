import { HTMLElementProps } from '@leafygreen-ui/lib';

export type ListItemProps = HTMLElementProps<'li'> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  darkMode?: boolean;
};
