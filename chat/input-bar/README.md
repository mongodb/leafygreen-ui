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

### Compact

```tsx
import { InputBar } from '@lg-chat/input-bar';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';

return (
  <LeafyGreenChatProvider variant={Variant.Compact}>
    <InputBar />
  </LeafyGreenChatProvider>
);
```

### Spacious

```tsx
import { InputBar } from '@lg-chat/input-bar';
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';

return (
  <LeafyGreenChatProvider variant={Variant.Spacious}>
    <InputBar />
  </LeafyGreenChatProvider>
);
```

## Properties

| Prop                          | Type                                           | Description                                                 | Default |
| ----------------------------- | ---------------------------------------------- | ----------------------------------------------------------- | ------- |
| `badgeText`                   | `string`                                       | Determines the text inside the rendered Badge               |         |
| `darkMode`                    | `boolean`                                      | Determines if the component will render in dark mode        | `false` |
| `disabled`                    | `boolean`                                      | Determines whether the user can interact with the InputBar  | `false` |
| `disableSend`                 | `boolean`                                      | When defined as `true`, disables the send action and button |         |
| `loadingMessage`              | `ReactNode`                                       | Custom loading message to display when `state='loading'`    |     `MongoDB Assistant is thinking`    |
| `errorMessage`                | `ReactNode`                                    | Custom error message to display when `state='error'`        |         |
| `onMessageSend`               | `(messageBody: string, e?: FormEvent) => void` | Submit event handler.                                       |         |
| `shouldRenderGradient`        | `boolean`                                      | Toggles the gradient animation around the input             | `true`  |
| `shouldRenderHotkeyIndicator` | `boolean`                                      | Toggles the hotkey indicator on the right side of the input | `false` |
| `textareaProps`               | `TextareaAutosizeProps`                        | Props passed to the TextareaAutosize component.             |         |
| `textareaRef`                 | `RefObject<HTMLTextAreaElement>`               | Ref object to access the textarea element directly          |         |
| `state`                       | `'unset' \| 'error' \| 'loading'`              | The current state of the InputBar.                          |         |
| `...`                         | `HTMLElementProps<'form'>`                     | Props spread on the root element                            |         |

## TextareaAutosizeProps

| Prop      | Type     | Description                       | Default                                              |
| --------- | -------- | --------------------------------- | ---------------------------------------------------- |
| `maxRows` | `number` | maximum number of rows to display | 14 (`variant="compact"`) \| 8 (`variant="spacious"`) |
| `minRows` | `number` | minimum number of rows to display | 1                                                    |

[See react-textarea-autosize docs for more props](https://github.com/Andarist/react-textarea-autosize?tab=readme-ov-file#special-props)
