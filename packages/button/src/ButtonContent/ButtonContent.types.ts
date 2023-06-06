import { ButtonProps } from '../types';

export type ButtonContentProps = ButtonProps &
  Required<
    Pick<
      ButtonProps,
      'darkMode' | 'disabled' | 'variant' | 'size' | 'isLoading'
    >
  >;

export type DefaultContentProps = ButtonContentProps;
