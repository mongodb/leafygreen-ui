# Chat Button

![npm (scoped)](https://img.shields.io/npm/v/@lg-chat/chat-button.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/chat-button/live-example/)

## Installation

### PNPM

```shell
pnpm add @lg-chat/chat-button
```

### Yarn

```shell
yarn add @lg-chat/chat-button
```

### NPM

```shell
npm install @lg-chat/chat-button
```

## Example

```tsx
import { ChatButton, Variant } from '@lg-chat/chat-button';

<ChatButton variant={Variant.Default}>
  MongoDB Assistant
</ChatButton>

<ChatButton variant={Variant.Primary}>
  MongoDB Assistant
</ChatButton>

<ChatButton variant={Variant.BaseGreen}>
  MongoDB Assistant
</ChatButton>
```

## Properties

| Prop                            | Type                                                   | Description                                                                                                                         | Default     |
| ------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `baseFontSize` _(optional)_     | `14`, `16`                                             | Determines the base font-size of the component.                                                                                     | `14`        |
| `children` _(optional)_         | `React.ReactNode`                                      | The content that will appear inside of the `<ChatButton />` component.                                                              |             |
| `className` _(optional)_        | `string`                                               | Adds a className to the class attribute.                                                                                            |             |
| `darkMode` _(optional)_         | `boolean`                                              | Determines if the component renders in dark mode. Can also be set via LeafyGreenProvider.                                           | `false`     |
| `disabled` _(optional)_         | `boolean`                                              | Disables the button. When disabled, the shimmer animation is not shown on the Default variant.                                      | `false`     |
| `isLoading` _(optional)_        | `boolean`                                              | Indicates whether the Button is in a loading state.                                                                                 | `false`     |
| `loadingIndicator` _(optional)_ | `React.ReactElement`                                   | Visual indicator displayed to convey that component is loading.                                                                     |             |
| `loadingText` _(optional)_      | `string`                                               | String displayed in place of `children` while the button is in a loading state.                                                     |             |
| `onClick` _(optional)_          | `(event: React.MouseEvent<HTMLButtonElement>) => void` | Callback fired when the button is clicked.                                                                                          |             |
| `size` _(optional)_             | `'xsmall'`, `'small'`, `'default'`, `'large'`          | Sets the size variant of the button.                                                                                                | `'default'` |
| `variant` _(optional)_          | `'default'`, `'primary'`, `'baseGreen'`                | Sets the variant for the ChatButton. Default variant shows AssistantAvatar with shimmer animation. Other variants show SparkleIcon. | `'default'` |
| ... _(optional)_                | native button attributes                               | Any other properties will be spread on the root button element.                                                                     |             |
