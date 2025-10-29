import { ComponentPropsWithRef, PropsWithChildren } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export type ChatLayoutProps = ComponentPropsWithRef<'div'> &
  DarkModeProps &
  PropsWithChildren<{
    /**
     * Initial state for whether the side nav is pinned (expanded).
     * @default true
     */
    initialIsPinned?: boolean;

    /**
     * Callback fired when the side nav is toggled (pinned/unpinned).
     * Receives the new `isPinned` state as an argument.
     */
    onTogglePinned?: (isPinned: boolean) => void;
  }>;
