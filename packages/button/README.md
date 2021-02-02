# Button

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/button.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/buttons--default)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/button
```

### NPM

```shell
npm install @leafygreen-ui/button
```

## Peer Dependencies

| Package                              | Version  |
| ------------------------------------ | -------- |
| `@leafygreen-ui/leafygreen-provider` | `^1.1.0` |

## Example

```js
import Button from '@leafygreen-ui/button';

<Button
  variant="primary"
  className="create-item-button"
  title="Create an item"
  onClick={event => {
    /* Something to handle the click event */
  }}
>
  Submit
</Button>;
```

**Output HTML**

```html
<button
  class="css-1rgbgdt create-item-button"
  title="Create an item"
  disabled="false"
>
  Submit
</button>
```

## Properties

| Prop           | Type                                                     | Description                                                                                                                                           | Default     |
| -------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `variant`      | `'default'`, `'primary'`, `'info'`, `'danger'`, `'dark'` | Sets the style variant of the button.                                                                                                                 | `'default'` |
| `darkMode`     | `boolean`                                                | Determines if the component renders in dark mode                                                                                                      | `false`     |
| `size`         | `'xsmall'`, `'small'`, `'normal'`, `'large'`             | Sets the size variant of the button.                                                                                                                  | `'normal'`  |
| `children`     | `node`                                                   | The content that will appear inside of the `<Button />` component.                                                                                    | `null`      |
| `onClick`      | `function`                                               | The event handler function for the 'onclick' event. Receives the associated `event` object as the first argument.                                     |             |
| `borderRadius` | `string`                                                 | Specify the border radius of the button. The string format is that which can be passed directly to a `border-radius` CSS property.                    | `'3px'`     |
| `className`    | `string`                                                 | Adds a className to the class attribute.                                                                                                              | `''`        |
| `value`        | `string`                                                 | Sets the HTML `value` attribute.                                                                                                                      |             |
| `disabled`     | `boolean`                                                | Disabled the button                                                                                                                                   | `false`     |
| `as`           | `React.ElementType`                                      | Determines the root element. For example, `Link` or `a` tags can be supplied to replace `button` from being the DOM element that wraps the component. | `button`    |
| `href`         | `string`                                                 | If a href is supplied it will change the `as` value, such that the component renders inside of an `a` tag instead of inside of a `button` tag.        |             |
| `glyph`        | `React.ReactElement`                                     | When supplied a rendered Icon, renders a button with the specified glyph on the left-side of the content, and adjusts Button padding accordingly.     |             |
| `forceState`   | `{ focused?: boolean, active?: boolean }`                | Force the component to display the specified interaction states.                                                                                      |             |
| ...            | native attributes of component passed to as prop         | Any other properties will be spread on the root element                                                                                               |             |

_Note: In order to make this Component act as a submit button, the recommended approach is to pass `submit` as the `type` prop. Note it is also valid to pass `input` to the `as` prop, and the button's content's to the `value` prop -- in this case, do not supply children to the component._
