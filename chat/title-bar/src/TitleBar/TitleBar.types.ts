import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export const Align = {
  Center: 'center',
  Left: 'left',
} as const;

export type Align = (typeof Align)[keyof typeof Align];

export interface TitleBarProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>,
    DarkModeProps {
  /**
   * Alignment of the title text and badge
   * @default Align.Left
   * @remarks This prop is only considered when the parent `LeafyGreenChatProvider` has `variant="spacious"`.
   * @deprecated The spacious variant will be removed by EOY 2025. Instead, use the compact variant.
   */
  align?: Align;

  /**
   * Badge text rendered to indicate 'Beta' or 'Experimental' flags
   */
  badgeText?: string;

  /**
   * Slot for custom close icon
   * @remarks This prop is only considered when the parent `LeafyGreenChatProvider` has `variant="spacious"`.
   * @deprecated The spacious variant will be removed by EOY 2025. Instead, use the compact variant.
   */
  iconSlot?: React.ReactNode;

  /**
   * Event handler called when the close button is clicked
   * @remarks This prop is only considered when the parent `LeafyGreenChatProvider` has `variant="spacious"`.
   * @deprecated The spacious variant will be removed by EOY 2025. Instead, use the compact variant.
   */
  onClose?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;

  /**
   * Title text
   */
  title: string;
}
