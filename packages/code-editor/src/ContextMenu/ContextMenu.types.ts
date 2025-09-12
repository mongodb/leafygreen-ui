import { ReactNode } from 'react';

import { LgIdProps } from '@leafygreen-ui/lib';

/**
 * A simple menu item configuration with only the essential properties.
 * Actions receive the currently selected text as a parameter.
 */
export interface ContextMenuItem {
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
 * Props for the ContextMenu component.
 * Provides a simple context menu to all child elements.
 */
export interface ContextMenuProps extends LgIdProps {
  /** The content to provide context menu functionality to */
  children: ReactNode;

  /** Menu items to show on right-click */
  menuItems?: Array<ContextMenuItem>;

  /** Whether to prevent the default context menu. @default true */
  preventDefaultContextMenu?: boolean;

  /** Whether the context menu is disabled. @default false */
  disabled?: boolean;
}
