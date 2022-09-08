# Callout

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/callout.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/callout/example/)

## Installation

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

**Output HTML**

```html
<div className="leafygreen-ui-15l3je2">
  <div>
    <div className="leafygreen-ui-1gyqpuu">
      <svg
        width="16"
        height="16"
        role="img"
        viewBox="0 0 16 16"
        className="leafygreen-ui-1n4dsve"
      >
        <title>Edit Icon</title>
        <path
          d="M11.352 6.648l-2-2L11 3l2 2-1.648 1.648zM6 12l-3 1 1-3 4.648-4.648 2 2L6 12z"
          fill="currentColor"
          fillRule="evenodd"
        ></path>
      </svg>
      <div>Note</div>
    </div>
    <div className="leafygreen-ui-1wkamxg">
      <div className="leafygreen-ui-oll38v">Title</div>
      <div className="leafygreen-ui-7kuxj3">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </div>
    </div>
  </div>
</div>
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
