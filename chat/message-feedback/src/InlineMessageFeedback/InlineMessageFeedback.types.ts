import { FormEventHandler, MouseEventHandler } from 'react';

import { ButtonProps } from '@leafygreen-ui/button';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { TextAreaProps } from '@leafygreen-ui/text-area';

export type InlineMessageFeedbackProps = Required<
  Pick<TextAreaProps, 'label'>
> &
  DarkModeProps & {
    /**
     * Text displayed inside the cancel Button
     *
     * @default: 'Cancel'
     */
    cancelButtonText?: string;

    /**
     * Click event handler for the cancel Button
     */
    onCancel: MouseEventHandler<HTMLElement>;

    /**
     * Override props for the cancel Button
     */
    cancelButtonProps?: ButtonProps;

    /**
     * Text displayed inside the submit Button
     *
     * @default: 'Submit'
     */
    submitButtonText?: string;

    /**
     * Override props for the submit Button
     */
    submitButtonProps?: ButtonProps;

    /**
     * Event handler called when the form is submitted
     */
    onSubmit?: FormEventHandler<HTMLFormElement>;

    /**
     * Props passed directly to the textarea
     */
    textareaProps?: Omit<TextAreaProps, 'label'>;

    /**
     * Indicates if the component should render in its submitted state
     * @default false
     */
    isSubmitted?: boolean;

    /**
     * Message rendered in submitted state
     *
     * @default 'Submitted! Thanks for your feedback.'
     */
    submittedMessage?: string;

    /**
     * Event handler called on close button click. Close button will not be rendered when undefined.
     *
     * This is mainly for internal use as most instances of InlineMessageFeedback should be closed solely by onCancel.
     */
    onClose?: MouseEventHandler<HTMLButtonElement>;
  };
