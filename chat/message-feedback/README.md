# Message Feedback

![npm (scoped)](https://img.shields.io/npm/v/@lg-chat/message-feedback.svg)

## Installation

### PNPM

```shell
pnpm add @lg-chat/message-feedback
```

### Yarn

```shell
yarn add @lg-chat/message-feedback
```

### NPM

```shell
npm install @lg-chat/message-feedback
```

## Examples

```tsx
import { useState } from 'react';
import { FormState, InlineMessageFeedback } from '@lg-chat/message-feedback';

const Example = () => {
  const [state, setState] = useState<FormState>(FormState.Unset);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(FormState.Submitting);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setState(FormState.Submitted);
    } catch (error) {
      setState(FormState.Error);
    }
  };

  const handleClose = () => {
    setState(FormState.Unset);
  };

  return (
    <InlineMessageFeedback
      label="What did you think?"
      onSubmit={handleSubmit}
      onClose={handleClose}
      state={state}
      errorMessage="Failed to submit feedback. Please try again."
    />
  );
};
```

## Properties

### InlineMessageFeedback

| Prop                    | Type                                                                   | Description                                                                                                                                          | Default                                  |
| ----------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `label` _(required)_    | `string`                                                               | Label text for the feedback textarea                                                                                                                 |                                          |
| `onSubmit`              | `FormEventHandler<HTMLFormElement> \| (e: FormEvent) => Promise<void>` | Event handler called when the form is submitted. Can be async.                                                                                       |                                          |
| `onClose`               | `MouseEventHandler<HTMLButtonElement>`                                 | Event handler called when the close button is clicked. Close button will not be rendered when undefined.                                             |                                          |
| `state`                 | `'unset' \| 'error' \| 'submitting' \| 'submitted'`                    | Current state of the feedback component                                                                                                              | `'unset'`                                |
| `submitButtonText`      | `string`                                                               | Text displayed inside the submit button                                                                                                              | `'Submit'`                               |
| `submitButtonProps`     | `ButtonProps`                                                          | Override props for the submit button                                                                                                                 |                                          |
| `textareaProps`         | `TextAreaProps`                                                        | Props passed directly to the textarea                                                                                                                |                                          |
| `submittedMessage`      | `ReactNode`                                                            | Message rendered in submitted state                                                                                                                  | `'Submitted! Thanks for your feedback.'` |
| `errorMessage`          | `ReactNode`                                                            | Error message to display below the feedback form. Only shown when state is 'error'.                                                                  | `'Oops, please try again.'`              |
| `disabledSend`          | `boolean`                                                              | Whether the submit button should be disabled                                                                                                         | `false`                                  |
| `enableFadeAfterSubmit` | `boolean`                                                              | Whether to fade out the submitted message after submission. When true, the submitted message will fade out after 3000ms and be removed from the DOM. | `false`                                  |
| `darkMode`              | `boolean`                                                              | Determines if the component will render in dark mode                                                                                                 | `false`                                  |
| `...`                   | `HTMLElementProps<'div'>`                                              | Props spread on the root element                                                                                                                     |                                          |
