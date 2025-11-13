# Input Bar

## Installation

### PNPM

```shell
pnpm add @g-chat/input-bar
```

### Yarn

```shell
yarn add @lg-chat/input-bar
```

### NPM

```shell
npm install @lg-chat/input-bar
```

## Example

```tsx
import { useState } from 'react';
import { InputBar, State } from '@lg-chat/input-bar';

const Example = () => {
  const [state, setState] = useState<State>(State.Unset);

  const handleMessageSend = (messageBody: string) => {
    console.log('Sending:', messageBody);
    setState(State.Loading);
    // Simulate API call
  };

  const handleClickStopButton = () => {
    console.log('Stopping request');
    setState(State.Unset);
    // Cancel your API request here
  };

  return (
    <InputBar
      onMessageSend={handleMessageSend}
      onClickStopButton={handleClickStopButton}
      state={state}
      errorMessage="Failed to send message. Please try again."
    />
  );
};
```

## Properties

| Prop                | Type                                           | Description                                                                                                | Default |
| ------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------- |
| `darkMode`          | `boolean`                                      | Determines if the component will render in dark mode                                                       | `false` |
| `disabled`          | `boolean`                                      | Determines whether the user can interact with the InputBar                                                 | `false` |
| `disableSend`       | `boolean`                                      | When defined as `true`, disables the send action and button                                                |         |
| `errorMessage`      | `ReactNode`                                    | Custom error message to display when `state='error'`                                                       |         |
| `onClickStopButton` | `() => void`                                   | Callback fired when the stop button is clicked during a loading state. Restores the previous message body. |         |
| `onMessageSend`     | `(messageBody: string, e?: FormEvent) => void` | Callback fired when the user sends a message.                                                              |         |
| `textareaProps`     | `TextareaAutosizeProps`                        | Props passed to the TextareaAutosize component.                                                            |         |
| `textareaRef`       | `RefObject<HTMLTextAreaElement>`               | Ref object to access the textarea element directly                                                         |         |
| `state`             | `'unset' \| 'error' \| 'loading'`              | The current state of the InputBar.                                                                         |         |
| `...`               | `HTMLElementProps<'form'>`                     | Props spread on the root element                                                                           |         |

## TextareaAutosizeProps

| Prop      | Type     | Description                       | Default |
| --------- | -------- | --------------------------------- | ------- |
| `maxRows` | `number` | maximum number of rows to display | 14      |
| `minRows` | `number` | minimum number of rows to display | 1       |

[See react-textarea-autosize docs for more props](https://github.com/Andarist/react-textarea-autosize?tab=readme-ov-file#special-props)
