# @leafygreen-ui/menu

## 28.0.0

### Major Changes

- 274d7e1a7: Removes prop-types from LeafyGreen UI

### Patch Changes

- a3d63cb95: Export prop types for components already wrapped in polymorphic types
- Updated dependencies [a3d63cb95]
- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/input-option@3.0.0
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/icon-button@16.0.0
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/popover@13.0.0
  - @leafygreen-ui/icon@13.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/descendants@2.0.0
  - @leafygreen-ui/hooks@8.3.2
  - @leafygreen-ui/polymorphic@2.0.3
  - @leafygreen-ui/tokens@2.11.1

## 27.0.0

### Major Changes

- 04bb887c0: [LG-4121](https://jira.mongodb.org/browse/LG-4121): Replaces `usePortal` prop with `renderMode` prop. `renderMode="inline"` and `renderMode="portal"` are deprecated, and all popover elements should migrate to using the top layer. The old default was `usePortal=true`, and the new default is `renderMode="top-layer"`.

  See [@leafygreen-ui/popover package 12.0.0 changelog](https://github.com/mongodb/leafygreen-ui/blob/main/packages/popover/CHANGELOG.md#1200) for more info.

  Additional changes include:

  - Deprecates and removes `justify="fit"`. Instead, use `justify="middle"`

  #### Migration guide

  Use [popover-v12 codemod](https://github.com/mongodb/leafygreen-ui/tree/main/tools/codemods#popover-v12) for migration assistance.

  ##### Old

  ```js
  <Menu popoverZIndex={9999} usePortal={false} />
  <Menu portalClassName="portal-class" usePortal />
  ```

  ##### New

  ```js
  <Menu popoverZIndex={9999} renderMode="inline" />
  <Menu portalClassName="portal-class" renderMode="portal" />
  ```

### Patch Changes

- Updated dependencies [04bb887c0]
  - @leafygreen-ui/hooks@8.3.0
  - @leafygreen-ui/leafygreen-provider@3.2.0
  - @leafygreen-ui/popover@12.0.0
- Updated dependencies [117a463f8]
  - @leafygreen-ui/lib@13.8.1

## 26.0.0

### Major Changes

- 08112c810: [LG-4630](https://jira.mongodb.org/browse/LG-4630): Apply highlight to first menu item only when opened with keyboard

## 25.1.3

### Patch Changes

- 5f10976d5: - Updates `useAvailableSpace` hook which fixes a dropdown height bug. [LG-4601](https://jira.mongodb.org/browse/LG-4601).

## 25.1.2

### Patch Changes

_Note_: This version has no updates. Pleas use version `25.1.3`.

- Updates `useAvailableSpace` hook which fixes a dropdown height bug. [LG-4601](https://jira.mongodb.org/browse/LG-4601)

## 25.1.1

### Patch Changes

- af96e3967: [LG-4422](https://jira.mongodb.org/browse/LG-4422) Update chevron icon to properly indicate if interaction will expand or collapse and add animation
- Updated dependencies [e7bc12814]
- Updated dependencies [c1b8b633b]
- Updated dependencies [ecae9acc7]
- Updated dependencies [fe2483937]
  - @leafygreen-ui/icon-button@15.0.23
  - @leafygreen-ui/hooks@8.1.4
  - @leafygreen-ui/input-option@2.0.2

## 25.1.0

### Minor Changes

- 409377e19: Adds additional exports:
  - `MenuDescendantsContext`
    - Used to register and consume Menu descendants
    - This context value allows you to register and track custom menu items
  - Context hooks `useMenuContext`, `useMenuGroupContext`, & `useSubMenuContext`, along with types types `MenuContextData`, `MenuGroupContextData`, & `SubMenuContextData`,
    - use these to read context data from custom menu item components
  - `menuColor`: Custom color tokens used within `Menu` and related components
  - `MenuInteractionState`: Enumerates interaction states on a menu item
  - `LGIDs`: Unique ids for menu elements
  - `menuItemClassName`: The unique class name for menu item components
  - `subMenuContainerClassName` & `subMenuToggleClassName`
    - Unique classnames for submenu elements

### Patch Changes

- Updated dependencies [409377e19]
  - @leafygreen-ui/descendants@1.0.1

## 25.0.1

### Patch Changes

- 4c04aa0ee: Update Menu to use latest Descendants API
- Updated dependencies [4c04aa0ee]
- Updated dependencies [66e5665e8]
- Updated dependencies [4c04aa0ee]
- Updated dependencies [4c04aa0ee]
  - @leafygreen-ui/lib@13.7.0
  - @leafygreen-ui/tokens@2.10.0
  - @leafygreen-ui/descendants@1.0.0

## 25.0.0

### Major Changes

- cfa830701: Internally refactors Menu to leverage `@leafygreen-ui/descendants`. This improvement will enable faster feature development and bug fixes in the future.
- cfa830701: Implements `InputOption` within `MenuItem`.
  - Aligns spacing & colors with other dropdown menus.
  - Also creates additional `MenuItem` generated stories
- cfa830701: - Updates the `FocusableMenuItem` component for new menu descendants pattern. By wrapping an input component in `FocusableMenuItem`, it will be registered as a menu item descendant, and will be focusable using standard menu arrow key interactions.
  - Note: the single child of `FocusableMenuItem` must itself be focusable. Wrapping a focusable element (e.g. `input` in a `div`) will not enable the menu descendant functionality.

### Minor Changes

- cfa830701: Adds `title` and `glyph` props to `MenuGroup`. Providing a title to `MenuGroup` will visually indent the child `MenuItem` components, appearing nested within the group.
- cfa830701: ## Features

  - Clicking a submenu item that _does not_ have a click handler or `href` will toggle the submenu
  - When focused on a submenu item, pressing the left/right arrow keys will close/open the menu (respectively)

  ## Structural changes

  - Updates Submenu component to use `InputOption`
  - Moves the submenu toggle button to be a sibling of the `InputOption`
    - this avoids any potential nesting of `button` elements

### Patch Changes

- cfa830701: Ensures `SubMenu` does not toggle open/closed when disabled
- cfa830701: Fixes a bug where click handlers on MenuItem or SubMenu would still fire when disabled
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [db2d1d12c]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
  - @leafygreen-ui/input-option@2.0.0
  - @leafygreen-ui/lib@13.6.1
  - @leafygreen-ui/descendants@0.3.0
  - @leafygreen-ui/typography@19.2.1

## 24.2.1

### Patch Changes

- Updated dependencies [7a901b954]
- Updated dependencies [7a901b954]
- Updated dependencies [342ab81b0]
- Updated dependencies [29d50edaa]
  - @leafygreen-ui/polymorphic@2.0.0
  - @leafygreen-ui/lib@13.6.0
  - @leafygreen-ui/icon@12.5.4
  - @leafygreen-ui/tokens@2.9.0

## 24.2.0

### Minor Changes

- 02e1d77e: Expose `portalRef` in components that use `Popover`:

  - `Combobox`
  - `DatePicker`
  - `GuideCue`
  - `Menu`
  - `NumberInput`
  - `Select`
  - `SplitButton`
  - `Tooltip`

  [LG-3988](https://jira.mongodb.org/browse/LG-3988)

### Patch Changes

- Updated dependencies [02e1d77e]
- Updated dependencies [7bc4fcde]
- Updated dependencies [7bc4fcde]
- Updated dependencies [961be3f9]
  - @leafygreen-ui/popover@11.4.0
  - @leafygreen-ui/lib@13.5.0
  - @leafygreen-ui/tokens@2.8.0
  - @leafygreen-ui/icon@12.5.0

## 24.1.0

### Minor Changes

- 433616d4: Exports `MenuGroup` from package

### Patch Changes

- Updated dependencies [57dedc40]
  - @leafygreen-ui/tokens@2.5.3

## 24.0.0

### Major Changes

- 1d55530b: Removes the closing of `Menu` on `MenuItem` click. This behavior was causing issues with clickable items inside of `MenuItem`. To control when `Menu` closes, use `open` and `setOpen`. [LG-4130](https://jira.mongodb.org/browse/LG-4130)

## 23.0.3

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/icon-button@15.0.21
  - @leafygreen-ui/popover@11.3.1
  - @leafygreen-ui/icon@12.0.1
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/hooks@8.1.3
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/polymorphic@1.3.7
  - @leafygreen-ui/tokens@2.5.2

## 23.0.2

### Patch Changes

- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0
  - @leafygreen-ui/icon-button@15.0.20

## 23.0.1

### Patch Changes

- e487fb24: Renames story files from `.story.tsx` to `.stories.tsx`
- Updated dependencies [8ad4fdbc]
- Updated dependencies [5ee54143]
- Updated dependencies [e487fb24]
  - @leafygreen-ui/popover@11.3.0
  - @leafygreen-ui/tokens@2.5.1
  - @leafygreen-ui/hooks@8.1.2
  - @leafygreen-ui/icon@11.29.1

## 23.0.0

### Major Changes

- 2724d6b7: - Updates dark mode `Menu`. Previously `Menu` had an inverted light theme in dark mode but now `Menu` will have a dark theme in dark mode. Light mode and dark mode will have different dark themes.
  - Adds a 1px border around the menu dropdown.

### Minor Changes

- 7c3e6d39: Adds `initialOpen` prop, which allows consuming applications to control the initial state of an uncontrolled implementation of the component.

### Patch Changes

- dd4f3da8: Adds tests for pressing enter/space on a menuItem
- Updated dependencies [dd4f3da8]
- Updated dependencies [784e9d8a]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/icon-button@15.0.19
  - @leafygreen-ui/leafygreen-provider@3.1.10
  - @leafygreen-ui/popover@11.1.1

## 22.0.9

### Patch Changes

- b15c4805: Adds `variant` prop to MenuItem component. The value can either be `'default'` or `'destructive'`

## 22.0.8

### Patch Changes

- 3a9b274d: Handles keyboard event based on the event's `key` property rather than its `keyCode` property
- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/icon-button@15.0.18
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/popover@11.0.18

## 22.0.7

### Patch Changes

- Updated dependencies [3fe03b50]
- Updated dependencies [fd907503]
- Updated dependencies [c9f0055a]
- Updated dependencies [56459cde]
  - @leafygreen-ui/tokens@2.2.0
  - @leafygreen-ui/hooks@8.0.0
  - @leafygreen-ui/icon@11.23.0
  - @leafygreen-ui/leafygreen-provider@3.1.8
  - @leafygreen-ui/popover@11.0.17

## 22.0.6

### Patch Changes

- 4fcf2e94: Updates types with `React.PropsWithChildren`
- 4fcf2e94: Bumps `react-transition-group` to `^4.4.5`.
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/icon@11.22.2
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/polymorphic@1.3.6
  - @leafygreen-ui/popover@11.0.16
  - @leafygreen-ui/icon-button@15.0.17
  - @leafygreen-ui/leafygreen-provider@3.1.7

## 22.0.5

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/icon@11.22.1
  - @leafygreen-ui/icon-button@15.0.16
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/polymorphic@1.3.5
  - @leafygreen-ui/popover@11.0.15
  - @leafygreen-ui/tokens@2.1.4

## 22.0.4

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [f73807cf]
- Updated dependencies [31c09354]
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/icon@11.22.0
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/hooks@7.7.7
  - @leafygreen-ui/icon-button@15.0.15
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/polymorphic@1.3.4
  - @leafygreen-ui/popover@11.0.14
  - @leafygreen-ui/tokens@2.1.3

## 22.0.3

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/icon-button@15.0.14
  - @leafygreen-ui/polymorphic@1.3.3
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/popover@11.0.13
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/icon@11.20.1
  - @leafygreen-ui/lib@10.4.1

## 22.0.2

### Patch Changes

- 735342e9: Reduce the number of re-renders and fixes a bug that prevented a previously opened menu from closing on the opening of another menu.
- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [735342e9]
- Updated dependencies [95f5107a]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/hooks@7.7.5
  - @leafygreen-ui/icon@11.17.0
  - @leafygreen-ui/popover@11.0.12
  - @leafygreen-ui/icon-button@15.0.12
  - @leafygreen-ui/tokens@2.1.1

## 22.0.1

### Patch Changes

- 63b2deb0b: Upgrade button to v20.1.1
- Updated dependencies [63b2deb0b]
  - @leafygreen-ui/popover@11.0.11

## 22.0.0

### Major Changes

- c0699a0df: Clicking on a MenuItem closes the Menu component
- 0cd471676: Refactor `Menu` to use `forwardRef`.

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- 0cd471676: Adds `id` prop and adds `aria-expanded` and `aria-haspopup` internally. Removes `MenuItem.displayName` and passes the displayName as an argument to `InferredPolymorphic` instead.
- Updated dependencies [d2ce54e2f]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/icon-button@15.0.11
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/polymorphic@1.3.2
  - @leafygreen-ui/popover@11.0.10

## 21.0.0

### Major Changes

- bdc11b5be: When you press the `tab` key within a menu that is open, it will no longer cycle through the available options. Rather, the menu will close and the focus will shift to the trigger of the menu.

### Patch Changes

- f2ae45924: Fixes flakey menu tests
- 73cbbd02c: Uses fontWeight token from `@leafygreen-ui/tokens`
- Updated dependencies [73cbbd02c]
- Updated dependencies [8ece56980]
- Updated dependencies [83fc5b31b]
- Updated dependencies [8ece56980]
- Updated dependencies [32b3d3146]
  - @leafygreen-ui/tokens@2.1.0
  - @leafygreen-ui/popover@11.0.9
  - @leafygreen-ui/icon@11.14.0
  - @leafygreen-ui/hooks@7.7.2

## 20.0.3

### Patch Changes

- cf00160ec: Updates TSDocs
- ce0fcb3f6: Excludes `children` from story controls
- Updated dependencies [55d33e435]
- Updated dependencies [55d33e435]
- Updated dependencies [cf00160ec]
- Updated dependencies [ce0fcb3f6]
- Updated dependencies [111b680c5]
- Updated dependencies [77320a6b8]
  - @leafygreen-ui/lib@10.3.3
  - @leafygreen-ui/palette@4.0.4
  - @leafygreen-ui/icon-button@15.0.10
  - @leafygreen-ui/popover@11.0.8
  - @leafygreen-ui/tokens@2.0.3

## 20.0.2

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/icon@11.13.1
  - @leafygreen-ui/icon-button@15.0.9
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/polymorphic@1.3.1
  - @leafygreen-ui/popover@11.0.7
  - @leafygreen-ui/tokens@2.0.2

## 20.0.1

### Patch Changes

- b9841decc: Ensures MenuItem and SubMenu components are rendered with proper HTML elements
- b9841decc: Improves prop types and polymorphic support
- Updated dependencies [5b036515e]
- Updated dependencies [b9841decc]
- Updated dependencies [26e341a0b]
- Updated dependencies [997121cc3]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/polymorphic@1.2.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/icon@11.12.5
  - @leafygreen-ui/icon-button@15.0.7
  - @leafygreen-ui/tokens@2.0.1

## 20.0.0

### Major Changes

- 2f732ca50: Migrate component to use `Polymorphic` instead of `Box` internally. This should allow better support of the `styled` API. Additionally, this fixes a bug with the `as` prop, which should now work as expected and allow consuming applications to choose what component MenuItem and SubMenu components are rendered as.

### Patch Changes

- bf2fedf6d: Version bumps lib
- Updated dependencies [ffb99f417]
- Updated dependencies [bf2fedf6d]
  - @leafygreen-ui/hooks@7.5.0
  - @leafygreen-ui/icon-button@15.0.6
  - @leafygreen-ui/leafygreen-provider@3.1.1

## 19.0.4

### Patch Changes

- c82ed35d5: Removes `useUsingKeyboardContext` from component, in favor of `&:focus-visible`
- Updated dependencies [050f1f8a9]
- Updated dependencies [741cdd408]
- Updated dependencies [c82ed35d5]
- Updated dependencies [b24b21462]
  - @leafygreen-ui/icon@11.12.4
  - @leafygreen-ui/tokens@2.0.0
  - @leafygreen-ui/icon-button@15.0.4
  - @leafygreen-ui/palette@3.4.7
  - @leafygreen-ui/popover@11.0.4

## 19.0.3

### Patch Changes

- 33a5dac82: Updates disabled and focus styles.

## 19.0.2

### Patch Changes

- b7f7a4c95: Updates package dependencies & devDependencies, and ensures each package is appropriately listed. Ensures `tsconfig` has no circular dependencies
- Updated dependencies [b7f7a4c95]
  - @leafygreen-ui/icon@11.12.2
  - @leafygreen-ui/icon-button@15.0.2
  - @leafygreen-ui/palette@3.4.5
  - @leafygreen-ui/popover@11.0.2
  - @leafygreen-ui/tokens@1.4.1

## 19.0.1

### Patch Changes

- 1a335d0b2: Migrate component internals to check for glyphs explicity, rather than for Icon components as well
- ae5421cf6: Updates components to use internal transition tokens
- Updated dependencies [ae5421cf6]
- Updated dependencies [4b4c2d27d]
- Updated dependencies [1a335d0b2]
- Updated dependencies [ae5421cf6]
  - @leafygreen-ui/tokens@1.4.0
  - @leafygreen-ui/icon@11.12.1
  - @leafygreen-ui/icon-button@15.0.1
  - @leafygreen-ui/popover@11.0.1

## 19.0.0

### Patch Changes

- Updated dependencies [b9b09a86]
  - @leafygreen-ui/leafygreen-provider@3.1.0
  - @leafygreen-ui/icon-button@15.0.0
  - @leafygreen-ui/popover@11.0.0

## 18.0.0

### Major Changes

- f2d63a60: Removes leafygreen data attributes (prefixed with `data-leafygreen-ui-`), and replaces them with deterministic classNames (prefixed with `lg-ui-`)

### Patch Changes

- Updated dependencies [2195359a]
- Updated dependencies [209f77ed]
- Updated dependencies [f2d63a60]
  - @leafygreen-ui/icon-button@14.0.1
  - @leafygreen-ui/icon@11.12.0
  - @leafygreen-ui/lib@10.0.0
  - @leafygreen-ui/leafygreen-provider@3.0.1
  - @leafygreen-ui/popover@10.0.1

## 17.0.0

### Patch Changes

- Updated dependencies [e399f1b9]
- Updated dependencies [e399f1b9]
  - @leafygreen-ui/leafygreen-provider@3.0.0
  - @leafygreen-ui/icon-button@14.0.0
  - @leafygreen-ui/popover@10.0.0

## 16.1.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/box@3.1.1
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/hooks@7.3.3
  - @leafygreen-ui/icon@11.11.1
  - @leafygreen-ui/icon-button@13.2.1
  - @leafygreen-ui/leafygreen-provider@2.3.5
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4
  - @leafygreen-ui/popover@9.1.1
  - @leafygreen-ui/tokens@1.3.4

## 16.1.0

### Minor Changes

- 3690df49: Updates TypeScript annotations, type structures and export format of some components

### Patch Changes

- 3690df49: Updates Storybook configs
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [58a5a05e]
  - @leafygreen-ui/box@3.1.0
  - @leafygreen-ui/icon@11.11.0
  - @leafygreen-ui/icon-button@13.2.0
  - @leafygreen-ui/popover@9.1.0
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/hooks@7.3.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/palette@3.4.3
  - @leafygreen-ui/tokens@1.3.3

## 16.0.0

### Major Changes

- a1202635: Adds a call to `event.nativeEvent.stopPropagation()` on trigger click, preventing the native event from propagating, while still allowing the React synthetic event to bubble. This ensures clicks on the trigger do not close the menu in hybrid/multi-framework apps

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- 5de9d6ad: Resolving unique key warning on trigger component
- Updated dependencies [7caa1c3e]
- Updated dependencies [1e708bd3]
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/icon@11.10.2
  - @leafygreen-ui/popover@9.0.1
  - @leafygreen-ui/box@3.0.8
  - @leafygreen-ui/emotion@4.0.1
  - @leafygreen-ui/hooks@7.3.1
  - @leafygreen-ui/icon-button@13.1.1
  - @leafygreen-ui/leafygreen-provider@2.3.3
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2
  - @leafygreen-ui/tokens@1.3.2

## 15.0.1

### Patch Changes

- cdbbe4a2: Fix background color appearing when clicking on a disabled menu item
- fdd1cbbf: Adds missing dependencies
- Updated dependencies [30e038a3]
  - @leafygreen-ui/palette@3.4.1

## 15.0.0

### Major Changes

- 5aba12f1: - Update `Menu` for dark mode brand refresh.
  - Adds `darkMode` prop to determine whether or not the component will render in dark theme.
  - Adds vertical spacing to `MenuSeparator`.
  - Increase default `maxHeight` to 344px.
  - Fixing bug where passing color styles to `MenuItem` using the `className` prop was being overwritten.

### Patch Changes

- 5aba12f1: Prevents the page from scrolling on up/down arrow key press when the menu is open

## 14.0.2

### Patch Changes

- f9846f68: When a menu is closed with the `Escape` key, the trigger will regain focus

## 14.0.1

### Patch Changes

- c897e216: Removes flicker in the active wedge

## 14.0.0

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/leafygreen-provider@2.3.0
  - @leafygreen-ui/icon-button@13.0.0
  - @leafygreen-ui/popover@9.0.0

## 13.1.1

### Patch Changes

- fad2b287: Fixes a bug where occasionally the max menu height would be set to 0 if a ref was left unset

## 13.1.0

### Minor Changes

- 6792bc44: Adds a `maxHeight` prop. Menu will automatically restrict its height to the smallest of `maxHeight` and the available vertical space (using the hook `useAvailableSpace`).

### Patch Changes

- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls
- Updated dependencies [6a89bc29]
- Updated dependencies [fd2f6de0]
- Updated dependencies [6792bc44]
- Updated dependencies [96d1ff9c]
- Updated dependencies [422dbfcd]
- Updated dependencies [9ff90d4b]
  - @leafygreen-ui/palette@3.4.0
  - @leafygreen-ui/box@3.0.7
  - @leafygreen-ui/hooks@7.3.0
  - @leafygreen-ui/icon-button@11.0.2
  - @leafygreen-ui/tokens@1.3.1
  - @leafygreen-ui/lib@9.3.0

## 13.0.1

### Patch Changes

- bc2558c5: Adding named exports for select components and types
- Updated dependencies [bc2558c5]
  - @leafygreen-ui/icon-button@11.0.1

## 13.0.0

### Major Changes

- Updated dependencies [c48e943e]
  - @leafygreen-ui/leafygreen-provider@2.2.0

### Patch Changes

- ddd0f1ec: Adds `aria-current` attribute to active menu item
- Updated dependencies [e13d2487]
- Updated dependencies [5f28fce1]
- Updated dependencies [c48e943e]
  - @leafygreen-ui/icon-button@11.0.0
  - @leafygreen-ui/popover@8.0.0
  - @leafygreen-ui/tokens@1.3.0

## 12.2.0

### Minor Changes

- 24d31147: Allows custom props to be passed to MenuItem components inside Menu/SubMenu

### Patch Changes

- Updated dependencies [233ac580]
- Updated dependencies [ba4aab15]
- Updated dependencies [2cf1bc4a]
- Updated dependencies [ef84b5fd]
  - @leafygreen-ui/tokens@1.2.0
  - @leafygreen-ui/lib@9.2.1
  - @leafygreen-ui/popover@7.2.3

## 12.1.0

### Minor Changes

- acd6919: Updates `MenuSeparator` to optionally accept a `className` prop

### Patch Changes

- acd6919: Removes an undocumented change where both `href` and `description` would be rendered if provided to `MenuItem`. Now only `description` will be rendered.
- acd6919: - Eliminates fuzzy text on hover in `menu` and `tabs`
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
  - @leafygreen-ui/lib@9.2.0
  - @leafygreen-ui/palette@3.3.2
  - @leafygreen-ui/icon-button@10.0.0

## 12.0.0

### Major Changes

- 8457f92: Updates Menu in line with visual brand refresh. Note: menus are now dark with light text

### Patch Changes

- Updated dependencies [8457f92]
  - @leafygreen-ui/tokens@1.0.0
- Updated dependencies [cb54eef]
  - @leafygreen-ui/palette@3.3.1

## 11.0.1

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/icon-button@9.1.6
  - @leafygreen-ui/box@3.0.6
  - @leafygreen-ui/leafygreen-provider@2.1.3
  - @leafygreen-ui/popover@7.2.2

## 11.0.0

### Major Changes

- 8409a9ea: Styles text on the MenuItem container such that styles can be overwritten by consuming applications

## 10.0.3

### Patch Changes

- Updated dependencies [e1af3278]
- Updated dependencies [047c1930]
- Updated dependencies [047c1930]
  - @leafygreen-ui/icon-button@9.1.5
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/hooks@7.0.0
  - @leafygreen-ui/box@3.0.5
  - @leafygreen-ui/leafygreen-provider@2.1.2
  - @leafygreen-ui/popover@7.2.1

## 10.0.2

### Patch Changes

- 4b7b7322: Adds `role='presentation'` to glyphs rendered before menu items

## 10.0.1

### Patch Changes

- 5bb0e25f: CaretIcons no longer announced to scren readers, since they are not focusable
- a4d3f000: Updates icons in inactive menu and submenu items to `uiColors.gray.dark1`

## 10.0.0

### Minor Changes

- 857a680a: Adds support for positioning popover elements relative to elements within a scroll container other than the window.
  Adds support for setting z-index on popover elements with the `zIndex` prop.

### Patch Changes

- Updated dependencies [857a680a]
- Updated dependencies [857a680a]
  - @leafygreen-ui/leafygreen-provider@2.1.0
  - @leafygreen-ui/popover@7.2.0

## 9.1.4

### Patch Changes

- Updated dependencies [90321b36]
- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/icon-button@9.1.3
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/box@3.0.4
  - @leafygreen-ui/leafygreen-provider@2.0.3
  - @leafygreen-ui/popover@7.1.4

## 9.1.3

### Patch Changes

- 4b387979: Adds `role="none"` to li element in `MenuItem` component

## 9.1.2

### Patch Changes

- f3523462: Implementation update that avoids some unnecessary rerenders

## 9.1.1

### Patch Changes

- ee7923d3: Changes how we extend the types of HTMLElements, and standardizes how we document this across readmes
- Updated dependencies [ee7923d3]
- Updated dependencies [627333c2]
  - @leafygreen-ui/lib@6.1.2
  - @leafygreen-ui/icon-button@9.1.0

## 9.1.0

### Minor Changes

- c18f16e6: Improves compatibility with React v17

### Patch Changes

- Updated dependencies [c18f16e6]
- Updated dependencies [c18f16e6]
- Updated dependencies [c9a0d89f]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/hooks@6.0.0
  - @leafygreen-ui/popover@7.1.0
  - @leafygreen-ui/palette@3.1.0
  - @leafygreen-ui/lib@6.1.1
  - @leafygreen-ui/leafygreen-provider@2.0.2

## 9.0.2

### Patch Changes

- f7b3d668: Fixes issue where scrollbar is always visible

## 9.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/box@3.0.1
  - @leafygreen-ui/hooks@5.0.1
  - @leafygreen-ui/icon-button@9.0.1
  - @leafygreen-ui/leafygreen-provider@2.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/palette@3.0.1
  - @leafygreen-ui/popover@7.0.1

## 9.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/box@3.0.0
  - @leafygreen-ui/hooks@5.0.0
  - @leafygreen-ui/icon-button@9.0.0
  - @leafygreen-ui/icon@7.0.0
  - @leafygreen-ui/leafygreen-provider@2.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0
  - @leafygreen-ui/popover@7.0.0

## 8.0.0

### Major Changes

- a18b4e1b: Menus are now scrollable when their contents exceed their size. Previously the excess content would be hidden.

### Patch Changes

- Updated dependencies [001a277f]
  - @leafygreen-ui/icon@6.6.1
  - @leafygreen-ui/icon-button@8.0.1

## 7.0.10

### Patch Changes

- Updated dependencies [6e210765]
  - @leafygreen-ui/popover@6.0.0

## 7.0.9

### Patch Changes

- 47846c77: Fixes unintentional exclusion of `ref` from TypeScript typing of props for `Button`, `SubMenu`, and `MenuItem` components.
- Updated dependencies [a84219f1]
  - @leafygreen-ui/icon-button@8.0.0

## 7.0.8

### Patch Changes

- 6b0d0a2: Removed an extraneous propType
- Updated dependencies [a14a079]
- Updated dependencies [290c9fc]
  - @leafygreen-ui/box@2.1.4
  - @leafygreen-ui/popover@5.2.1

## 7.0.7

### Patch Changes

- Updated dependencies [ab4c074]
  - @leafygreen-ui/icon-button@7.0.0

## 7.0.6

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/box@2.1.3
  - @leafygreen-ui/hooks@4.0.1
  - @leafygreen-ui/icon@6.3.2
  - @leafygreen-ui/icon-button@6.1.4
  - @leafygreen-ui/leafygreen-provider@1.1.4
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2
  - @leafygreen-ui/popover@5.1.4

## 7.0.5

### Patch Changes

- Updated dependencies [fa55b3d]
  - @leafygreen-ui/hooks@4.0.0
  - @leafygreen-ui/leafygreen-provider@1.1.3
  - @leafygreen-ui/popover@5.1.3

## 7.0.4

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [d2136a0]
- Updated dependencies [a571361]
- Updated dependencies [d739511]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/icon@6.3.0
  - @leafygreen-ui/hooks@3.0.0
  - @leafygreen-ui/box@2.1.2
  - @leafygreen-ui/icon-button@6.1.2
  - @leafygreen-ui/leafygreen-provider@1.1.2
  - @leafygreen-ui/popover@5.1.2

## 7.0.3

### Patch Changes

- e8f5376: Ensures that only props that are of type `string` are recognized as being passed to the `href` prop.
- Updated dependencies [e8f5376]
- Updated dependencies [4873650]
  - @leafygreen-ui/box@2.1.1
  - @leafygreen-ui/icon@6.2.0
  - @leafygreen-ui/icon-button@6.1.1

## 7.0.2

### Patch Changes

- 083eec3: Remove usage of `Element` in Node target builds that was preventing rendering the component in SSR contexts.
- Updated dependencies [083eec3]
- Updated dependencies [083eec3]
- Updated dependencies [27f8ea1]
- Updated dependencies [27f8ea1]
  - @leafygreen-ui/popover@5.1.1
  - @leafygreen-ui/lib@4.5.1
  - @leafygreen-ui/icon@6.1.2
  - @leafygreen-ui/icon-button@6.1.0

## 7.0.1

### Patch Changes

- 0593116: Uses enhanced `ExtendableBox` type to set smarter default `as` component in `MenuItem` and `SubMenu`
- Updated dependencies [0593116]
  - @leafygreen-ui/box@2.1.0

## 7.0.0

### Major Changes

- 1d24966: Makes `@leafygreen-ui/leafygreen-provider` a peer dependency to ensure that components use hooks from the same version of the provider as what's installed.

## 6.0.14

### Patch Changes

- eba8391: Component now extends `Box` in order to enforce stronger typings
- Updated dependencies [06fbf05]
- Updated dependencies [eba8391]
- Updated dependencies [eba8391]
  - @leafygreen-ui/popover@5.1.0
  - @leafygreen-ui/box@2.0.0
  - @leafygreen-ui/icon@6.1.1
  - @leafygreen-ui/icon-button@6.0.1

## 6.0.13

### Patch Changes

- 1d86d56: Imports Glyphs directly, rather than importing the entire Icon package, when Glyph components are used
- Updated dependencies [1d86d56]
- Updated dependencies [1d86d56]
  - @leafygreen-ui/icon@6.1.0
  - @leafygreen-ui/icon-button@6.0.0

## 6.0.12

### Patch Changes

- Updated dependencies [6fc022e]
  - @leafygreen-ui/icon@6.0.0
  - @leafygreen-ui/icon-button@5.0.4

## 6.0.11

### Patch Changes

- 05779a1: Upgrades `react-transition-group` to 4.4.1 which removes all React `StrictMode` warnings, making these components `StrictMode` safe.
- Updated dependencies [2fc4ef9]
- Updated dependencies [05779a1]
- Updated dependencies [e857861]
- Updated dependencies [cf6167e]
  - @leafygreen-ui/icon@5.2.0
  - @leafygreen-ui/popover@5.0.2
  - @leafygreen-ui/icon-button@5.0.3

## 6.0.10

### Patch Changes

- a11b521: Fixes issue with SubMenu, such that open is now set by Menu when the Menu itself is open

## 6.0.9

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards
- Updated dependencies [2a03117]
- Updated dependencies [c812eb3]
  - @leafygreen-ui/icon-button@5.0.2
  - @leafygreen-ui/leafygreen-provider@1.1.1
  - @leafygreen-ui/popover@5.0.1
  - @leafygreen-ui/icon@5.1.0

## 6.0.8

### Patch Changes

- 0391d01: Fixes style bug when MenuItem is focused and rendered as anchor tag
- Updated dependencies [2176b77]
  - @leafygreen-ui/popover@5.0.0

## 6.0.7

### Patch Changes

- 75c0693: Upgrades workspace dependencies
- Updated dependencies [75c0693]
  - @leafygreen-ui/icon@5.0.3
  - @leafygreen-ui/palette@2.0.1
  - @leafygreen-ui/popover@4.0.1
  - @leafygreen-ui/icon-button@5.0.1

## 6.0.6

### Patch Changes

- Updated dependencies [5aafd72]
  - @leafygreen-ui/icon-button@5.0.0
  - @leafygreen-ui/icon@5.0.2
  - @leafygreen-ui/lib@4.4.1

## 6.0.5

### Patch Changes

- 64c03e7: Fixes SubMenuIcon padding to account for change in size of xlarge glyphs
- Updated dependencies [bc47b13]
- Updated dependencies [1b298cc]
  - @leafygreen-ui/popover@4.0.0
  - @leafygreen-ui/hooks@2.1.0

## 6.0.4

### Patch Changes

- Updated dependencies [4c268a5]
- Updated dependencies [94ed125]
  - @leafygreen-ui/icon@5.0.0
  - @leafygreen-ui/leafygreen-provider@1.1.0
  - @leafygreen-ui/icon-button@4.1.5

## 6.0.3

### Patch Changes

- dd342f5: MenuItem component renders any ReactElement description, rather than only strings.
- Updated dependencies [e1568c6]
  - @leafygreen-ui/icon@4.3.0
  - @leafygreen-ui/icon-button@4.1.4

## 6.0.2

### Patch Changes

- cda96b2: Updates text color when MenuItem is focused

## 6.0.1

### Patch Changes

- 347bcf6: Fix typings in Menu component
- Updated dependencies [347bcf6]
- Updated dependencies [704e25c]
  - @leafygreen-ui/icon-button@4.1.1
  - @leafygreen-ui/lib@4.3.1

## 6.0.0

### Major Changes

- 786ccf1:
  - Changes `glyph` prop from `string` to `React.ReactElement` in SubMenu component
  - Adds `glyph` and `size` props to MenuItem component

### Minor Changes

- 690888a: Adds `spacing` prop to Menu component

### Patch Changes

- Updated dependencies [ac5c473]
  - @leafygreen-ui/hooks@2.0.1

## 5.1.0

### Minor Changes

- fabc1c9:
  - MenuItems accept an `as` prop to determine what component to render as.
  - Introduces `SubMenu` components with stronger accessibility logic

### Patch Changes

- Updated dependencies [0a75bd6]
- Updated dependencies [fabc1c9]
- Updated dependencies [fabc1c9]
- Updated dependencies [232cf52]
  - @leafygreen-ui/icon-button@4.0.0
  - @leafygreen-ui/lib@4.2.0
  - @leafygreen-ui/popover@3.0.2

## 5.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Minor Changes

- 5c9202d: Introduces support for LeafyGreenProvider for improved focus state management

### Patch Changes

- 31f6bfd: Removes deprecated `title` prop from the Menu component propTypes
- Updated dependencies [5c9202d]
- Updated dependencies [464c09d]
  - @leafygreen-ui/leafygreen-provider@1.0.0
  - @leafygreen-ui/hooks@2.0.0
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/palette@2.0.0
  - @leafygreen-ui/popover@3.0.0

## 4.0.3

### Patch Changes

- 8c2e838: Updates styles to fix bugs on Safari and Firefox

## 4.0.2

### Patch Changes

- ad74307: Changes default behavior in MenuItems with anchor tags, such that the default is to `target="\_self"`, and ensures ability of consumer to override the default
- ff55bb5: Updates anchor styles to minimize overrides
- baf45f6: Allows target and rel props to be passed to MenuItem, when MenuItem is a link

## 4.0.1

### Patch Changes

- 2f9a300: Uses exported keyMap from lib
- 759523f: Adds border-box property to MenuItems and update documentation
- Updated dependencies [2f9a300]
  - @leafygreen-ui/lib@3.2.0

## 4.0.0

### Major Changes

- 9c45cb4: Traps focus within the Menu when Menu is open and keyboard navigation is now accessible
- f6b6b7a: No longer renders children of Popover component to the DOM when the Popover is closed

### Patch Changes

- 319fb82: Updates PropTypes based on eslint updates
- Updated dependencies [9c45cb4]
- Updated dependencies [f6b6b7a]
  - @leafygreen-ui/lib@3.1.0
  - @leafygreen-ui/popover@2.0.0

## 3.0.3

- Updated dependencies [12fb220]:
  - @leafygreen-ui/popover@1.2.0

## 3.0.2

### Patch Changes

- 3a24668: Replaces existing Escape handling with new useEscapeKey hook

## 3.0.1

### Patch Changes

- aaa895e:
  - Fixes storybook, such that it reflects a generic Menu rather than MongoMenu
  - Fixes bug with `disabled` MenuItem styles

## 3.0.0

### Major Changes

- 23c7d20: Changes the semantic HTML for MenuItem component, as well as updates the styles of the entire Menu, which involves removing @leafygreen-ui/theme as a dependency and adding @leafygreen-ui/palette.

### Patch Changes

- ec4d8da: Removes `role='menu'` from MenuGroup in order to make component accessible

## 2.0.0

### Major Changes

- 7825641:
  - Updates Menu API, such that the controlled version now accepts `open` and `setOpen` props. Using `setOpen` allows leafygreen to handle backdrop clicks and Escape key-presses for consuming applications.
  - Previously the prop that controlled whether or not the Menu component would appear as open was called `active`, now the prop's name is `open`.
  - Adds `setOpen` prop to allow leafygreen to help a consuming application, using the controlled api, close `Menu` component when backdrop is clicked or escape key is pressed.
  - Adds `shouldClose` prop, so that consuming application can opt-out of default closing behavior.
