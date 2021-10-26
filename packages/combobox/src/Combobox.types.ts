import { MutableRefObject, ReactNode } from 'react';

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

interface LabelProps {
  label: string;
  'aria-label'?: string;
}

interface NoLabelProps {
  label?: string;
  'aria-label': string;
}

type EitherLabelProp = LabelProps | NoLabelProps;

export type ComboboxSize = 'default';

export type ComboboxProps = {
  children: ReactNode;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: ComboboxSize;
  darkMode?: boolean;
  state?: 'error' | 'none';
  errorMessage?: string;
  searchState?: 'unset' | 'error' | 'loading';
  searchErrorMessage?: string;
  searchLoadingMessage?: string;
  multiselect?: boolean;
  onFilter?: (value: string) => void;
  clearable?: boolean;
  onClear?: (e: MouseEvent) => void;
  overflow?: 'expand-y' | 'expand-x' | 'scroll-x';
  chipTruncationLocation?: 'start' | 'middle' | 'end';
  className?: string;
} & EitherLabelProp &
  VariableSelectProps;
