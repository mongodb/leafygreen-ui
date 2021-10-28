import { MutableRefObject, ReactElement, ReactNode } from 'react';
import { Either } from '@leafygreen-ui/lib';
import { glyphs } from '@leafygreen-ui/icon';

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

export type ComboboxSize = 'default';

type BaseComboboxProps = {
  children?: ReactNode;
  label?: string;
  'aria-label': string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: ComboboxSize;
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
  overflow?: 'expand-y' | 'expand-x' | 'scroll-x';
  chipTruncationLocation?: 'start' | 'middle' | 'end';
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
