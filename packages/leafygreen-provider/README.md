# LeafyGreen Provider

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/leafygreen-provider.svg)

LeafyGreen Provider is a package made to provide, and make it easy to consume page-wide, interaction-related state within components, such as whether a user is navigating with a keyboard or mouse. This lets us make improvements to the user experience that would be cumbersome, or impossible to make without access to a global state.

Components should always gracefully degrade when the provider is not an ancestor. Please implement these APIs with that in mind.

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/leafygreen-provider
```

### NPM

```shell
npm install @leafygreen-ui/leafygreen-provider
```

## LeafyGreenProvider

This is the context provider for LeafyGreen Provider, and should be added as high in the document tree as possible.

### Example

#### Input

```js
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

<LeafyGreenProvider>
  <div>My Children</div>
</LeafyGreenProvider>;
```

#### Output

```html
<div>My Children</div>
```

### Properties

| Prop           | Type       | Description                                                                                                                                                                               | Default |
| -------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `children`     | `node`     | Children passed to `LeafyGreenProvider` will be unmodified, aside from having access to its state.                                                                                        |         |
| `baseFontSize` | `14`, `16` | Describes the `font-size` that the application is using. `<Body/>` and `<InlineCode />` components use this value to determine the `font-size` and `line-height` applied to their content | `14`    |
| `darkMode`     | `boolean`  | Determines if LG components should be rendered in dark mode.                                                                                                                              |         |

## useUsingKeyboardContext

**Returns:**

```js
{
  usingKeyboard: boolean | undefined,
  setUsingKeyboard: boolean => void,
}
```

This hook allows you to directly read, and set the state of whether a user is interacting with the keyboard. The primary use-case for this is to set `usingKeyboard` to `true` when manually setting focus on an element.

### Example

```js
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';

const { usingKeyboard, setUsingKeyboard } = useUsingKeyboardContext();
const inputRef = useRef(null);

function autoFocus() {
  inputRef.current?.focus();

  if (!usingKeyboard) {
    setUsingKeyboard(true);
  }
}

<input type={text} ref={inputRef} />;
```

## useBaseFontSize

**Returns:**

```js
`number`;
```

This hook allows you to read the base `font-size` of an application, based on the number returned from the hook.

### Example

```js
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';

function InlineCode({ children, className }: InlineCodeProps) {
  const size = useBaseFontSize();
  const body = size === 16 ? typeScale2 : typeScale1;

  return (
    <code className={cx(sharedStyles, code, body, className)}>{children}</code>
  );
}
```

## useDarkMode

This hook is meant for internal use. It allows components to read the value of the dark mode prop from the LeafyGreen provider and overwrite the value locally if necessary.

```js
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

function Example({ children, darkMode: darkModeProp, variant }) {
  const { darkMode, theme, setDarkMode } = useDarkMode(darkModeProp);
  return <div className={badgeVariants[theme][variant]}>{children}</div>;
}
```
