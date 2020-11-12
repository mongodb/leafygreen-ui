# Interaction Ring

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/interaction-ring.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/interaction-ring--default)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/interaction-ring
```

### NPM

```shell
npm install @leafygreen-ui/interaction-ring
```

## Example

```js
import InteractionRing from '@leafygreen-ui/interaction-ring';

// When the child is the focused element
<InteractionRing>
  <button>Click me</button>
</InteractionRing>;

// When the focused element is not the child
const [inputElement, setInputElement] =
  (React.useState < HTMLElement) | (null > null);

<InteractionRing focusedElement={inputElement}>
  <div className="Div appearing as button">
    Click me
    <input className="Visually hidden input" ref={setInputElement} />
  </div>
</InteractionRing>;
```

## Properties

| Prop             | Type                                       | Description                                                                                                                                  | Default                                              |
| ---------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `darkMode`       | `boolean`                                  | Whether to display the component in dark mode.                                                                                               | `false`                                              |
| `className`      | `string`                                   | Adds a `className` to the container `children` and the interaction ring. See the following props for ways to customize the interaction ring. |
| `borderRadius`   | `string`                                   | Specify the border radius of the interaction ring. The string format is that which can be passed directly to a `border-radius` CSS property. | `'4px'`                                              |
| `color`          | `{ hovered?: boolean, focused?: boolean }` | Override the interaction ring color for the specified states.                                                                                |                                                      |
| `children`       | `React.ReactElement`                       | A single React child that the interaction ring should surround visually.                                                                     |
| `focusedElement` | `HTMLElement`                              | The element for which to watch focus events.                                                                                                 | The element rendered by the provided `children` prop |
| `disabled`       | `boolean`                                  | Whether to disable the interaction ring.                                                                                                     | `false`                                              |
| `forceState`     | `{ hovered?: boolean, focused?: boolean }` | Force the specified interaction ring states to be displayed.                                                                                 |
