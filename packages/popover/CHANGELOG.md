# @leafygreen-ui/popover

## 13.0.0

### Major Changes

- 274d7e1a7: Removes prop-types from LeafyGreen UI

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/portal@6.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/hooks@8.3.2
  - @leafygreen-ui/tokens@2.11.1

## 12.0.0

### Major Changes

- 04bb887c0: [LG-4445](https://jira.mongodb.org/browse/LG-4445): Replaces `usePortal` prop with `renderMode` prop with values of `'inline'`, `'portal'`, and `'top-layer'`. `renderMode="inline"` and `renderMode="portal"` are deprecated, and all popover elements should migrate to using the top layer. The old default was `usePortal=true`, and the new default is `renderMode="top-layer"`.

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

  {
    /* all LG popover elements will render in top layer */
  }
  <LeafyGreenProvider forceUseTopLayer={true}>
    <Popover renderMode="inline" />
    <Combobox renderMode="portal" />
    <Select renderMode="inline" />
  </LeafyGreenProvider>;
  ```

### Patch Changes

- Updated dependencies [04bb887c0]
  - @leafygreen-ui/hooks@8.3.0
  - @leafygreen-ui/leafygreen-provider@3.2.0
- Updated dependencies [117a463f8]
  - @leafygreen-ui/lib@13.8.1

## 11.4.0

### Minor Changes

- 02e1d77e: Reclassify `portalRef` prop as part of `PortalControlProps` in `Popover` component
  [LG-3988](https://jira.mongodb.org/browse/LG-3988)

### Patch Changes

- Updated dependencies [7bc4fcde]
- Updated dependencies [7bc4fcde]
  - @leafygreen-ui/lib@13.5.0
  - @leafygreen-ui/tokens@2.8.0

## 11.3.1

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/hooks@8.1.3
  - @leafygreen-ui/portal@5.1.1
  - @leafygreen-ui/tokens@2.5.2

## 11.3.0

### Minor Changes

- 8ad4fdbc: Manually forward `portalRef` to `Portal` component and expose `portalRef` in `Popover` component
  [LG-3988](https://jira.mongodb.org/browse/LG-3988)

### Patch Changes

- e487fb24: Renames story files from `.story.tsx` to `.stories.tsx`
- Updated dependencies [8ad4fdbc]
- Updated dependencies [5ee54143]
- Updated dependencies [e487fb24]
  - @leafygreen-ui/portal@5.1.0
  - @leafygreen-ui/tokens@2.5.1
  - @leafygreen-ui/hooks@8.1.2

## 11.2.2

### Patch Changes

- 0e49ec9c: Adds `@types/react-transition-group` as a dependency of `Popover`. This ensures that any components extending `PopoverProps` are typed correctly.

## 11.2.1

### Patch Changes

- ffd11f24: Exports `ChildrenFunctionParameters` type
- Updated dependencies [7f38e78a]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
  - @leafygreen-ui/leafygreen-provider@3.1.11
  - @leafygreen-ui/hooks@8.1.0
  - @leafygreen-ui/lib@13.2.0

## 11.2.0

### Minor Changes

- 99848a0f: Adds `onEnter*` and `onExit*` callbacks to Popover. These callbacks are provided to the internal React Transition element. See [ReactTransitionGroup docs](https://reactcommunity.org/react-transition-group/transition#Transition-prop-onEnter) for more details.

### Patch Changes

- 99848a0f: Toggles `isPopoverOpen` in `PopoverContext` in the `onEntered` and `onExited` lifecycle callbacks, to better reflect the true state of the popover state
- Updated dependencies [99848a0f]
  - @leafygreen-ui/lib@13.1.0

## 11.1.1

### Patch Changes

- Updated dependencies [dd4f3da8]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.10
  - @leafygreen-ui/portal@5.0.3

## 11.1.0

### Minor Changes

- f8c77c5d: Exports a unique `contentClassName` from Popover to enable styling of Popover inner content wrapper
- 827060f6: Allows Popover to accept a `ref`

## 11.0.18

### Patch Changes

- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/portal@5.0.2

## 11.0.17

### Patch Changes

- Updated dependencies [3fe03b50]
- Updated dependencies [fd907503]
  - @leafygreen-ui/tokens@2.2.0
  - @leafygreen-ui/hooks@8.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.8
  - @leafygreen-ui/portal@5.0.1

## 11.0.16

### Patch Changes

- 4fcf2e94: Bumps `react-transition-group` to `^4.4.5`.
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/portal@5.0.0
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.7

## 11.0.15

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/portal@4.1.7
  - @leafygreen-ui/tokens@2.1.4

## 11.0.14

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/hooks@7.7.7
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/portal@4.1.6
  - @leafygreen-ui/tokens@2.1.3

## 11.0.13

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/portal@4.1.5
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/lib@10.4.1

## 11.0.12

### Patch Changes

- 76161cf0: Creates `getJustify` and `getAlign` test utils
- 76161cf0: Updates stories for Chromatic testing
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
- Updated dependencies [735342e9]
- Updated dependencies [76161cf0]
- Updated dependencies [76161cf0]
  - @leafygreen-ui/lib@10.4.0
  - @leafygreen-ui/hooks@7.7.5
  - @leafygreen-ui/portal@4.1.4
  - @leafygreen-ui/tokens@2.1.1

## 11.0.11

### Patch Changes

- 63b2deb0b: Upgrade button to v20.1.1

## 11.0.10

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- Updated dependencies [d2ce54e2f]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/portal@4.1.3

## 11.0.9

### Patch Changes

- 8ece56980: Minor CSS updates to `react-transition-group` `exiting` styles.
- Updated dependencies [73cbbd02c]
- Updated dependencies [8ece56980]
- Updated dependencies [32b3d3146]
  - @leafygreen-ui/tokens@2.1.0
  - @leafygreen-ui/hooks@7.7.2

## 11.0.8

### Patch Changes

- ce0fcb3f6: Excludes `children` from story controls
- Updated dependencies [55d33e435]
- Updated dependencies [cf00160ec]
- Updated dependencies [ce0fcb3f6]
- Updated dependencies [111b680c5]
- Updated dependencies [77320a6b8]
  - @leafygreen-ui/lib@10.3.3
  - @leafygreen-ui/portal@4.1.2
  - @leafygreen-ui/tokens@2.0.3

## 11.0.7

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/portal@4.1.1
  - @leafygreen-ui/tokens@2.0.2

## 11.0.6

### Patch Changes

- 134f370a4: Renders a `span` instead of a `div` inside `Popover` to prevent `validateDOMNesting` warnings. Warnings will still show up if `usePortal` is `false`.

## 11.0.5

### Patch Changes

- 64eee134d: TSDoc: Updates some exported TSDoc interfaces. Storybook: Updates story files.
- Updated dependencies [64eee134d]
  - @leafygreen-ui/lib@10.1.0

## 11.0.4

### Patch Changes

- Updated dependencies [741cdd408]
- Updated dependencies [b24b21462]
  - @leafygreen-ui/tokens@2.0.0
  - @leafygreen-ui/portal@4.0.9

## 11.0.3

### Patch Changes

- a9b66c29b: Storybook: uses LG button in story. Sets default story

## 11.0.2

### Patch Changes

- b7f7a4c95: Updates package dependencies & devDependencies, and ensures each package is appropriately listed. Ensures `tsconfig` has no circular dependencies
- Updated dependencies [b7f7a4c95]
  - @leafygreen-ui/portal@4.0.8
  - @leafygreen-ui/tokens@1.4.1

## 11.0.1

### Patch Changes

- ae5421cf6: Updates components to use internal transition tokens
- Updated dependencies [ae5421cf6]
  - @leafygreen-ui/tokens@1.4.0

## 11.0.0

### Patch Changes

- Updated dependencies [b9b09a86]
  - @leafygreen-ui/leafygreen-provider@3.1.0

## 10.0.1

### Patch Changes

- Updated dependencies [f2d63a60]
  - @leafygreen-ui/lib@10.0.0
  - @leafygreen-ui/leafygreen-provider@3.0.1
  - @leafygreen-ui/portal@4.0.7

## 10.0.0

### Patch Changes

- Updated dependencies [e399f1b9]
- Updated dependencies [e399f1b9]
  - @leafygreen-ui/leafygreen-provider@3.0.0

## 9.1.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/hooks@7.3.3
  - @leafygreen-ui/leafygreen-provider@2.3.5
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/portal@4.0.6

## 9.1.0

### Minor Changes

- 3690df49: Updates TypeScript annotations, type structures and export format of some components

### Patch Changes

- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [58a5a05e]
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/hooks@7.3.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/portal@4.0.5

## 9.0.1

### Patch Changes

- 1e708bd3: Switch to `getBoundingClientRect` to get reference elements width
- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/hooks@7.3.1
  - @leafygreen-ui/leafygreen-provider@2.3.3
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/portal@4.0.4

## 9.0.0

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/leafygreen-provider@2.3.0

## 8.0.1

### Patch Changes

- 3e7c00db: Adds back transition to popover open. Uses `getComputedStyle` to get content width instead of `getBoundingClientRect` and `offsetWidth`.

## 8.0.0

### Major Changes

- e13d2487: Moving leafygreen-provider to peerDependencies.
- Updated dependencies [5f28fce1]
  - @leafygreen-ui/leafygreen-provider@2.2.0

## 7.2.3

### Patch Changes

- ef84b5fd: Fix positioning when reference element is aligned to the right edge of the container and also fixes the width of justify fit element inside a scrollContainer
- Updated dependencies [2cf1bc4a]
  - @leafygreen-ui/lib@9.2.1

## 7.2.2

### Patch Changes

- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/portal@4.0.0
  - @leafygreen-ui/leafygreen-provider@2.1.3

## 7.2.1

### Patch Changes

- Updated dependencies [047c1930]
- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/hooks@7.0.0
  - @leafygreen-ui/leafygreen-provider@2.1.2
  - @leafygreen-ui/portal@3.1.3

## 7.2.0

### Minor Changes

- 857a680a: Adds support for positioning popover elements relative to elements within a scroll container other than the window.
  Adds support for setting z-index on popover elements with the `zIndex` prop.

### Patch Changes

- Updated dependencies [857a680a]
- Updated dependencies [857a680a]
  - @leafygreen-ui/portal@3.1.2
  - @leafygreen-ui/leafygreen-provider@2.1.0

## 7.1.4

### Patch Changes

- Updated dependencies [90321b36]
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/portal@3.1.1

## 7.1.3

### Patch Changes

- 1ed17f68: Updates lodash to 4.17.21, as there's a vulnerability in 4.17.20 that's been resolved in 4.17.21
- Updated dependencies [1ed17f68]
  - @leafygreen-ui/hooks@6.0.1

## 7.1.2

### Patch Changes

- dca5605b: Fixes bug where the border of the popover could be clipped

## 7.1.1

### Patch Changes

- a6360ea1: Fixes issue where Popover used without a portal did not animate from the correct direction when appearing

## 7.1.0

### Minor Changes

- c18f16e6: Improves compatibility with React v17

### Patch Changes

- Updated dependencies [c18f16e6]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/hooks@6.0.0
  - @leafygreen-ui/lib@6.1.1

## 7.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
  - @leafygreen-ui/hooks@5.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/portal@3.0.1

## 7.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/hooks@5.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0
  - @leafygreen-ui/portal@3.0.0

## 6.0.0

### Major Changes

- 6e210765: Fixes issue where under certain implementations of Popover, an infinite loop would occur. This fix is potentially breaking due to a change in the DOM.

## 5.2.3

### Patch Changes

- d5d40791: Pin lodash version to latest to include fix for [prototype pollution attack vulnerability.](https://hackerone.com/reports/712065)
- Updated dependencies [d5d40791]
  - @leafygreen-ui/hooks@4.2.1

## 5.2.2

### Patch Changes

- 8c867bb: Reduces server side effect warnings
- Updated dependencies [e599707]
- Updated dependencies [8c867bb]
  - @leafygreen-ui/hooks@4.2.0

## 5.2.1

### Patch Changes

- 290c9fc: Fixes rendering bug

## 5.2.0

### Minor Changes

- 4a27db7: Popover now accepts an onClick prop

### Patch Changes

- Updated dependencies [2c09c48]
- Updated dependencies [add8745]
  - @leafygreen-ui/hooks@4.1.0

## 5.1.4

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/hooks@4.0.1
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2
  - @leafygreen-ui/portal@2.2.1

## 5.1.3

### Patch Changes

- Updated dependencies [fa55b3d]
- Updated dependencies [95b4949]
  - @leafygreen-ui/hooks@4.0.0
  - @leafygreen-ui/portal@2.2.0

## 5.1.2

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
- Updated dependencies [d739511]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/hooks@3.0.0
  - @leafygreen-ui/portal@2.1.3

## 5.1.1

### Patch Changes

- 083eec3: Restore TS <3.8 compatibility that was broken from using the `import type` syntax.
- 083eec3: Remove usage of `Element` in Node target builds that was preventing rendering the component in SSR contexts.
- Updated dependencies [083eec3]
  - @leafygreen-ui/portal@2.1.2
  - @leafygreen-ui/lib@4.5.1

## 5.1.0

### Minor Changes

- 06fbf05: Popover allows setting a `portalClassName` prop

## 5.0.2

### Patch Changes

- 05779a1: Upgrades `react-transition-group` to 4.4.1 which removes all React `StrictMode` warnings, making these components `StrictMode` safe.

## 5.0.1

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards

## 5.0.0

### Major Changes

- 2176b77: Refactors Popover to only use element positions relative to the viewport for calculating viewport collisions, and use element positions relative to the document for calculating the element positioning itself.

## 4.0.1

### Patch Changes

- 75c0693: Upgrades workspace dependencies
- Updated dependencies [75c0693]
  - @leafygreen-ui/palette@2.0.1

## 4.0.0

### Major Changes

- bc47b13: Added Justify.Fit to tooltip/popover, and Align.CenterHorizontal and Align.CenterVertical to popover

  For direct consumers of <Popover>, the function-as-a-child pattern now passes `align` and `justify` params,
  and the `justification` param/enum has been removed. This should be the only breaking change in this release.

### Patch Changes

- Updated dependencies [1b298cc]
  - @leafygreen-ui/hooks@2.1.0

## 3.0.2

### Patch Changes

- 232cf52: `React-transition-group` now dependency instead of peer dependency
- Updated dependencies [fabc1c9]
  - @leafygreen-ui/lib@4.2.0

## 3.0.1

### Patch Changes

- 69792b8: Make `react-transition-group` an external dependency of the build
- Updated dependencies [11b2217]
  - @leafygreen-ui/lib@4.1.0

## 3.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/hooks@2.0.0
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/portal@2.0.0
  - @leafygreen-ui/theme@2.0.0

## 2.0.0

### Major Changes

- f6b6b7a: Children of Popover are no longer rendered to the DOM when the Popover is closed

### Patch Changes

- Updated dependencies [9c45cb4]
- Updated dependencies [319fb82]
  - @leafygreen-ui/lib@3.1.0
  - @leafygreen-ui/portal@1.1.8

## 1.2.0

### Minor Changes

- 12fb220: Accepts children as a function, with signature `({alignment, justification, referenceElementPosition }) => {}` or `React.Element`

- Updated dependencies [563dc2e]:
  - @leafygreen-ui/portal@1.1.7
