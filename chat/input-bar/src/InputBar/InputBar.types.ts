import { FormEvent, ReactElement } from 'react';
import { TextareaAutosizeProps } from 'react-textarea-autosize';

import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { PortalControlProps } from '@leafygreen-ui/popover';

export type InputBarProps = HTMLElementProps<'form'> &
  DarkModeProps & {
    /**
     * Props passed to the TextareaAutosize component.
     * https://www.npmjs.com/package/react-autosize-textarea
     */
    textareaProps?: TextareaAutosizeProps;
    /**
     * Submit event handler
     */
    onMessageSend?: (
      messageBody: string,
      e?: FormEvent<HTMLFormElement>,
    ) => void;
    /**
     * Toggles the gradient animation around the input
     * @default true
     */
    shouldRenderGradient?: boolean;
    /**
     * Determines the text inside the rendered Badge
     */
    badgeText?: string;
    /**
     * Determines whether the user can interact with the InputBar
     */
    disabled?: boolean;
    /**
     * When defined as `true`, disables the send action and button
     */
    disableSend?: boolean;
    /**
     * Footer content displayed when a dropdown is rendered. Only renders when children exist.
     */
    dropdownFooterSlot?: ReactElement;

    /**
     * Props passed to the Popover that renders the suggested promps.
     */
    dropdownProps?: PortalControlProps;
  };

export type { TextareaAutosizeProps };
