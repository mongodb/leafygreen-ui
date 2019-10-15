# Hooks

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/hooks.svg)

## useElementNode

Hook to subscribe to changes in a ref

### Example

```js
const Example = () => {
  [refNode, setRefNode] = useElementNode();

  return <div ref={setRefNode}>I am a ref</div>;
};
```

## useEventListener

Hook to create and remove eventListeners

### Example

```js
useEventListener('click', handleClick, { enabled });
```

### Properties

#### type

**Type:** `Global Event Handler` | `string`

Type of event to listen for.

#### eventCallback

**Type:** `function`

Callback executed when event is triggered.

#### optional

**Type:** `{}`

Optional third argument passed to function with implementation specifications.

#### optional.options

**Type:** `AddEventListenerOptions`

Parameter to specify options passed to the eventListener

#### optional.enabled

**Type:** `boolean`

**Default:** `true`

Determines whether the event handler is attached or not.

#### optional.dependencies

**Type:** `Array`

**Default:** `[enabled, type]`

Array to be passed to useEffect hook, such that the hook will only run if the array's values have changed.

#### optional.element

**Type:** `Document | HTMLElement`

**Default:** `document`

The DOM node to attach the event handler to. Defaults to `document`.

## useEscapeKey

Hook that listens for `EscapeKey` press.

### Example

```js
useEscapeKey(handleEscapeCallback);
```

### Properties

#### callback

**Type:** `function`

Callback executed when `EscapeKey` is pressed.

#### optional

**Type:** `{}`

Optional argument passed to function with implementation specifications. See supported parameters for useEventHandler.

## useMutationObserver

### Example

```js
const lastTimeContentElMutated = useMutationObserver(
  target,
  mutationOptions,
  () => Date.now(),
  adjustOnMutation,
);
```

### Properties

#### target

**Type:** `HTMLElement | null`

`HTMLElement` to subscribe to changes to.

#### options

**Type:** `MutationObserverInit`

Object with information about what DOM changes to subscribe to. [Docs here](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit)

#### callback

**Type:** `function`

Callback function to execute inside of MutationObserver instance.

#### enabled

**Type:** `boolean`

**Default:** `true`

Determines whether the event handler is attached or not.

## useViewportSize

Hook to subscribe to changes in viewport size

### Example

```js
const viewportSize = useViewportSize();
```
