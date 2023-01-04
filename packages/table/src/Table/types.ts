import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export interface TableProps extends HTMLElementProps<'table'>, DarkModeProps {
  hasSelectableRows?: boolean;
  shouldAlternateRowColor?: boolean;
  baseFontSize?: BaseFontSize;
}

export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

export type WithOptionalProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]?: Type[Property];
};
