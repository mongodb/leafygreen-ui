import React, {
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react';

import { BaseButtonProps } from '@leafygreen-ui/button';
import { DarkModeProps } from '@leafygreen-ui/lib';
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
  Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'onSubmit'> & {
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
     */
    onClose?: MouseEventHandler<HTMLButtonElement>;

    /**
     * Whether the submit button should be disabled
     * @default false
     */
    disabledSend?: boolean;

    /**
     * Whether to fade out the submitted message after submission
     * @default false
     * @remarks When true, after submitting, the SubmittedState will fade out after 3000ms and be removed from the DOM
     */
    enableFadeAfterSubmit?: boolean;
  };
