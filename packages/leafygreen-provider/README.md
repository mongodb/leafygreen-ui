# LeafyGreen Provider

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/leafygreen-provider.svg)

LeafyGreen Provider is a package made to provide, and make it easy to consume page-wide, interaction-related state within components, such as whether a user is navigating with a keyboard or mouse. This lets us make improvements to the user experience that would be cumbersome, or impossible to make without access to a global state.

Components should always gracefully degrade when the provider is not an ancestor. Please implement these APIs with that in mind.

## Installation

`yarn install @leafygreen-ui/leafygreen-provider`

## LeafyGreenProvider

This is the context provider for LeafyGreen Provider, and should be added as high in the document tree as possible.

### Example

#### Input

```JS
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

<LeafyGreenProvider>
  <div>My Children</div>
</LeafyGreenProvider>
```

#### Output

```HTML
<div>My Children</div>
```

### Properties

| Prop       | Type   | Description                                                                                        |
| ---------- | ------ | -------------------------------------------------------------------------------------------------- |
| `children` | `node` | Children passed to `LeafyGreenProvider` will be unmodified, aside from having access to its state. |

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
