# Message Prompts

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/message-prompts.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/message-prompts/live-example/)

## Installation

### PNPM

```shell
pnpm add @lg-chat/message-prompts
```

### Yarn

```shell
yarn add @lg-chat/message-prompts
```

### NPM

```shell
npm install @lg-chat/message-prompts
```

## Example

```tsx
function MyComponent() {
  const [prompts, setPrompts] = useState([
    'What is MongoDB?',
    'How do I create a database?',
  ]);

  const handleClickRefresh = () => {
    // Fetch new prompts
    setPrompts(getNewPrompts());
  };

  return (
    <MessagePrompts
      label="Suggested Prompts"
      onClickRefresh={handleClickRefresh}
      enableHideOnSelect
    >
      {prompts.map(prompt => (
        <MessagePrompt key={prompt} onClick={() => console.log(prompt)}>
          {prompt}
        </MessagePrompt>
      ))}
    </MessagePrompts>
  );
}
```

## MessagePrompts Properties

| Prop                              | Type                                         | Description                                                                                                                                                                        | Default |
| --------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `enableHideOnSelect` _(optional)_ | `boolean`                                    | When true, the prompts container will transition (fade and shrink) when a prompt is selected.                                                                                      | `true`  |
| `label` _(optional)_              | `string`                                     | Optional label displayed above the message prompts.                                                                                                                                |         |
| `onClickRefresh` _(optional)_     | `React.MouseEventHandler<HTMLButtonElement>` | Event handler called when the refresh button is clicked. When provided, a refresh IconButton will be rendered next to the label. The button is disabled when a prompt is selected. |         |
| `...`                             | `HTMLElementProps<'div'>`                    | Props spread on root div element                                                                                                                                                   |         |

## MessagePrompt Properties

| Prop                    | Type                                         | Description                                                                                                            | Default |
| ----------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------- |
| `disabled` _(optional)_ | `boolean`                                    | Specifies that the MessagePrompt is disabled.                                                                          |         |
| `onClick` _(optional)_  | `React.MouseEventHandler<HTMLButtonElement>` | Event handler called onClick.                                                                                          |         |
| `selected` _(optional)_ | `boolean`                                    | Specifies that the MessagePrompt is selected. When one message prompt is selected, the others are disabled by default. |         |
| `...`                   | `HTMLElementProps<'button'>`                 | Props spread on button element                                                                                         |         |
