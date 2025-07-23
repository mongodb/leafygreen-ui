# Hooks

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/hooks.svg)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/hooks
```

### NPM

```shell
npm install @leafygreen-ui/hooks
```

## useEventListener

Hook to create and remove eventListeners

### Example

```js
import { useEventListener } from '@leafygreen-ui/hooks';

useEventListener('click', handleClick, { enabled });
```

### Properties

| Prop                    | Type                                       | Description                                                                                                                                                                    | Default           |
| ----------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `type`                  | `Global Event Handler`, `string`           | Type of event to listen for.                                                                                                                                                   |                   |
| `eventCallback`         | `function`                                 | Callback executed when event is triggered.                                                                                                                                     |                   |
| `optional`              | `object`                                   | Optional third argument passed to function with implementation specifications.                                                                                                 |                   |
| `optional.options`      | `AddEventListenerOptions` excluding `once` | Parameter to specify options passed to the eventListener. To enable the `once` option, see `optional.enabled`.                                                                 |                   |
| `optional.enabled`      | `boolean`, `'once'`                        | Determines whether the event handler is attached or not. Setting this to `"once"` will ensure the event handler will be detached after the initial time an event is triggered. | `true`            |
| `optional.dependencies` | `Array`                                    | Array to be passed to useEffect hook, such that the hook will only run if the array's values have changed.                                                                     | `[enabled, type]` |
| `optional.element`      | `Document`, `HTMLElement`                  | The DOM node to attach the event handler to. Defaults to `document`.                                                                                                           | `document`        |

## useEscapeKey

Hook that listens for `EscapeKey` press.

### Example

```js
import { useEscapeKey } from '@leafygreen-ui/hooks';

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
import { useMutationObserver } from '@leafygreen-ui/hooks';

const lastTimeContentElMutated = useMutationObserver(
  target,
  mutationOptions,
  () => Date.now(),
  adjustOnMutation,
);
```

### Properties

| Prop       | Type                   | Description                                                                                                                                        | Default |
| ---------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `target`   | `HTMLElement`, `null`  | `HTMLElement` to subscribe to changes to.                                                                                                          |         |
| `options`  | `MutationObserverInit` | Object with information about what DOM changes to subscribe to. [Docs here](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit) |         |
| `callback` | `function`             | Callback function to execute inside of MutationObserver instance.                                                                                  |         |
| `enabled`  | `boolean`              | Determines whether the event handler is attached or not.                                                                                           | `true`  |

## useViewportSize

Hook to subscribe to changes in viewport size

### Example

```js
const viewportSize = useViewportSize();
```

## usePoller

Hook to create a Poller that polls at a given interval.

If your `onPoll` handler returns a `Promise` it will wait for the Promise to resolve or reject before scheduling the next interval.

This hooks also makes use of the [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API). If the page is `hidden` then polling will stop. When a page becomes `visible` again then polling will resume.

### Example

```js
import { usePoller } from '@leafygreen-ui/hooks';

usePoller(onPoll, {
  interval: 30000,
  immediate: true,
  enabled: true,
});
```

### Properties

| Prop                 | Type       | Description                                                          | Default |
| -------------------- | ---------- | -------------------------------------------------------------------- | ------- |
| `onPoll`             | `function` | Callback executed when poll interval occurs.                         |         |
| `optional.interval`  | `number`   | What interval the onPoll should be called.                           | `30000` |
| `optional.immediate` | `boolean`  | If we immediately poll, if false we wait till first interval occurs. | `true`  |
| `optional.enabled`   | `boolean`  | Is polling enabled.                                                  | `true`  |

# usePrevious

Hook to retrieve a value from the previous render.

### Example

```js
import { usePrevious } from '@leafygreen-ui/hooks';

const Example = ({nextValue: number}) => {
  const value = usePrevious(nextValue);

  return <div>{value}</div>;
}

// First render
<Example nextValue={42} />  // will render an empty `div`

// Second render
<Example nextValue={2020} />  // will render "42"

// Third render
<Example nextValue={0} />  // will render "2020"
```

# useIsomorphicLayoutEffect

Drop-in replacement for `useLayoutEffect` that does not produce warnings during server-side rendering. If your project uses the `react-hooks/exhaustive-deps` ESLint rule, it's recommended to add `useIsomorphicLayoutEffect` to the `additionalHooks` of the rule. Example:

```js
  rules: {
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useIsomorphicLayoutEffect)'
      }
    ]
  }
```

# useIdAllocator

Generates an SSR-compatible unique id based on a prefix string and an optional idProp parameter.

### Example

```js
import { useIdAllocator } from '@leafygreen-ui/hooks';

useIdAllocator({ prefix: 'select-component', id: idProp });
```

## useForwardedRef

Returns a MutableRefObject from the forwarded ref.

### Example

```jsx
import { useForwardedRef } from '@leafygreen-ui/hooks';

const MyComponent = React.forwardRef((props, forwardedRef) => {
  const ref = useForwawrdedRef(forwardedRef, null);
});
```

### Properties

| Prop                 | Type                                        | Description              | Default |
| -------------------- | ------------------------------------------- | ------------------------ | ------- |
| `forwardedRefOrRefs` | `SettableRef`, `Array<SettableRef>`, `null` | The forwarded ref        |         |
| `initialValue`       | `T`                                         | Initial value of the ref |         |

## useDynamicRefs

useDynamicRefs is a hook that allows you to create multiple refs for dynamically created elements. Use the `prefix` property to create multiple sets of dynamic refs.

### Example

```jsx
import { useDynamicRefs } from '@leafygreen-ui/hooks';

const getRef = useDynamicRefs();
...
return ['a','b','c'].map(x => {
  const divRef = getRef(x)
  return <div ref={divRef}>{x}</div>
})

```

### Properties

| Prop     | Type     | Description                                         | Default |
| -------- | -------- | --------------------------------------------------- | ------- |
| `prefix` | `string` | Optional prefix to that genterates a ref name space |         |
