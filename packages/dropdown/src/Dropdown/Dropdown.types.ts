import React from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';
import { PopoverProps, PortalControlProps } from '@leafygreen-ui/popover';

const HighlightBehavior = {
  Focus: 'focus',
  AriaSelected: 'ariaSelected',
} as const;

type HighlightBehavior =
  (typeof HighlightBehavior)[keyof typeof HighlightBehavior];

export { HighlightBehavior };

type SelectPopoverProps = PortalControlProps &
  Pick<
    PopoverProps,
    'adjustOnMutation' | 'align' | 'justify' | 'spacing' | 'popoverZIndex'
  >;

export type DropdownProps = HTMLElementProps<'div'> &
  SelectPopoverProps & {
    children?: React.ReactNode;
    shouldClose?: () => boolean;
    className?: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    darkMode?: boolean;
    triggerRef: React.RefObject<HTMLElement>;
    highlightBehavior?: HighlightBehavior;
    maxWidth?: number;
  };
