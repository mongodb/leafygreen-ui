# Lg Markdown

## Installation

### Yarn

```shell
yarn add @lg-chat/lg-markdown
```

### NPM

```shell
npm install @lg-chat/lg-markdown
```

## Example

**Output HTML**

## Properties

| Prop         | Type                 | Description                                                                               | Default |
| ------------ | -------------------- | ----------------------------------------------------------------------------------------- | ------- |
| `children`   | `string`             | Content rendered by the component                                                         |         |
| `components` | `object`             | Override what React component will render the associated markdown tag, (e.g. {a: Anchor}) |         |
| `darkMode`   | `boolean`            | Determines if the component should be rendered in dark mode                               | `false` |
| `...`        | `ReactMarkdownProps` | Other props from [react-markdown](https://github.com/remarkjs/react-markdown)             | `false` |
