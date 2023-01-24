import { Either, HTMLElementProps } from '@leafygreen-ui/lib';

export const State = {
  None: 'none',
  Loading: 'loading',
} as const;

export type State = typeof State[keyof typeof State];

export const SizeVariant = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type SizeVariant = typeof SizeVariant[keyof typeof SizeVariant];

interface BaseSearchInputProps
  extends HTMLElementProps<'input', HTMLInputElement> {
  /**
   * The current state of the SearchInput. This can be none, or loading.
   */
  state?: State;

  /**
   * Determines whether the component appears in dark theme.
   */
  darkMode?: boolean;

  /**
   * Determines the font size and padding.
   */

  sizeVariant?: SizeVariant;

  /**
   * Determines whether the field is currently disabled.
   * Default: false
   */
  disabled?: boolean;
}

type AriaLabels = 'aria-label' | 'aria-labelledby';
export type SearchInputProps = Either<BaseSearchInputProps, AriaLabels>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
