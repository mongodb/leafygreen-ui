import {
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react';

import { BaseButtonProps } from '@leafygreen-ui/button';
import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { TextAreaProps } from '@leafygreen-ui/text-area';

/**
 * Possible states for the feedback form.
 */
export const FormState = {
  Unset: 'unset',
  Submitting: 'submitting',
  Error: 'error',
  Submitted: 'submitted',
} as const;

/**
 * Type representing the possible states of the feedback form.
 */
export type FormState = (typeof FormState)[keyof typeof FormState];

export type InlineMessageFeedbackProps = Required<
  Pick<TextAreaProps, 'label'>
> &
  DarkModeProps &
  Omit<HTMLElementProps<'div'>, 'children' | 'onSubmit'> & {
    /**
     * Text displayed inside the cancel Button
     *
     * @default: 'Cancel'
     * @remarks This prop is only considered when the parent `LeafyGreenChatProvider` has `variant="spacious"`.
     */
    cancelButtonText?: string;

    /**
     * Click event handler for the cancel Button
     * @remarks This prop is only considered when the parent `LeafyGreenChatProvider` has `variant="spacious"`.
     */
    onCancel?: MouseEventHandler<HTMLElement>;

    /**
     * Override props for the cancel Button
     * @remarks This prop is only considered when the parent `LeafyGreenChatProvider` has `variant="spacious"`.
     */
    cancelButtonProps?: BaseButtonProps;

    /**
     * Text displayed inside the submit Button
     *
     * @default: 'Submit'
     */
    submitButtonText?: string;

    /**
     * Override props for the submit Button
     */
    submitButtonProps?: BaseButtonProps;

    /**
     * Event handler called when the form is submitted
     */
    onSubmit?:
      | FormEventHandler<HTMLFormElement>
      | ((e: FormEvent<HTMLFormElement>) => Promise<void>);

    /**
     * Props passed directly to the textarea
     */
    textareaProps?: Omit<TextAreaProps, 'label'>;

    /**
     * Current state of the feedback component
     * @default 'unset'
     */
    state?: FormState;

    /**
     * Message rendered after the feedback form is submitted
     *
     * @default 'Submitted! Thanks for your feedback.'
     * @remarks Only shown when state is 'submitted'
     */
    submittedMessage?: ReactNode;

    /**
     * Error message to display below the feedback form
     *
     * @default 'Oops, please try again.'
     * @remarks Only shown when state is 'error'
     */
    errorMessage?: ReactNode;

    /**
     * Event handler called on close button click. Close button will not be rendered when undefined.
     *
     * This is mainly for internal use as most instances of InlineMessageFeedback should be closed solely by onCancel.
     */
    onClose?: MouseEventHandler<HTMLButtonElement>;
  };
