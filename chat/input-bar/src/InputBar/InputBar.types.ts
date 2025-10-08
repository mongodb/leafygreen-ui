import React, { FormEvent, ReactElement, RefObject } from 'react';
import { TextareaAutosizeProps } from 'react-textarea-autosize';

import { DarkModeProps } from '@leafygreen-ui/lib';
import { PopoverRenderModeProps } from '@leafygreen-ui/popover';

import { SharedInputBarProps } from '../shared.types';

export type InputBarProps = React.ComponentPropsWithoutRef<'form'> &
  DarkModeProps &
  SharedInputBarProps & {
    /**
     * Determines the text inside the rendered Badge
     * @remarks This prop is only considered when the parent `LeafyGreenChatProvider` has `variant="spacious"`.
     */
    badgeText?: string;

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
     * Submit event handler.
     */
    onMessageSend?: (
      messageBody: string,
      e?: FormEvent<HTMLFormElement>,
    ) => void;

    /**
     * Toggles the gradient animation around the input
     * @default true
     * @remarks This prop is only considered when the parent `LeafyGreenChatProvider` has `variant="spacious"`.
     */
    shouldRenderGradient?: boolean;

    /**
     * Toggles the hotkey indicator on the right side of the input
     * @default false
     * @remarks This prop is only considered when the parent `LeafyGreenChatProvider` has `variant="spacious"`.
     */
    shouldRenderHotkeyIndicator?: boolean;

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
