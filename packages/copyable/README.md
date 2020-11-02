# Copyable

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/copyable.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/copyable--default)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/copyable
```

### NPM

```shell
npm install @leafygreen-ui/copyable
```

## Example

```js
<Copyable label="Label" description="Description">
  {children}
</Copyable>
```

**Output HTML**

```html
<div class="leafygreen-ui-ay85fu">Label</div>
<div class="leafygreen-ui-1yr9pf8">Description</div>
<div class="leafygreen-ui-z4hn35">
  <code class="leafygreen-ui-1q9khkv">npm install @leafygreen-ui/copyable</code>
  <div class="leafygreen-ui-16fe9tr">
    <button
      type="button"
      class="copy-btn leafygreen-ui-10r830k"
      aria-disabled="false"
      aria-describedby="tooltip-35"
    >
      <span class="leafygreen-ui-1cpk24m"
        ><svg
          class="leafygreen-ui-1akpp5z"
          height="20"
          width="20"
          viewBox="0 0 16 16"
          role="img"
          aria-labelledby="Copy-796277"
        >
          <title id="Copy-796277">Copy Icon</title>
          <g
            id="Copy-Copy"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <path
              d="M13,5 L10,5 L10,2 L7,2 L7,11 L13,11 L13,5 Z M15,5 L15,13 L5,13 L5,0 L10,0 L15,5 Z"
              fill="currentColor"
            ></path>
            <path
              d="M4,4 L4,5 L2,5 L2,15 L9,15 L9,14 L10,14 L10,16 L1,16 L1,4 L4,4 Z"
              fill="currentColor"
            ></path>
          </g></svg
        >Copy</span
      >
    </button>
  </div>
</div>
```

## Properties

| Prop          | Type                     | Description                                                   | Default     |
| ------------- | ------------------------ | ------------------------------------------------------------- | ----------- |
| `label`       | `string`                 | Label text for the copyable contents.                         |             |
| `description` | `string`                 | Further text to describe the contents.                        | `undefined` |
| `children`    | `string`                 | The text that will be copied.                                 |             |
| `darkMode`    | `boolean`                | Determines whether or not the component appears in dark mode. | `false`     |
| `size`        | `'default'` \| `'large'` | Display size of the copyable text.                            | `'default'` |
| `copyable`    | `boolean`                | Whether or not a copy button should be shown.                 | `true`      |
