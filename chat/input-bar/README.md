# Input Bar

## Installation

### Yarn

```shell
yarn add @lg-chat/input-bar
```

### NPM

```shell
npm install @lg-chat/input-bar
```

## Example

```ts
import { InputBar } from '@lg-chat/input-bar';

return <InputBar badgeText="Beta" />;
```

**Output HTML**

```html
<form class="leafygreen-ui-xw0iqe">
  <div class="leafygreen-ui-1yu3c6o">
    <div class="leafygreen-ui-18jjswl">
      <svg
        width="16"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        class="leafygreen-ui-jc2z8v"
        role="img"
        aria-label="Wizard Icon"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.327 3.277c.188-.38-.236-.8-.618-.613l-2.513 1.223a.461.461 0 01-.523-.095L7.603 1.74c-.314-.313-.829-.062-.75.365l.517 2.808a.421.421 0 01-.228.46L4.63 6.596c-.383.186-.277.761.154.839l2.832.513a.477.477 0 01.382.379l.517 2.808c.079.427.659.532.846.153l1.234-2.492a.427.427 0 01.464-.225l2.832.512c.43.078.683-.432.368-.744l-2.07-2.052a.452.452 0 01-.095-.519l1.233-2.491zM7 10.5c.353-.35.312-.958-.091-1.359-.404-.4-1.017-.44-1.37-.09L1.84 12.713c-.353.35-.312.958.092 1.358.403.4 1.017.44 1.37.09L7 10.5z"
          fill="currentColor"
        ></path>
      </svg>
      <div class="leafygreen-ui-1qtf7xy">Beta</div>
    </div>
    <textarea
      placeholder="Type your message here"
      class="leafygreen-ui-1iwn37a"
      style="height: 20px !important;"
    ></textarea>
    <div class="leafygreen-ui-37kxwn">
      <button
        type="submit"
        class="lg-ui-button-0000 leafygreen-ui-118vxo3"
        aria-disabled="false"
      >
        <div class="leafygreen-ui-v038xi"></div>
        <div class="leafygreen-ui-v95oty">
          Enter<svg
            width="16"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            class="leafygreen-ui-15rby6h"
            role="presentation"
            aria-hidden="true"
            alt=""
          >
            <path
              d="M3 6.832h6.944L8.41 5.297a1 1 0 010-1.414l.24-.239a1 1 0 011.414 0l3.382 3.383c.01.008.018.017.027.026l.24.239a1 1 0 010 1.414l-3.652 3.651a1 1 0 01-1.414 0l-.239-.239a1 1 0 010-1.414L9.941 9.17H3a1 1 0 01-1-1v-.338a1 1 0 011-1z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
    </div>
  </div>
</form>
```

## Properties

| Prop                   | Type                                          | Description                                                    | Default |
| ---------------------- | --------------------------------------------- | -------------------------------------------------------------- | ------- |
| `badgeText`            | `string`                                      | If provided, renders a badge with text next to the wizard icon |         |
| `darkMode`             | `boolean`                                     | Determines if the component will render in dark mode           | `false` |
| `onMessageSend`        | `(messageBody: string, e: FormEvent) => void` | Callback fired when message is sent                            |         |
| `shouldRenderGradient` | `boolean`                                     | Determines if component renders with gradient box-shadow       | `true`  |
| `textAreaProps`        | `TextareaAutosizeProps`                       | `TextareaAutosize` props spread on textarea component          |         |
| `disabled`             | `boolean`                                     | Determines whether the user can interact with the InputBar     |         |
| `disableSend`          | `boolean`                                     | When defined as `true`, disables the send action and button    |         |
| `...`                  | `HTMLElementProps<'form'>`                    | Props spread on the root element                               |         |

## TextareaAutosizeProps

| Prop      | Type     | Description                       | Default |
| --------- | -------- | --------------------------------- | ------- |
| `maxRows` | `number` | maximum number of rows to display |         |
| `minRows` | `number` | minimum number of rows to display |         |
