import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export interface TableProps extends HTMLElementProps<'table'>, DarkModeProps {
  shouldAlternateRowColor?: boolean;
  baseFontSize?: BaseFontSize;
}
