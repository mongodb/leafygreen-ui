import { MouseEventHandler } from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';

/**
 * Possible variants for the label in the header.
 */
export const TitleVariant = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const;
type TitleVariant = (typeof TitleVariant)[keyof typeof TitleVariant];

export interface BaseHeaderProps extends HTMLElementProps<'div'> {
  /**
   * Props for the title of the header.
   */
  titleProps: {
    value: string;
    variant?: TitleVariant;
  };

  /**
   * Props for the collapse button in the header.
   */
  toggleButtonProps?: {
    show?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    isOpen?: boolean;
  };

  /**
   * Content to be rendered to the right of the label.
   */
  headerContent?: React.ReactNode;
}
