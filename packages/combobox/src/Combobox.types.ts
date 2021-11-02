import { MutableRefObject, ReactElement, ReactNode } from 'react';
import { Either } from '@leafygreen-ui/lib';
import { isArray, isNull } from 'lodash';

export type SingleSelectValue<T extends number | string> = T;
export type MultiSelectValue<T extends number | string> = Array<T>;

export type SelectValueType<
  M extends boolean,
  T extends number | string = string
> = M extends true ? MultiSelectValue<T> : SingleSelectValue<T>;

export const getIsMultiselect = (multiselect: boolean) => {
  return (
    selection: SingleSelectValue<number> | MultiSelectValue<number> | null,
  ): selection is SelectValueType<true, number> =>
    multiselect && !isNull(selection) && isArray(selection);
};

interface ValueProps<M extends boolean> {
  multiselect: M;
  value?: SelectValueType<M>;
  initialValue?: SelectValueType<M>;
  onChange?: (value: SelectValueType<M>) => void;
  updateValue?: MutableRefObject<(value: SelectValueType<M>) => void>;
}

type VariableSelectProps = ValueProps<true> | ValueProps<false>;

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
 * Combobox Props
 */

type BaseComboboxProps = {
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
  multiselect?: boolean;
  onFilter?: (value: string) => void;
  clearable?: boolean;
  onClear?: (e: MouseEvent) => void;
  overflow?: OverflowType;
  chipTruncationLocation?: TrunctationLocationType;
  className?: string;
} & VariableSelectProps;

export type ComboboxProps = Either<BaseComboboxProps, 'label' | 'aria-label'>;

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
