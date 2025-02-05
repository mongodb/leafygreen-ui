# @leafygreen-ui/info-sprinkle

## 4.0.3

### Patch Changes

- 78efdc99a: The `trigger` associated with the `InfoSprinkle` component was previously a `<button>` element using the default `type="submit"`. When an `InfoSprinkle` instance was used in a `<form>` element, clicking would unexpectedly submit form data to the server. The `<button>` element now uses `type="button"` to prevent this behavior.

## 4.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/icon@13.1.2
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/palette@4.1.3
  - @leafygreen-ui/tokens@2.11.3
  - @leafygreen-ui/tooltip@13.0.2

## 4.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/palette@4.1.2
  - @leafygreen-ui/tooltip@13.0.1
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/icon@13.1.1
  - @leafygreen-ui/lib@14.0.1

## 4.0.0

### Major Changes

- 274d7e1a7: Removes prop-types from LeafyGreen UI

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/tooltip@13.0.0
  - @leafygreen-ui/icon@13.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/tokens@2.11.1

## 3.0.0

### Major Changes

- 04bb887c0: [LG-4121](https://jira.mongodb.org/browse/LG-4121): `InfoSprinkle` renders tooltip in the top layer using popover API. As a result, the following props are removed:

  - `popoverZIndex`
  - `portalClassName`
  - `portalContainer`
  - `portalRef`
  - `scrollContainer`
  - `usePortal`

  Additional changes include:

  - Deprecates and removes `justify="fit"`. Instead, use `justify="middle"`
  - Opens tooltip immediately on hover instead of default 500ms delay

  #### Migration guide

  Use [popover-v12 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#popover-v12) for migration assistance.

  ##### Old

  ```js
  <InfoSprinkle popoverZIndex={9999} usePortal={false} />
  <InfoSprinkle portalClassName="portal-class" usePortal />
  ```

  ##### New

  ```js
  <InfoSprinkle />
  <InfoSprinkle />
  ```

### Patch Changes

- Updated dependencies [04bb887c0]
  - @leafygreen-ui/leafygreen-provider@3.2.0
  - @leafygreen-ui/tooltip@12.0.0
- Updated dependencies [117a463f8]
  - @leafygreen-ui/lib@13.8.1

## 2.1.0

### Minor Changes

- 6b8ad3d42: Updates `children` type to accept `React.ReactNode` rather than just `string`

## 2.0.0

### Major Changes

- bbd56ee88: - Adds `triggerProps` prop. These props are passed to the trigger element.
  ```js
    triggerProps={{
      onMouseDown: () => {},
      onMouseOver: () => {},
      'aria-label': 'aria-label',
    }}>
  ```
  - Removes `triggerAriaLabel` prop. Instead you can pass `aria-label` to `triggerProps`.
  - Internally changes the trigger from a `span` with `role="button` to a `button`.

### Patch Changes

- Updated dependencies [2f05b61ab]
- Updated dependencies [eb80fd3cb]
  - @leafygreen-ui/icon@12.6.0

## 1.0.5

### Patch Changes

- c86227a6: Updates storybook for .design

## 1.0.4

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/icon@12.0.1
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/tokens@2.5.2
  - @leafygreen-ui/tooltip@11.0.3

## 1.0.3

### Patch Changes

- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/tooltip@11.0.2

## 1.0.2

### Patch Changes

- Updated dependencies [c41752d2]
- Updated dependencies [783add80]
- Updated dependencies [89332190]
  - @leafygreen-ui/icon@11.25.0
  - @leafygreen-ui/tooltip@11.0.0

## 1.0.1

### Patch Changes

- Updated dependencies [dd4f3da8]
- Updated dependencies [7c3e6d39]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/tooltip@10.1.0
  - @leafygreen-ui/leafygreen-provider@3.1.10

## 1.0.0

### Major Changes

- 954645a5: First major release of `InfoSprinkle`
