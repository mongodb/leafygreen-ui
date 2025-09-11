import { ReactNode } from 'react';

import { LgIdProps } from '@leafygreen-ui/lib';

/**
 * A simple menu item configuration with only the essential properties.
 * Actions receive the currently selected text as a parameter.
 */
export interface MenuItem {
  /** Display label for the menu item */
  label: string;

  /** Whether the item is disabled */
  disabled?: boolean;

  /** Action handler - receives the selected text */
  action?: (selectedText: string) => void;

  /** Whether this is a separator */
  isSeparator?: boolean;
}

/**
 * Internal state for managing the context menu visibility and content.
 * @internal
 */
export interface MenuState {
  /** Whether the menu is currently visible */
  isVisible: boolean;

  /** Screen coordinates where the menu should appear */
  position: { x: number; y: number };

  /** Array of menu items to display */
  menuItems: Array<MenuItem>;

  /** The text that was selected when the menu was triggered */
  selectedText: string;
}

/**
 * Props for the ContextMenu component.
 * Provides a simple context menu to all child elements.
 */
export interface ContextMenuProps extends LgIdProps {
  /** The content to provide context menu functionality to */
  children: ReactNode;

  /** Menu items to show on right-click */
  menuItems?: Array<MenuItem>;

  /** Whether to prevent the default context menu. @default true */
  preventDefaultContextMenu?: boolean;

  /** Whether the context menu is disabled. @default false */
  disabled?: boolean;
}
