import { DarkModeProps } from '@leafygreen-ui/lib';

import { GetLgIdsReturnType } from '../utils';

export type ToolbarProviderProps = DarkModeProps & {
  /**
   * The index of the currently focused item in the toolbar.
   */
  focusedIndex?: number;

  /**
   * Whether the toolbar should focus the currently focused item. This will prevent this component from hijacking focus on initial page load.
   */
  shouldFocus?: boolean;

  /**
   * Function to set the focused index in the toolbar.
   */
  setFocusedIndex?: React.Dispatch<React.SetStateAction<number>>;

  /**
   * LGIDs for Toolbar components.
   */
  lgids: GetLgIdsReturnType;

  /**
   * The children of the ToolbarProvider.
   */
  children: React.ReactNode;
};
