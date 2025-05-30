# Rounded Button

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/rounded-button.svg)
#### [View on MongoDB.design](https://www.mongodb.design/component/rounded-button/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/rounded-button
```

### Yarn

```shell
yarn add @leafygreen-ui/rounded-button
```

### NPM

```shell
npm install @leafygreen-ui/rounded-button
```

## Example

```jsx
<RoundedButton>Click me</RoundedButton>
```

**Output HTML**

```html
<button class="leafygreen-ui-[hash]">Click me</button>
```

## Properties

| Prop        | Type                                      | Description                                             | Default |
| ----------- | ----------------------------------------- | ------------------------------------------------------- | ------- |
| `children`  | `ReactNode`                               | The content that will appear inside of the button.      | `null`  |
| `className` | `string`                                  | Adds a className to the class attribute.                | `''`    |
| `disabled`  | `boolean`                                 | Disables the button                                     | `false` |
| ...         | native button attributes                  | Any other properties will be spread on the root element |         |

_Note: This component extends ButtonHTMLAttributes, so any property available on a standard HTML button element can be used, such as `onClick`, `type`, etc._

