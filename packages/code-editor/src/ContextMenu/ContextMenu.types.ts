import { ReactNode } from 'react';

import { LgIdProps } from '@leafygreen-ui/lib';

import { type MenuItem } from './ContextMenuContent';

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
