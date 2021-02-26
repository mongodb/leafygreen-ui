# Ripple

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/ripple.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/ripple--default)

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
function Button() {
  const ref = React.useRef(null);
  const options = { variant: 'danger' };

  useEffect(() => {
    if (ref.current) {
      registerRipple(ref, options);
    }
  }, [ref]);
}
```

## Arguments

| Argument | Type          | Description                                         | Default |
| -------- | ------------- | --------------------------------------------------- | ------- |
| ref      | `HTMLElement` | HTMLElement that ripple effect should be applied to |         |
| options  | {}            | Options that specify coloring and size of ripple    |         |
