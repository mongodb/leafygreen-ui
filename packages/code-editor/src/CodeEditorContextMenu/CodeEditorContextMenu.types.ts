import { LgIdProps } from '@leafygreen-ui/lib';

import { ContextMenuItem } from '../ContextMenu';

export interface CodeEditorContextMenuProps extends LgIdProps {
  /** The content to provide context menu functionality to */
  children: React.ReactNode;

  /** Additional menu items to show below the default Cut/Copy/Paste items */
  customMenuItems?: Array<ContextMenuItem>;
}
