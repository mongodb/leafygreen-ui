import { ReactElement, ReactNode } from 'react';
import { Either } from '@leafygreen-ui/lib';

/**
 * Prop Enums & Types
 */

export const ComboboxSize = {
  default: 'default',
} as const;
export type ComboboxSize = typeof ComboboxSize[keyof typeof ComboboxSize];

export const TrunctationLocation = {
  start: 'start',
  middle: 'middle',
  end: 'end',
  none: 'none',
} as const;
export type TrunctationLocation = typeof TrunctationLocation[keyof typeof TrunctationLocation];

export const Overflow = {
  expandY: 'expand-y',
  expandX: 'expand-x',
  scrollY: 'scroll-x',
} as const;
export type Overflow = typeof Overflow[keyof typeof Overflow];

export const State = {
  error: 'error',
  none: 'none',
} as const;
export type State = typeof State[keyof typeof State];

export const SearchState = {
  unset: 'unset',
  error: 'error',
  loading: 'loading',
} as const;
export type SearchState = typeof SearchState[keyof typeof SearchState];

/**
 * Generic Typing
 */

export type SelectValueType<M extends boolean> = M extends true
  ? Array<string>
  : string | null;

export type onChangeType<M extends boolean> = M extends true
  ? (value: SelectValueType<true>) => void
  : (value: SelectValueType<false>) => void;

// Returns the correct empty state for multiselcect / single select
export function getNullSelection<M extends boolean>(
  multiselect: M,
): SelectValueType<M> {
  if (multiselect) {
    return ([] as Array<string>) as SelectValueType<M>;
  } else {
    return null as SelectValueType<M>;
  }
}

/**
 * Combobox Props
 */

export interface ComboboxMultiselectProps<M extends boolean> {
  multiselect?: M;
  initialValue?: SelectValueType<M>;
  onChange?: onChangeType<M>;
  value?: SelectValueType<M>;
  overflow?: M extends true ? Overflow : undefined;
}

export interface BaseComboboxProps {
  children?: ReactNode;
  label?: string;
  'aria-label'?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: ComboboxSize;
  darkMode?: boolean;
  state?: State;
  errorMessage?: string;
  searchState?: SearchState;
  searchEmptyMessage?: string;
  searchErrorMessage?: string;
  searchLoadingMessage?: string;
  onFilter?: (value: string) => void;
  clearable?: boolean;
  onClear?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  filteredOptions?: Array<string>;
  className?: string;
  chipTruncationLocation?: TrunctationLocation;
  chipCharacterLimit?: number;
}

export type ComboboxProps<M extends boolean> = Either<
  BaseComboboxProps & ComboboxMultiselectProps<M>,
  'label' | 'aria-label'
>;

/**
 * Combobox Option Props
 */
interface BaseComboboxOptionProps {
  value?: string;
  displayName?: string;
  children?: ReactNode;
  glyph?: ReactElement;
  className?: string;
}

export type ComboboxOptionProps = Either<
  BaseComboboxOptionProps,
  'value' | 'displayName'
>;

export interface InternalComboboxOptionProps {
  value: string;
  displayName: string;
  isSelected: boolean;
  isFocused: boolean;
  setSelected: () => void;
  glyph?: ReactElement;
  className?: string;
  index: number;
}

/**
 * Combobox Chip
 */

export interface ChipProps {
  displayName: string;
  isFocused: boolean;
  onRemove: () => void;
  onFocus: () => void;
}
