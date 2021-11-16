import { MutableRefObject, ReactElement, ReactNode } from 'react';
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

export const Filter = {
  startsWith: 'starts-with',
  includes: 'includes',
} as const;
export type Filter = typeof Filter[keyof typeof Filter];

// TODO - replace with filteredOptions prop
// Default behavior is to filter includes & sort

/**
 * Generic Typing
 */

export type SelectValueType<M extends boolean> = M extends true
  ? Array<string>
  : string | null;
export type SelectIndexType<M extends boolean> = M extends true
  ? Array<number>
  : number | null;

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

interface ComboboxMultiselectProps<M extends boolean> {
  multiselect?: M;
  initialValue?: SelectValueType<M>;
  onChange?: onChangeType<M>;
  // updateValue?: MutableRefObject<(value: SelectValueType<M>) => void>;
  value?: SelectValueType<M>;
  overflow?: M extends true ? Overflow : undefined;
}

type BaseComboboxProps<M extends boolean> = {
  children?: ReactNode;
  label?: string;
  'aria-label': string;
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
  onClear?: (e: MouseEvent) => void;
  filteredOptions?: Array<string>;
  className?: string;
  chipTruncationLocation?: TrunctationLocation;
  chipCharacterLimit?: number;
} & ComboboxMultiselectProps<M>;

export type ComboboxProps<M extends boolean> = Either<
  BaseComboboxProps<M>,
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
  onRemove: () => void;
  isFocused: boolean;
}
