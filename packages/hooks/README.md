# Hooks

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/hooks.svg)

## useElementNode

Hook to subscribe to changes in a ref element

### Example

```js
const Example = () => {
  [refNode, setRefNode] = useElementNode();

  return <div ref={setRefNode}>I am a ref</div>;
};
```

## useEventListener

Hook to subscribe to an eventListener

### Example

```js
useEventListener('click', handleClick, { enabled });
```

### Properties

#### type

**Type:** `Global Event Handler`

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

Determines whether or not the useEffect hook should run.

#### optional.dependencies

**Type:** `Array`

**Default:** `[enabled, type]`

Array to be passed to useEffect hook, such that the hook will only run if the array's values have changed.

#### optional.element

**Type:** `Document | HTMLElement`

**Default:** `document`

Value to be passed as target of event handler, will default to document.

## useHandleEscape

Hook that listens for `EscapeKey` press.

### Example

```js
useHandleEscape(handleEscapeCallback);
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
  contentNode,
  mutationOptions,
  () => Date.now(),
  adjustOnMutation,
);
```

### Properties

#### target

**Type:** `HTMLElement | null`

HTML element that is subscribed to DOM changes.

#### options

**Type:** `MutationObserverInit`

Object with information about what DOM changes to subscribe to.

#### callback

**Type:** `function`

Callback function to execute inside of MutationObserver instance.

#### enabled

**Type:** `boolean`

**Default:** `true`

Determines whether or not the hook should run, defaults to true.

## useViewportSize

Hook to subscribe to changes in viewport size

### Example

```js
const viewportSize = useViewportSize();
```
