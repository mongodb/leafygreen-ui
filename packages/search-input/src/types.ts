import { HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export const State = {
  None: 'none',
  Loading: 'loading',
} as const;

export type State = typeof State[keyof typeof State];

export const SizeVariant = {
  XSmall: 'xsmall',
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type SizeVariant = typeof SizeVariant[keyof typeof SizeVariant];

export interface SearchInputProps
  extends HTMLElementProps<'input', HTMLInputElement> {
  /**
   * Screen-reader label element.
   */
  ['aria-labelledby']: string;

  /**
   * The current state of the SearchInput. This can be none, or loading.
   */
  state?: State;

  /**
   *  determines whether or not the component appears in dark theme.
   */
  darkMode?: boolean;

  /**
   *  determines the font size and padding.
   */

  sizeVariant?: SizeVariant;

  /**
   *  determines the base font size if sizeVariant is set to default.
   */

  baseFontSize?: BaseFontSize;
}
