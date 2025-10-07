import {
  ComponentPropsWithRef,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export type MessagePromptsProps = ComponentPropsWithRef<'div'> &
  DarkModeProps &
  PropsWithChildren<{
    /**
     * When true, the prompts container will transition (fade and shrink)
     * when a prompt is selected.
     * @default true
     */
    enableHideOnSelect?: boolean;

    /**
     * Optional label displayed above the message prompts.
     */
    label?: string;

    /**
     * Event handler called when the refresh button is clicked.
     * When provided, a refresh IconButton will be rendered next to the label.
     * The button is disabled when a prompt is selected.
     */
    onClickRefresh?: MouseEventHandler<HTMLButtonElement>;
  }>;
