import { LgIdProps } from '@leafygreen-ui/lib';

import type { ContextMenuItem, ContextMenuProps } from '../ContextMenu';

export interface CodeEditorContextMenuProps
  extends LgIdProps,
    Omit<ContextMenuProps, 'menuItems'> {
  /** Additional menu items to show below the default Cut/Copy/Paste items */
  customMenuItems?: Array<ContextMenuItem>;
}
