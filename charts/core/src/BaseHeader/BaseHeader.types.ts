import { MouseEvent } from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';

/**
 * Possible variants for the label in the header.
 */
export const LabelVariants = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const;
type LabelVariants = (typeof LabelVariants)[keyof typeof LabelVariants];

export interface HeaderProps extends HTMLElementProps<'div'> {
  labelProps: {
    value: string;
    variant?: LabelVariants;
  };
  moreInfoButtonProps?: {
    show?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  };
  closeButtonProps?: {
    show?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  };
  fullScreenButtonProps?: {
    show?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  };
  resetButtonProps?: {
    show?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  };
  collapseButtonProps?: {
    show?: boolean;
    onClick?: (collapsedState: boolean) => void;
    collapsed?: boolean;
  };
  inputContent?: React.ReactNode;
  messageText?: string;
}
