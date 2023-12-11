import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface AnimateHeightProps extends HTMLElementProps<'div'> {
  isVisible?: boolean;
  enabled?: boolean;
}
