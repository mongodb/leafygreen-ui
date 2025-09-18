import React, { ChangeEventHandler } from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';

export interface PreviewCardProps
  extends DarkModeProps,
    LgIdProps,
    React.ComponentProps<'div'> {
  /**
   * Height of the card when collapsed, can be a number (in pixels) or a string (e.g., '50%').
   * @default 140
   */
  collapsedHeight?: number | string;

  /**
   * The default open state of the card when it is uncontrolled.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * The open state of the card. Providing this prop will switch the component to controlled mode.
   */
  isOpen?: boolean;

  /**
   * Event handler called when the open state of the card changes.
   */
  onOpenChange?: ChangeEventHandler<boolean>;

  /**
   * Button text when the card is expanded.
   * @default "View less"
   */
  viewLessText?: React.ReactNode;

  /**
   * Button text when the card is collapsed.
   * @default "View more"
   */
  viewMoreText?: React.ReactNode;
}
