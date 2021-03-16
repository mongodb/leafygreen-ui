# Toggle

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/toggle.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/toggle/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/toggle
```

### NPM

```shell
npm install @leafygreen-ui/toggle
```

## Example

```js
import Toggle from '@leafygreen-ui/toggle';

return (
  <>
    <label id="label" htmlFor="toggle">
      Change setting
    </label>

    <Toggle
      id="toggle"
      aria-labelledby="label"
      onChange={(checked, event) => {
        /* Handle the change event */
      }}
    />
  </>
);
```

**Output HTML**

```html
<label for="toggle" id="label" class="leafygreen-ui-r8mbam"
  >Change setting</label
>

<div class="leafygreen-ui-19odf8z">
  <button
    id="toggle"
    aria-labelledby="label"
    role="switch"
    aria-checked="false"
    aria-disabled="false"
    class="leafygreen-ui-1vdkpyx"
    data-leafygreen-ui="toggle-button"
  >
    <span aria-hidden="true" class="leafygreen-ui-u8d1r2">On</span>
    <span aria-hidden="true" class="leafygreen-ui-1eonihm">Off</span>
    <div class="leafygreen-ui-uyx43a"></div>
  </button>

  <div data-leafygreen-ui="interaction-ring" class="leafygreen-ui-igvj0l"></div>
</div>
```

## Properties

| Prop        | Type                               | Description                                                                                                                                                                                        | Default     |
| ----------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `darkMode`  | `boolean`                          | Determines if the Toggle will render the dark mode styles.                                                                                                                                         | `false`     |
| `size`      | `'default'`, `'small'`, `'xsmall'` | Sets the size of the toggle.                                                                                                                                                                       | `'default'` |
| `checked`   | `boolean`                          | Set's the checked state of the Toggle.                                                                                                                                                             |             |
| `disabled`  | `boolean`                          | Disables the Toggle.                                                                                                                                                                               | `false`     |
| `onChange`  | `(checked, MouseEvent) => void`    | `onChange` fires when the `checked` state of the component is being updated. Receives the updated checked state of the toggle as its first argument, and the associated mouse event as the second. |             |
| `className` | `string`                           | Adds a className to the outermost element.                                                                                                                                                         | `''`        |
| ...         | HTML `button` attributes           | Any supported HTML button properties will be applied to the `button` element.                                                                                                                      |             |

## Accessibility

For the Toggle to be accessible to screen readers, you **must** pass either [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) or [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute) to Toggle. Please note, if this is a part of a form, this is in addition to using `htmlFor` to associate a label with the Toggle. You will see TypeScript and console errors if this isn't done.

Please reach out if you would like further guidance on how to programmatically associate text with the Toggle component.
