import React, { FormEvent, ReactElement, RefObject } from 'react';
import { TextareaAutosizeProps } from 'react-textarea-autosize';

import { DarkModeProps } from '@leafygreen-ui/lib';
import { PopoverRenderModeProps } from '@leafygreen-ui/popover';

import { SharedInputBarProps } from '../shared.types';

export type InputBarProps = React.ComponentPropsWithoutRef<'form'> &
  DarkModeProps &
  SharedInputBarProps & {
    /**
     * Determines whether the user can interact with the InputBar
     * @default false
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
     * Props passed to the Popover that renders the suggested prompts.
     */
    dropdownProps?: Omit<
      PopoverRenderModeProps,
      | 'dismissMode'
      | 'onToggle'
      | 'portalClassName'
      | 'portalContainer'
      | 'portalRef'
      | 'renderMode'
      | 'scrollContainer'
    >;

    /**
     * Callback fired when the stop button is clicked during a loading state.
     * When triggered, the message input will be restored to the previous message body.
     */
    onClickStopButton?: () => void;

    /**
     * Callback fired when the user sends a message.
     */
    onMessageSend?: (
      messageBody: string,
      e?: FormEvent<HTMLFormElement>,
    ) => void;

    /**
     * Props passed to the TextareaAutosize component.
     * https://www.npmjs.com/package/react-autosize-textarea
     */
    textareaProps?: TextareaAutosizeProps;

    /**
     * Ref object to access the textarea element directly
     */
    textareaRef?: RefObject<HTMLTextAreaElement>;
  };

export type { TextareaAutosizeProps };
