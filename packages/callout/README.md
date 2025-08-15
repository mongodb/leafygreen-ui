# Callout

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/callout.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/callout/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/callout
```

### Yarn

```shell
yarn add @leafygreen-ui/callout
```

### NPM

```shell
npm install @leafygreen-ui/callout
```

## Example

```js
<Callout variant={Variant.Note} title="Title">
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type
  specimen book.
</Callout>
```

## Properties

| Prop           | Type                                                       | Description                                               | Default |
| -------------- | ---------------------------------------------------------- | --------------------------------------------------------- | ------- |
| `variant`      | `'note'`, `'tip'`, `'important'`, `'warning'`, `'example'` | Sets the variant for the Callout                          |         |
| `children`     | `node`                                                     | The contents to display within the Callout                |         |
| `title`        | `string`                                                   | Optional title text to display above Callout text         |         |
| `className`    | `string`                                                   | Adds a className to the outermost element                 |         |
| `baseFontSize` | `13`, `16`                                                 | Determines `font-size` for body copy in Callout component | `13`    |
| `darkMode`     | `boolean`                                                  | Determines if the component renders in dark theme         | `false` |
