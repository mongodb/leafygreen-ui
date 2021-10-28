import { MutableRefObject, ReactElement, ReactNode } from 'react';
import { Either } from '@leafygreen-ui/lib';

interface SingleSelectProps {
  multiselect?: false;
  onChange?: (value: string) => void;
  updateValue?: MutableRefObject<(value: string) => void>;
}

interface MultiSelectProps {
  multiselect: true;
  onChange?: (value: Array<string>) => void;
  updateValue?: MutableRefObject<(value: Array<string>) => void>;
}

type VariableSelectProps = SingleSelectProps | MultiSelectProps;

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

type BaseComboboxProps = {
  children?: ReactNode;
  label?: string;
  'aria-label': string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: ComboboxSizeType;
  darkMode?: boolean;
  state?: 'error' | 'none';
  errorMessage?: string;
  searchState?: 'unset' | 'error' | 'loading';
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
 * Combobox Option
 */

interface BaseComboboxOptionProps {
  value?: string;
  displayName?: string;
  children?: ReactNode;
  glyph?: ReactElement;
  // description?: string
  className?: string;
}

export type ComboboxOptionProps = Either<
  BaseComboboxOptionProps,
  'value' | 'displayName'
>;

export interface InternalComboboxOptionProps {
  value: string;
  displayName: string;
  // children?: ReactNode;
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
