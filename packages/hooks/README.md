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

| Prop                    | Type                               | Description                                                                                                | Default           |
| ----------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------- |
| `type`                  | `Global Event Handler` or `string` | Type of event to listen for.                                                                               |                   |
| `eventCallback`         | `function`                         | Callback executed when event is triggered.                                                                 |                   |  | `optional` | `object` | Optional third argument passed to function with implementation specifications. |  |
| `optional.options`      | `AddEventListenerOptions`          | Parameter to specify options passed to the eventListener                                                   |                   |
| `optional.enabled`      | `boolean`                          | Determines whether the event handler is attached or not.                                                   | `true`            |
| `optional.dependencies` | `Array`                            | Array to be passed to useEffect hook, such that the hook will only run if the array's values have changed. | `[enabled, type]` |
| `optional.element`      | `Document` or `HTMLElement`        | The DOM node to attach the event handler to. Defaults to `document`.                                       | `document`        |

## useEscapeKey

Hook that listens for `EscapeKey` press.

### Example

```js
useEscapeKey(handleEscapeCallback);
```

### Properties

| Prop       | Type       | Description                                                                                                            | Default |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------- | ------- |
| `callback` | `function` | Callback executed when `EscapeKey` is pressed.                                                                         |         |
| `optional` | `object`   | Optional argument passed to function with implementation specifications. See supported parameters for useEventHandler. |         |

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

| Prop       | Type                    | Description                                                                                                                                        | Default |
| ---------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `target`   | `HTMLElement` or `null` | `HTMLElement` to subscribe to changes to.                                                                                                          |         |
| `options`  | `MutationObserverInit`  | Object with information about what DOM changes to subscribe to. [Docs here](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit) |         |
| `callback` | `function`              | Callback function to execute inside of MutationObserver instance.                                                                                  |         |
| `enabled`  | `boolean`               | Determines whether the event handler is attached or not.                                                                                           | `true`  |

## useViewportSize

Hook to subscribe to changes in viewport size

### Example

```js
const viewportSize = useViewportSize();
```
