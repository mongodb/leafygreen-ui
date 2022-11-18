import { HTMLElementProps } from '@leafygreen-ui/lib';

export type LabelProps = HTMLElementProps<'label', never> & {
  darkMode?: boolean;
  htmlFor: string;
  disabled?: boolean;
};
