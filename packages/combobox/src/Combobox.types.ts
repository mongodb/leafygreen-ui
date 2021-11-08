import { MutableRefObject, ReactElement, ReactNode } from 'react';
import { Either } from '@leafygreen-ui/lib';

/**
 * Prop Enums & Types
 */

export enum ComboboxSize {
  default,
}
export type ComboboxSizeType = keyof typeof ComboboxSize;

export enum TrunctationLocation {
  start,
  middle,
  end,
  none,
}
export type TrunctationLocationType = keyof typeof TrunctationLocation;

export enum Overflow {
  'expand-y',
  'expand-x',
  'scroll-x',
}
export type OverflowType = keyof typeof Overflow;

export enum State {
  error,
  none,
}
export type StateType = keyof typeof State;

export enum SearchState {
  unset,
  error,
  loading,
}
export type SearchStateType = keyof typeof SearchState;

export enum Filter {
  'starts-with',
  'includes',
  'none',
}
export type FilterType = keyof typeof Filter;

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
  updateValue?: MutableRefObject<(value: SelectValueType<M>) => void>;
  overflow?: M extends true ? OverflowType : undefined;
}

type BaseComboboxProps<M extends boolean> = {
  children?: ReactNode;
  label?: string;
  'aria-label': string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: ComboboxSizeType;
  darkMode?: boolean;
  state?: StateType;
  errorMessage?: string;
  searchState?: SearchStateType;
  searchEmptyMessage?: string;
  searchErrorMessage?: string;
  searchLoadingMessage?: string;
  onFilter?: (value: string) => void;
  clearable?: boolean;
  onClear?: (e: MouseEvent) => void;
  className?: string;
  chipTruncationLocation?: TrunctationLocationType;
  chipCharacterLimit?: number;
  filter?: FilterType;
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
}
