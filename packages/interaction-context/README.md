# Interaction Context

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/interaction-context.svg)

Interaction Context is a package made to provide, and make it easy to consume page-wide, interaction-related state within components, such as whether a user is navigating with a keyboard or mouse. This lets us make improvements to the user experience that would be cumbersome, or impossible to make without access to a global state.

By design, components should always gracefully degrade when the provider is not an ancestor. The hooks provided by this package reflect that philosophy in their implementation.

## InteractionContext

This is the context provider for interaction context, and should be added as high in the document tree as possible.

### Example

#### Input

```JS
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

It uses state from `InteractionContext` to determine if focus states should be shown, and provides a simple path to graceful degredation – if the context provider isn't an ancestor, `showFocus` will always be true.

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
