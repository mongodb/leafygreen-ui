import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface CollapseToggleProps extends HTMLElementProps<'button'> {
  collapsed?: boolean;
  hideTooltip?: boolean;
}
