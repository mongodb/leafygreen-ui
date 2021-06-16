# Copyable

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/copyable.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/copyable/example/)

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
  {'npm install @leafygreen-ui/copyable'}
</Copyable>
```

**Output HTML**

```html
<label class="leafygreen-ui-1x9zy2h" for="copyable-7">Label</label>
<p class="leafygreen-ui-1jtodpe">Description</p>
<div class="leafygreen-ui-1r7yzs7">
  <code class="leafygreen-ui-b24pl6" id="copyable-7"
    >npm install @leafygreen-ui/copyable</code
  ><span class="leafygreen-ui-10wc33h"
    ><button
      type="button"
      class="leafygreen-ui-crgt"
      aria-disabled="false"
      aria-describedby="tooltip-7"
    >
      <span class="leafygreen-ui-tdo6z2"
        ><svg
          class="leafygreen-ui-1akpp5z"
          height="20"
          width="20"
          viewBox="0 0 16 16"
          role="img"
          aria-labelledby="Copy-7"
        >
          <title id="Copy-7">Copy Icon</title>
          <desc>Created with Sketch.</desc>
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
    </button></span
  >
</div>
```

## Properties

| Prop                     | Type                   | Description                                                    | Default     |
| ------------------------ | ---------------------- | -------------------------------------------------------------- | ----------- |
| `label`                  | `string`               | Label text for the copyable contents.                          |             |
| `description`            | `string`               | Further text to describe the contents.                         | `undefined` |
| `className`              | `string`               | className applied to the container of the code element         |             |
| `children`               | `string`               | The text that will be copied.                                  |             |
| `darkMode`               | `boolean`              | Determines whether or not the component appears in dark mode.  | `false`     |
| `size`                   | `'default'`, `'large'` | Display size of the copyable text.                             | `'default'` |
| `copyable`               | `boolean`              | Whether or not a copy button should be shown.                  | `true`      |
| `shouldTooltipUsePortal` | `boolean`              | Whether or not the "Copied!" tooltip should use a React portal | `true`      |
