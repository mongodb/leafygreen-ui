# Message Prompts

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/message-prompts.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/message-prompts/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/message-prompts
```

### NPM

```shell
npm install @leafygreen-ui/message-prompts
```

## MessagePrompt Properties

| Prop       | Type                                         | Description                                                                                                            | Default |
| ---------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------- |
| `selected` | `boolean`                                    | Specifies that the MessagePrompt is selected. When one message prompt is selected, the others are disabled by default. |         |
| `disabled` | `boolean`                                    | Specifies that the MessagePrompt is disabled.                                                                          |         |
| `onClick`  | `React.MouseEventHandler<HTMLButtonElement>` | Event handler called onClick.                                                                                          |         |
| `...`      | `HTMLElementProps<'button'>`                 | Props spread on button element                                                                                         |         |
