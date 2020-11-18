# Text Area

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/text-area.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/text-area--default)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/text-area
```

### NPM

```shell
npm install @leafygreen-ui/text-area
```

## Example

**Output HTML**

## Properties

| Prop          | Type                               | Description                                                       | Default  |
| ------------- | ---------------------------------- | ----------------------------------------------------------------- | -------- |
| `id`          | `string`                           | id to describe the `<textarea>` element                           |          |
| `darkMode`    | `boolean`                          | Determines whether or not the component will appear in dark mode. | `false`  |
| `optional`    | `boolean`                          | Determines whether or not the `<textarea>` is optional            | `true`   |
| `label`       | `string`                           | Label for `<textarea>`                                            |          |
| `description` | `string`                           | Description below label                                           |          |
| `state`       | `'none'` \| `'valid'` \| `'error'` | Determines the state of the `<textarea>`                          | `'none'` |
| `className`   | `string`                           | className applied to the `<textarea>` element                     |          |
| `disabled`    | `boolean`                          | Determines if the component is disabled                           | `false`  |
| ...           | native `textarea` attributes       | Any other props will be spread on the root `textarea` element     |          |
