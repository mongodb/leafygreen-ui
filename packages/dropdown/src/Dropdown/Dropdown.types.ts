import React from 'react';

import { RenderedContext } from '@leafygreen-ui/input-option';
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
    /**
     * Children passed to the dropdown component
     */
    children?: React.ReactNode;

    /**
     * Callback to determine whether or not Menu should close when user tries to close it
     */
    shouldClose?: () => boolean;

    /**
     * Determines the open state of the dropdown
     * @default: `false`
     */
    open: boolean;

    /**
     * Callback to change the open state of the dropdown
     */
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

    /**
     * Determines whether or not the component will be rendered in dark mode
     * @default: `false`
     */
    darkMode?: boolean;

    /**
     * A ref for the element used to trigger the dropdown. Passing a trigger allows dropdown to control opening and closing itself internally, as well as handle positioning logic.
     */
    triggerRef: React.RefObject<HTMLElement>;

    /**
     * Determines how component responds to keyboard navigation
     * Either by manually changing focus or by setting aria-selected attribute
     * @default: 'focus'
     */
    highlightBehavior?: HighlightBehavior;

    /**
     * The max width of the menu (in px).
     */
    maxWidth?: number;

    /**
     * The max height of the menu (in px).
     */
    maxHeight?: number;

    /**
     * Determines how the items are styled
     *
     * @default: 'menu'
     */
    renderedContext?: RenderedContext;
  };
