# Info Sprinkle

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/info-sprinkle.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/info-sprinkle/live-example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/info-sprinkle
```

### NPM

```shell
npm install @leafygreen-ui/info-sprinkle
```

## Example

```js
import { InfoSprinkle } from `@leafygreen-ui/info-sprinkle`;

<InfoSprinkle
  triggerProps={{
    onMouseDown: () => {},
    onMouseOver: () => {},
    'aria-label': 'aria-label',
  }}>
  I'm an info sprinkle
</InfoSprinkle>
```

## Properties

| Prop           | Type                                     | Description                                                                                                                                                                                                                                                                         | Default                                     |
| -------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `children`     | `React.ReactNode`                        | String that will be rendered inside of `<InfoSprinkle />`                                                                                                                                                                                                                           |                                             |
| `open`         | `boolean`                                | Controls the component, and determines whether or not the `<InfoSprinkle />` will appear open or closed.                                                                                                                                                                            | `false`                                     |
| `setOpen`      | `function`                               | If controlling the component, pass state handling function to setOpen prop. This will keep the consuming application's state in-sync with LeafyGreen's state, while the `<InfoSprinkle />` component responds to events such as backdrop clicks and a user pressing the Escape key. | `(boolean) => boolean`                      |
| `shouldClose`  | `function`                               | Callback that should return a boolean that determines whether or not the `<InfoSprinkle />` should close when a user tries to close it.                                                                                                                                             | `() => true`                                |
| `align`        | `'top'`, `'bottom'`, `'left'`, `'right'` | Determines the preferred alignment of the `<InfoSprinkle />` component relative to the element passed to the `trigger` prop.                                                                                                                                                        | `'top'`                                     |
| `justify`      | `'start'`, `'middle'`, `'end'`           | Determines the preferred justification of the `<InfoSprinkle />` component (based on the alignment) relative to the element passed to the `trigger` prop.                                                                                                                           | `'start'`                                   |
| `darkMode`     | `boolean`                                | Determines if the `<InfoSprinkle />` will appear in dark mode.                                                                                                                                                                                                                      | `false`                                     |
| `id`           | `string`                                 | `id` applied to `<InfoSprinkle />` component                                                                                                                                                                                                                                        |                                             |
| `className`    | `string`                                 | Applies a className to Tooltip container                                                                                                                                                                                                                                            |                                             |
| `triggerProps` | native `span` attributes                 | Props passed to the trigger                                                                                                                                                                                                                                                         | `{}`                                        |
| `enabled`      | `boolean`                                | Enables Tooltip to trigger.                                                                                                                                                                                                                                                         | `true`                                      |
| `onClose`      | `function`                               | Callback that is called when the tooltip is closed internally. E.g. on ESC press, on backdrop click, on blur..                                                                                                                                                                      | `() => {}`                                  |
| `baseFontSize` | `13` \| `16`                             | font-size applied to typography element                                                                                                                                                                                                                                             | default to value set by LeafyGreen Provider |
| ...            | native `div` attributes                  | Any other props will be spread on the tooltip element                                                                                                                                                                                                                               |                                             |

**Note:** The `ref` of this component will be the trigger icon but all props will spread to the internal `<Tooltip/>` component.
