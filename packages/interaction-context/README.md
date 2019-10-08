# Interaction Context

## InteractionContext

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/interaction-context.svg)

### Example

#### Input

```Javascript
import InteractionContext from '@leafygreen-ui/interaction-context';

<InteractionContext>
  <div>My Children</div>
</InteractionContext>
```

#### Output

```HTML
  <div>My Children</div>
```

### Properties

#### initialStates

**Type:** `{ usingKeyboard?: boolean }`

You can provide initial states to initialize `InteractionContext` with.

#### children

**Type:** `node`

Children passed to `InteractionContext` will be unmodified, aside from having access to its state.

---

## useShowFocus

This hook provides a simple way in functional components to determine whether a focus state should be shown.

It uses the state from `InteractionContext` to determine if focus states should be shown, and provides a simple path to graceful degredation – if the context provider isn't an ancestor, `showFocus` will always be true.

### Example

```js
import { useShowFocus } from '@leafygreen-ui/interaction-context';

const showFocus = useShowFocus();
const focusStyle = showFocus
  ? css`
      &:focus {
        outline: blue auto 5px; // Your focus state
      }
    `
  : '';

<button className={focusStyle}></button>;
```
