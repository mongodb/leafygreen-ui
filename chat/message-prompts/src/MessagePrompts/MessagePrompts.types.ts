import { ComponentPropsWithRef, PropsWithChildren } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export type MessagePromptsProps = ComponentPropsWithRef<'div'> &
  DarkModeProps &
  PropsWithChildren<{
    /**
     * When true, the prompts container will transition (fade and shrink to bottom-right)
     * when a prompt is selected.
     * @default false
     */
    enableHideOnSelect?: boolean;

    /**
     * Optional label displayed above the message prompts.
     */
    label?: string;
  }>;
