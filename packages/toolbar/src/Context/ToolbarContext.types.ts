import { PropsWithChildren } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export type ToolbarProviderProps = PropsWithChildren<{}> &
  DarkModeProps & {
    /**
     * The index of the currently focused item in the toolbar.
     */
    focusedIndex?: number;

    shouldFocus?: boolean;
  };
