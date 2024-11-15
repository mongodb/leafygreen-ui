---
'@leafygreen-ui/popover': major
---

[LG-4445](https://jira.mongodb.org/browse/LG-4445): Replaces `usePortal` prop with `renderMode` prop with values of `'inline'`, `'portal'`, and `'top-layer'`. `renderMode="inline"` and `renderMode="portal"` are deprecated, and all popover elements should migrate to using the top layer. The old default was `usePortal=true`, and the new default is `renderMode="top-layer"`.
  - When `renderMode="top-layer"` or `renderMode` is `undefined`, the popover element will render in the top layer using the [popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
    - Adds `dismissMode` prop to control dismissal behavior of the popover element. [Read more about the popover attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover)
    - Adds `onToggle` prop to run a callback function when the visibility of a popover element rendered in the top layer is toggled
  - When `renderMode="inline"`, the popover element will render inline in the DOM where it's written
  - When `renderMode="portal"`, the popover element will portal into a new div appended to the body. Alternatively, it can be portaled into a provided `portalContainer` element

[LG-4446](https://jira.mongodb.org/browse/LG-4446): The `PopoverPropsProvider` from the `@leafygreen-ui/leafygreen-provider` package can be used to pass props to a deeply nested popover element. It will read `PopoverPropsContext` values if an explicit prop is not defined in the popover component instance. This applies for the following props:
  - `dismissMode`
  - `onEnter`
  - `onEntering`
  - `onEntered`
  - `onExit`
  - `onExiting`
  - `onExited`
  - `onToggle`
  - `popoverZIndex`
  - `portalClassName`
  - `portalContainer`
  - `portalRef`
  - `renderMode`
  - `scrollContainer`
  - `spacing`

Additional changes include:
- Adds and exports `getPopoverRenderModeProps` util to pick popover props based on given `renderMode` value
- Deprecates and removes `justify="fit"`. Instead, use `justify="middle"`
- Removes unused `contentClassName` prop
- Updates default value of `spacing` prop from 10px to 4px
- Replaces internal position utils with `@floating-ui/react`

#### Migration guide

Use [popover-v12 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#popover-v12) for migration assistance.

##### Old
```js
<Popover popoverZIndex={9999} usePortal={false} />
<Popover portalClassName="portal-class" usePortal />
<Popover />
```

##### New
```js
<Popover popoverZIndex={9999} renderMode="inline" />
<Popover portalClassName="portal-class" renderMode="portal" />
<Popover renderMode="portal" />
```

##### Globally render popover elements in top layer
After running the codemod and addressing manual updates, the new `forceUseTopLayer` prop in the `LeafyGreenProvider` can be used to test interactions with all LG popover elements forcibly set to `renderMode="top-layer"`. This can help pressure test for any regressions to more confidently and safely migrate.

```js
import { Combobox } from '@leafygreen-ui/combobox';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import Popover from '@leafygreen-ui/popover';
import { Select } from '@leafygreen-ui/select';

{/* all LG popover elements will render in top layer */}
<LeafyGreenProvider forceUseTopLayer={true}>
  <Popover renderMode="inline" />
  <Combobox renderMode="portal" />
  <Select renderMode="inline" />
</LeafyGreenProvider>;
```
