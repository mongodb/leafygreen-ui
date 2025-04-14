import { PropsWithChildren } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export type ToolbarProviderProps = PropsWithChildren<{}> &
  DarkModeProps & {
    /**
     * The index of the currently focused item in the toolbar.
     */
    focusedIndex?: number;

    /**
     * Whether the toolbar should focus the currently focused item. This will prevent this component from hijakcing focus on initial page load.
     */
    shouldFocus?: boolean;

    /**
     * Function to set the focused index in the toolbar.
     */
    setFocusedIndex?: React.Dispatch<React.SetStateAction<number>>;
  };
