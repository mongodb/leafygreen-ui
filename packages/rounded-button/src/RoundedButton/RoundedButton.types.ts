import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface RoundedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button contents */
  children?: ReactNode;
}