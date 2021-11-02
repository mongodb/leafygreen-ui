import { MutableRefObject, ReactElement, ReactNode } from 'react';
import { Either } from '@leafygreen-ui/lib';

interface SingleSelectProps {
  multiselect?: false;
  initialValue?: string;
  onChange?: (value: string) => void;
  updateValue?: MutableRefObject<(value: string) => void>;
}

interface MultiSelectProps {
  multiselect: true;
  initialValue?: Array<string>;
  onChange?: (value: Array<string>) => void;
  updateValue?: MutableRefObject<(value: Array<string>) => void>;
}

type VariableSelectProps = SingleSelectProps | MultiSelectProps;

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
