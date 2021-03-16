# Ripple

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/ripple.svg)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/ripple
```

### NPM

```shell
npm install @leafygreen-ui/ripple
```

## Example

```js
import { registerRipple } from '@leafygreen-ui/ripple';

// JavaScript Example
const button = document.querySelector('#my-button');
const buttonOptions = {
  variant: 'danger',
  darkMode: false,
};

registerRipple(button, buttonOptions);

// React Example
function Button({ options }) {
  const ref = React.useRef(null);

  useEffect(() => {
    if (ref.current) {
      registerRipple(ref, options);
    }
  }, [ref, options]);
}
```

## Arguments

| Argument         | Type                                                                | Description                                                   | Default |
| ---------------- | ------------------------------------------------------------------- | ------------------------------------------------------------- | ------- |
| ref              | `HTMLElement`                                                       | HTMLElement that ripple effect should be applied to           |         |
| options          |                                                                     | Options that specify coloring and size of ripple              |         |
| options.variant  | `'primary'`, `'info'`, `'default'`, `'danger'`, `'secondaryDanger'` | Determines color of ripple effect                             |         |
| options.darkMode | `boolean`                                                           | Determines if the ripple effect will be rendered in dark mode | `false` |

_NOTE: In order for this to work as expected, the target element must have the property `overflow:hidden` set_
