import React, { MouseEventHandler, PropsWithChildren } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export type MessagePromptProps = React.ComponentProps<'button'> &
  DarkModeProps &
  PropsWithChildren<{
    /**
     * Specifies that the MessagePrompt is selected. When one message prompt is selected, the others are disabled by default.
     */
    selected?: boolean;
    /**
     * Specifies that the MessagePrompt is disabled.
     */
    disabled?: boolean;
    /**
     * Event handler called onClick.
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }>;
