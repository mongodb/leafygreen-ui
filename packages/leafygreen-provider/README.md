# LeafyGreen Provider

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/leafygreen-provider.svg)

LeafyGreen Provider is a package made to provide, and make it easy to consume page-wide, interaction-related state within components, such as whether a user is navigating with a keyboard or mouse. This lets us make improvements to the user experience that would be cumbersome, or impossible to make without access to a global state.

Components should always gracefully degrade when the provider is not an ancestor. Please implement these APIs with that in mind.

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/leafygreen-provider
```

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

| Prop               | Type       | Description                                                                                                                                                                               | Default |
| ------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `children`         | `node`     | Children passed to `LeafyGreenProvider` will be unmodified, aside from having access to its state.                                                                                        |         |
| `baseFontSize`     | `14`, `16` | Describes the `font-size` that the application is using. `<Body/>` and `<InlineCode />` components use this value to determine the `font-size` and `line-height` applied to their content | `14`    |
| `darkMode`         | `boolean`  | Determines if LG components should be rendered in dark mode.                                                                                                                              |         |
| `forceUseTopLayer` | `boolean`  | Determines globally if popover elements using `Popover` component from `@leafygreen-ui/popover` package should render in top layer                                                        | `false` |

## PopoverPropsProvider

The `PopoverPropsProvider` can be used to pass props to a deeply nested popover element.

### Example

```js
import { PopoverPropsProvider } from '@leafygreen-ui/leafygreen-provider';

const ParentComponentWithNestedPopover = ({ ...popoverProps }) => {
  return (
    <PopoverPropsProvider {...popoverProps}>
      <ChildComponentWithNestedPopover />
    </PopoverPropsProvider>
  );
};
```

### Properties

| Prop                           | Type                                      | Description                                                                                                                                                                                                                                                                                                                                                                           | Default       |
| ------------------------------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `dismissMode`                  | `'auto'` \| `'manual'`                    | Options to control how the popover element is dismissed. This will only apply when `renderMode` is `'top-layer'` <br> \* `'auto'` will automatically handle dismissal on backdrop click or esc key press, ensuring only one popover is visible at a time <br> \* `'manual'` will require that the consumer handle dismissal manually                                                  | `'auto'`      |
| `onToggle`                     | `(e: ToggleEvent) => void;`               | Function that is called when the popover is toggled. This will only apply when `renderMode` is `'top-layer'`                                                                                                                                                                                                                                                                          |               |
| `popoverZIndex` (deprecated)   | `number`                                  | Sets the z-index CSS property for the popover. This will only apply if `usePortal` is defined and `renderMode` is not `'top-layer'`                                                                                                                                                                                                                                                   |               |
| `portalClassName` (deprecated) | `string`                                  | Passes the given className to the popover's portal container if the default portal container is being used. This will only apply when `renderMode` is `'portal'`                                                                                                                                                                                                                      |               |
| `portalContainer` (deprecated) | `HTMLElement` \| `null`                   | Sets the container used for the popover's portal. This will only apply when `renderMode` is `'portal'`. <br> NOTE: If using a `scrollContainer` make sure that the `portalContainer` is contained within the `scrollContainer`. E.g, passing the same reference to `scrollContainer` and `portalContainer`.                                                                           |               |
| `portalRef` (deprecated)       | `string`                                  | Passes a ref to forward to the portal element. This will only apply when `renderMode` is `'portal'`                                                                                                                                                                                                                                                                                   |               |
| `renderMode`                   | `'inline'` \| `'portal'` \| `'top-layer'` | Options to render the popover element <br> \* [deprecated] `'inline'` will render the popover element inline in the DOM where it's written <br> \* [deprecated] `'portal'` will render the popover element in a new div appended to the body. Alternatively, can be portaled into a provided `portalContainer` <br> \* `'top-layer'` will render the popover element in the top layer | `'top-layer'` |
| `scrollContainer` (deprecated) | `HTMLElement` \| `null`                   | If the popover portal has a scrollable ancestor other than the window, this prop allows passing a reference to that element to allow the portal to position properly. This will only apply when `renderMode` is `'portal'`                                                                                                                                                            |               |
| `spacing`                      | `number`                                  | Specifies the amount of spacing (in pixels) between the trigger element and the content element.                                                                                                                                                                                                                                                                                      | `4`           |

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

### Example

```js
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

function Example({ children, darkMode: darkModeProp, variant }) {
  const { darkMode, theme, setDarkMode } = useDarkMode(darkModeProp);
  return <div className={badgeVariants[theme][variant]}>{children}</div>;
}
```
