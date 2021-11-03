import { MutableRefObject, ReactElement, ReactNode } from 'react';
import { Either } from '@leafygreen-ui/lib';
import { isArray, isFunction, isNull } from 'lodash';

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

export function getIsMultiselect(multiselect: boolean) {
  return (
    selection: Array<number> | number | null,
  ): selection is SelectIndexType<true> =>
    multiselect && !isNull(selection) && isArray(selection);
}

// Returns the correct empty state for multiselcect / single select
export function getDefaultIndex<M extends boolean>(
  multiselect: M,
): SelectIndexType<M> {
  if (multiselect) {
    return ([] as Array<number>) as SelectIndexType<M>;
  } else {
    return null as SelectIndexType<M>;
  }
}

/**
 * Combobox Props
 */
interface BaseComboboxProps<M extends boolean> {
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
  overflow?: OverflowType;
  chipTruncationLocation?: TrunctationLocationType;
  className?: string;

  multiselect: M;
  initialValue?: SelectValueType<M>;
  onChange?: onChangeType<M>;
  updateValue?: MutableRefObject<(value: SelectValueType<M>) => void>;
}

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
}

/**
 * Combobox Chip
 */

export interface ChipProps {
  value: string;
  displayName: string;
  onRemove: () => void;
  truncation?: TrunctationLocationType;
}
