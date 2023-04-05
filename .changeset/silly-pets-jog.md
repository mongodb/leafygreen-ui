---
'@leafygreen-ui/hooks': minor
---

Creates `useStateRef` - a combination of useState and useRef, that returns the current state, a `setState` function, and a `getState` function that will return the current walue of the state. This is useful to avoid referencing stale state inside callbacks
