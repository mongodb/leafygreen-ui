import React from 'react';

import { InputOptionProps } from '@leafygreen-ui/input-option';
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
    /*
     * Children rendered in the Dropdown
     */
    children?: React.ReactNode;

    /**
     * Callback to determine whether or not Dropdown should close when user tries to close it.
     */
    shouldClose?: () => boolean;

    /**
     * Determines the open state of the dropdown
     * default: `false`
     */
    open: boolean;

    /**
     * Callback to change the open state of the Menu.
     */
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

    /**
     * Determines whether or not the component will be rendered in dark mode.
     *
     * default: `false`
     */
    darkMode?: boolean;

    /**
     * A ref for the element used to trigger the Dropdown. Passing a triggerRef allows
     * Dropdown to control opening and closing itself internally, as well as handle positioning logic.
     */
    triggerRef: React.RefObject<HTMLElement>;

    /**
     * Determines whether a DropdownItem receives browser focus or just sets the `aria-selected` attribute when a user is
     * traversing the items via keyboard.
     */
    highlightBehavior?: HighlightBehavior;

    /**
     * Determines styles when input option is "checked"
     * @default 'blue'
     */
    checkedVariant?: InputOptionProps['checkedVariant'];

    /**
     * The max width of the dropdown (in px)
     */
    maxWidth?: number;

    /**
     * The max height of the dropdown (in px)
     */
    maxHeight?: number;
  };
