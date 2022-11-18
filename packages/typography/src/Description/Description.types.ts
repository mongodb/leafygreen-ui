import { HTMLElementProps } from '@leafygreen-ui/lib';

export type DescriptionProps = HTMLElementProps<'p', never> & {
  darkMode?: boolean;
  disabled?: boolean;
};
