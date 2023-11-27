# @leafygreen-ui/tooltip

## 11.0.0

### Major Changes

- 783add80: Exclude `'center-vertical'` and `'center-horizontal'` from Align type.

### Patch Changes

- Updated dependencies [e3f4d9ce]
- Updated dependencies [89f439e8]
- Updated dependencies [c41752d2]
- Updated dependencies [89332190]
  - @leafygreen-ui/typography@18.0.1
  - @leafygreen-ui/hooks@8.0.1
  - @leafygreen-ui/icon@11.25.0

## 10.1.0

### Minor Changes

- 7c3e6d39: Adds `initialOpen` prop, which allows consuming applications to control the initial state of an uncontrolled implementation of the component.

### Patch Changes

- Updated dependencies [dd4f3da8]
- Updated dependencies [90053e16]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/typography@18.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.10
  - @leafygreen-ui/popover@11.1.1

## 10.0.11

### Patch Changes

- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/popover@11.0.18
  - @leafygreen-ui/typography@17.0.1

## 10.0.10

### Patch Changes

- Updated dependencies [a5770c15]
- Updated dependencies [c89d17a4]
  - @leafygreen-ui/typography@17.0.0

## 10.0.9

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

## 10.0.8

### Patch Changes

- 4fcf2e94: Adds the `setOpen()` state update inside `onMouseEnter` inside the [flushSync](https://react.dev/reference/react-dom/flushSync) callback to prevent batch updates in React 18. This addresses an issue where the tooltip would occasionally appear without a transition, particularly when hovering. This should have no impact on behavior in React 17.

  Adds an additional check, `isValidElement(trigger)` when checking if the trigger is a LeafyGreenUI Icon or Glyph component.

- 4fcf2e94: Updates `PopoverFunctionParameters` interface to use `PopoverAlign` alias.

  Omit `children` from `PopoverProps` since it was overriding `Tooltip` children.

- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/icon@11.22.2
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/popover@11.0.16
  - @leafygreen-ui/leafygreen-provider@3.1.7
  - @leafygreen-ui/typography@16.5.5

## 10.0.7

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/icon@11.22.1
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/popover@11.0.15
  - @leafygreen-ui/tokens@2.1.4
  - @leafygreen-ui/typography@16.5.4

## 10.0.6

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [f73807cf]
- Updated dependencies [31c09354]
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/icon@11.22.0
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/hooks@7.7.7
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/popover@11.0.14
  - @leafygreen-ui/tokens@2.1.3
  - @leafygreen-ui/typography@16.5.3

## 10.0.5

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/typography@16.5.2
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/popover@11.0.13
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/icon@11.20.1
  - @leafygreen-ui/lib@10.4.1

## 10.0.4

### Patch Changes

- 76161cf0: Minor fixes to stories
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
  - @leafygreen-ui/tokens@2.1.1
  - @leafygreen-ui/typography@16.5.1

## 10.0.3

### Patch Changes

- 63b2deb0b: Upgrade button to v20.1.1
- Updated dependencies [63b2deb0b]
  - @leafygreen-ui/popover@11.0.11

## 10.0.2

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- Updated dependencies [d2ce54e2f]
- Updated dependencies [75099c60b]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/icon@11.16.1
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/popover@11.0.10
  - @leafygreen-ui/typography@16.5.0

## 10.0.1

### Patch Changes

- a3a52e131: Bumps to use new `useIdAllocator` hook
- Updated dependencies [614f7617d]
- Updated dependencies [a3a52e131]
- Updated dependencies [614f7617d]
  - @leafygreen-ui/icon@11.15.0
  - @leafygreen-ui/hooks@7.7.3

## 10.0.0

### Major Changes

- 8ece56980: Adds a 500ms delay to `Tooltip` when opened. Also applies new file structure internally.

### Patch Changes

- 32b3d3146: Bumps to use new `useIdAllocator` hook
- 73cbbd02c: Uses fontWeight token from `@leafygreen-ui/tokens`
- Updated dependencies [73cbbd02c]
- Updated dependencies [8ece56980]
- Updated dependencies [83fc5b31b]
- Updated dependencies [9bcf8b925]
- Updated dependencies [8ece56980]
- Updated dependencies [32b3d3146]
- Updated dependencies [73cbbd02c]
  - @leafygreen-ui/tokens@2.1.0
  - @leafygreen-ui/popover@11.0.9
  - @leafygreen-ui/icon@11.14.0
  - @leafygreen-ui/typography@16.4.0
  - @leafygreen-ui/hooks@7.7.2

## 9.1.8

### Patch Changes

- 55d33e435: Update to BaseFontSize prop control for .design live example
- Updated dependencies [55d33e435]
- Updated dependencies [07db42330]
- Updated dependencies [55d33e435]
- Updated dependencies [cf00160ec]
- Updated dependencies [ce0fcb3f6]
- Updated dependencies [111b680c5]
- Updated dependencies [77320a6b8]
  - @leafygreen-ui/lib@10.3.3
  - @leafygreen-ui/palette@4.0.4
  - @leafygreen-ui/typography@16.3.0
  - @leafygreen-ui/popover@11.0.8
  - @leafygreen-ui/tokens@2.0.3

## 9.1.7

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/icon@11.13.1
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/popover@11.0.7
  - @leafygreen-ui/tokens@2.0.2
  - @leafygreen-ui/typography@16.2.1

## 9.1.6

### Patch Changes

- Updated dependencies [5b036515e]
- Updated dependencies [26e341a0b]
- Updated dependencies [997121cc3]
- Updated dependencies [eb0cc4498]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/icon@11.12.5
  - @leafygreen-ui/typography@16.1.0
  - @leafygreen-ui/tokens@2.0.1

## 9.1.5

### Patch Changes

- fc85e3f7a: Fix README formatting
- Updated dependencies [2e8a572db]
- Updated dependencies [4ccc353e7]
- Updated dependencies [4ccc353e7]
  - @leafygreen-ui/lib@10.2.1

## 9.1.4

### Patch Changes

- bf2fedf6d: Version bumps lib
- Updated dependencies [ffb99f417]
- Updated dependencies [bf2fedf6d]
- Updated dependencies [b7a29ea38]
  - @leafygreen-ui/hooks@7.5.0
  - @leafygreen-ui/leafygreen-provider@3.1.1
  - @leafygreen-ui/typography@16.0.1

## 9.1.3

### Patch Changes

- b24b21462: Storybook: Updates story files to be on par with existing mongodb.design examples
- Updated dependencies [050f1f8a9]
- Updated dependencies [741cdd408]
- Updated dependencies [866144167]
- Updated dependencies [c82ed35d5]
- Updated dependencies [b24b21462]
  - @leafygreen-ui/icon@11.12.4
  - @leafygreen-ui/tokens@2.0.0
  - @leafygreen-ui/typography@16.0.0
  - @leafygreen-ui/palette@3.4.7
  - @leafygreen-ui/popover@11.0.4

## 9.1.2

### Patch Changes

- 5865ddf99: Fixes a bug where, when set to trigger on click, the Tooltip could close immediately
- Updated dependencies [a9b66c29b]
  - @leafygreen-ui/popover@11.0.3

## 9.1.1

### Patch Changes

- c736a5bd5: Storybook updates: Sets Tooltip trigger in storybook `args`. Disables `open` control on Basic story
- Updated dependencies [405636249]
- Updated dependencies [53d77f55d]
  - @leafygreen-ui/hooks@7.4.0
  - @leafygreen-ui/typography@15.3.0

## 9.1.0

### Minor Changes

- a0d6638c4: Adds baseFontSize prop to Tooltip component, so that consuming applications are able to override font size from the LeafyGreen Provider

### Patch Changes

- Updated dependencies [95bd93ef9]
- Updated dependencies [3bb4b7506]
- Updated dependencies [a0d6638c4]
  - @leafygreen-ui/icon@11.12.3
  - @leafygreen-ui/typography@15.2.0

## 9.0.3

### Patch Changes

- b7f7a4c95: Updates package dependencies & devDependencies, and ensures each package is appropriately listed. Ensures `tsconfig` has no circular dependencies
- Updated dependencies [b7f7a4c95]
  - @leafygreen-ui/icon@11.12.2
  - @leafygreen-ui/palette@3.4.5
  - @leafygreen-ui/popover@11.0.2
  - @leafygreen-ui/tokens@1.4.1
  - @leafygreen-ui/typography@15.1.1

## 9.0.2

### Patch Changes

- 0020689d0: Fixes failing tests. Console warning will appear if an Icon is passed as a trigger

## 9.0.1

### Patch Changes

- ed0e425e5: Adds `polished` as an explicit dependency
- Updated dependencies [ae5421cf6]
- Updated dependencies [4b4c2d27d]
- Updated dependencies [6a266b813]
- Updated dependencies [1a335d0b2]
- Updated dependencies [ba97d1ef7]
- Updated dependencies [ae5421cf6]
  - @leafygreen-ui/tokens@1.4.0
  - @leafygreen-ui/icon@11.12.1
  - @leafygreen-ui/typography@15.1.0
  - @leafygreen-ui/popover@11.0.1

## 9.0.0

### Patch Changes

- 95c9fb0d: Refactors tests to ensure function & class components work as a click & hover trigger
- Updated dependencies [07b3c797]
- Updated dependencies [07b3c797]
- Updated dependencies [b9b09a86]
  - @leafygreen-ui/typography@15.0.0
  - @leafygreen-ui/leafygreen-provider@3.1.0
  - @leafygreen-ui/popover@11.0.0

## 8.0.1

### Patch Changes

- Updated dependencies [209f77ed]
- Updated dependencies [f2d63a60]
  - @leafygreen-ui/icon@11.12.0
  - @leafygreen-ui/lib@10.0.0
  - @leafygreen-ui/leafygreen-provider@3.0.1
  - @leafygreen-ui/popover@10.0.1
  - @leafygreen-ui/typography@14.0.1

## 8.0.0

### Minor Changes

- 7162f1ab: Establishes a new DarkMode context inside tooltip. Now any LeafyGreen components that use dark mode context will appear correctly inside a tooltip

### Patch Changes

- Updated dependencies [e399f1b9]
- Updated dependencies [e399f1b9]
  - @leafygreen-ui/leafygreen-provider@3.0.0
  - @leafygreen-ui/popover@10.0.0
  - @leafygreen-ui/typography@14.0.0

## 7.1.3

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/hooks@7.3.3
  - @leafygreen-ui/icon@11.11.1
  - @leafygreen-ui/leafygreen-provider@2.3.5
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4
  - @leafygreen-ui/popover@9.1.1
  - @leafygreen-ui/tokens@1.3.4
  - @leafygreen-ui/typography@13.2.1

## 7.1.2

### Patch Changes

- dafe6be8: Adds 'onClose' prop which is triggered when the tooltip is closed internally
- 3690df49: Updates Storybook configs
- 3690df49: Updates `tsdoc.json` file
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [58a5a05e]
  - @leafygreen-ui/icon@11.11.0
  - @leafygreen-ui/popover@9.1.0
  - @leafygreen-ui/typography@13.2.0
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/hooks@7.3.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/palette@3.4.3
  - @leafygreen-ui/tokens@1.3.3

## 7.1.1

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- 1e708bd3: Add `width: max-content` to tooltip to prevent early wrapping of content
- Updated dependencies [7caa1c3e]
- Updated dependencies [1e708bd3]
- Updated dependencies [e39d8469]
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/icon@11.10.2
  - @leafygreen-ui/popover@9.0.1
  - @leafygreen-ui/typography@13.1.2
  - @leafygreen-ui/emotion@4.0.1
  - @leafygreen-ui/hooks@7.3.1
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2
  - @leafygreen-ui/tokens@1.3.2

## 7.1.0

### Minor Changes

- 65c86281: Consuming darkMode from the LeafyGreenProvider if the darkMode prop is not set

### Patch Changes

- 4ad8cbc0: Adds missing @leafygreen-ui/typography dependency to package.json.
- 9cb53590: Word break bug fixed for Tooltip
- Updated dependencies [65c86281]
  - @leafygreen-ui/typography@13.1.0

## 7.0.4

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/popover@9.0.0

## 7.0.3

### Patch Changes

- f0a357e2: Minor updates to darkmode styles

## 7.0.2

### Patch Changes

- Updated dependencies [e13d2487]
- Updated dependencies [c48e943e]
- Updated dependencies [500d6c60]
  - @leafygreen-ui/popover@8.0.0
  - @leafygreen-ui/tokens@1.3.0
  - @leafygreen-ui/icon@11.9.0

## 7.0.1

### Patch Changes

- acd6919: Bumps dependency versions of palette & tokens
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
  - @leafygreen-ui/lib@9.2.0
  - @leafygreen-ui/icon@11.8.0
  - @leafygreen-ui/palette@3.3.2

## 7.0.0

### Major Changes

- ab1fd9e: - Updates tooltip for visual brand refresh.
  - Updates darkMode for Tooltip
  - Using `usePortal={false}` will set the tooltip to the width of the content using `max-content` (up to a `max-width` of 256px). You can override this behavior using `portalClassName`. (Override the max-width using `className` on the Tooltip)

## 6.3.1

### Patch Changes

- ddb50977: Fixes a bug where the event object was not accessible in the scope of a Tooltip triger element's `onClick` handler. Also preemptively ensures the same issue does not occur within other handlers on a Tooltip trigger
- Updated dependencies [f6e5655a]
- Updated dependencies [03388ff2]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/icon@11.3.0
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/popover@7.2.2
  - @leafygreen-ui/tokens@0.5.3

## 6.3.0

### Minor Changes

- 14fa2fdb: Tooltip accepts `refEl` which is passed to Popover component and helps determine content positioning

## 6.2.2

### Patch Changes

- Updated dependencies [047c1930]
- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/hooks@7.0.0
  - @leafygreen-ui/icon@11.1.1
  - @leafygreen-ui/popover@7.2.1
  - @leafygreen-ui/tokens@0.5.2

## 6.2.1

### Patch Changes

- Updated dependencies [faeb0ce0]
  - @leafygreen-ui/icon@11.0.0

## 6.2.0

### Minor Changes

- 857a680a: Adds support for positioning popover elements relative to elements within a scroll container other than the window.
  Adds support for setting z-index on popover elements with the `zIndex` prop.

### Patch Changes

- Updated dependencies [857a680a]
  - @leafygreen-ui/popover@7.2.0

## 6.1.9

### Patch Changes

- f41d6229: Removes `preventDefault` call from inside of Tooltip, such that tooltip components can contain interactive elements

## 6.1.8

### Patch Changes

- 46f5de0b: The eventListener attached to the document to listen for clicks to close a Tooltip when clicked was being called erroneously when the Tooltip's trigger was a React component. Previously, we were only checking to see if the target of the event was contained by the tooltip in order to determien whether or not to close the Tooltip when the backdrop was clicked. However, if the Tooltip's trigger is a React.Component the trigger is not a child of the tooltipNode, and therefore this check wasn't sufficient. Now, we are also ensuring that the trigger isn't included in the handleBackdropClick check, such that a tooltip isn't opened and then immediately closed by the handleBackdropClick function.
- ab581f34: Re-released components that were erroneously released without `.d.ts` files
- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/icon@10.2.1
  - @leafygreen-ui/popover@7.1.4
  - @leafygreen-ui/tokens@0.5.1

## 6.1.7

### Patch Changes

- Updated dependencies [ec27f36e]
  - @leafygreen-ui/icon@10.0.0

## 6.1.6

### Patch Changes

- 1ed17f68: Updates lodash to 4.17.21, as there's a vulnerability in 4.17.20 that's been resolved in 4.17.21
- Updated dependencies [1ed17f68]
  - @leafygreen-ui/hooks@6.0.1
  - @leafygreen-ui/popover@7.1.3

## 6.1.5

### Patch Changes

- 7cd81360: The tooltip notch no longer intercepts pointer events
- 04cbe342: Fixes several issues where Tooltips were not visually consistent with the Figma component.
- 55e3789c: Fixes the issue where the `aria-describedby` attribute was being set on the Tooltip trigger when the Tooltip is not visible.

## 6.1.4

### Patch Changes

- Updated dependencies [f805b772]
  - @leafygreen-ui/icon@9.0.0

## 6.1.3

### Patch Changes

- 2cb0d077: Fixes an issue with the Tooltip package by making the Icon package an explicit requirement
- Updated dependencies [ba56b1cc]
  - @leafygreen-ui/icon@8.0.0

## 6.1.2

### Patch Changes

- 2daf1808: Warns developer not to use a LeafyGreen UI Icon or Glyph component as a trigger, and instead suggests wrapping one of those components in another HTML tag so that the Tooltip can render properly.
- Updated dependencies [a6360ea1]
  - @leafygreen-ui/popover@7.1.1

## 6.1.1

### Patch Changes

- ee7923d3: Changes how we extend the types of HTMLElements, and standardizes how we document this across readmes
- Updated dependencies [ee7923d3]
  - @leafygreen-ui/lib@6.1.2

## 6.1.0

### Minor Changes

- c18f16e6: Improves compatibility with React v17

### Patch Changes

- 7359e552: Wraps text when it overflows the Tooltip container
- Updated dependencies [c18f16e6]
- Updated dependencies [c18f16e6]
- Updated dependencies [c9a0d89f]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/hooks@6.0.0
  - @leafygreen-ui/popover@7.1.0
  - @leafygreen-ui/palette@3.1.0
  - @leafygreen-ui/lib@6.1.1

## 6.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
- Updated dependencies [059ef833]
  - @leafygreen-ui/hooks@5.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/palette@3.0.1
  - @leafygreen-ui/popover@7.0.1
  - @leafygreen-ui/tokens@0.5.0

## 6.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/button@8.0.0
  - @leafygreen-ui/hooks@5.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0
  - @leafygreen-ui/popover@7.0.0
  - @leafygreen-ui/tokens@0.4.0

## 5.0.1

### Patch Changes

- Updated dependencies [6e210765]
  - @leafygreen-ui/popover@6.0.0

## 5.0.0

### Major Changes

- 483b8a2e: Deprecates `variant` prop in favor of `darkMode` prop to control whether or not the Tooltip appears in dark mode

### Patch Changes

- Updated dependencies [47846c77]
  - @leafygreen-ui/button@7.0.1

## 4.0.0

### Major Changes

- 6ab659c8: Tooltips are no longer affected by whether their trigger has an "href" property set.
- 6883ccd0: `Tooltip` typography previously relied on consumer application's styles. Now, Tooltip children are wrapped in LeafyGreen Body component.

### Minor Changes

- 3fed752e: Adds support for `spacing` prop

### Patch Changes

- d5d40791: Pin lodash version to latest to include fix for [prototype pollution attack vulnerability.](https://hackerone.com/reports/712065)
- Updated dependencies [3fed752e]
- Updated dependencies [6883ccd0]
- Updated dependencies [eda10121]
- Updated dependencies [d5d40791]
  - @leafygreen-ui/typography@4.3.0
  - @leafygreen-ui/button@7.0.0
  - @leafygreen-ui/hooks@4.2.1
  - @leafygreen-ui/popover@5.2.3

## 3.3.7

### Patch Changes

- e599707: Require lodash dependencies instead of inlining them.
- Updated dependencies [8c867bb]
- Updated dependencies [e599707]
- Updated dependencies [8c867bb]
  - @leafygreen-ui/popover@5.2.2
  - @leafygreen-ui/hooks@4.2.0

## 3.3.6

### Patch Changes

- 4a27db7: Clicks inside tooltip are now prevented from propagating to the tooltip's container.
- Updated dependencies [2c09c48]
- Updated dependencies [4a27db7]
- Updated dependencies [add8745]
  - @leafygreen-ui/hooks@4.1.0
  - @leafygreen-ui/popover@5.2.0

## 3.3.5

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/button@6.0.2
  - @leafygreen-ui/hooks@4.0.1
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2
  - @leafygreen-ui/popover@5.1.4

## 3.3.4

### Patch Changes

- 11ee447: Adds `enabled` to Tooltip PropTypes
- 6aadc0b: Make id generation deterministic using IdAllocator.create class. This improves the SSR compatibility of these components.
- Updated dependencies [6aadc0b]
  - @leafygreen-ui/lib@5.1.0

## 3.3.3

### Patch Changes

- Updated dependencies [fa55b3d]
  - @leafygreen-ui/hooks@4.0.0
  - @leafygreen-ui/popover@5.1.3

## 3.3.2

### Patch Changes

- a571361: Fixes issue where the tooltip notch would pe positioned incorrectly when tooltips are used with a large trigger.
- Updated dependencies [a571361]
- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
- Updated dependencies [d739511]
  - @leafygreen-ui/button@6.0.0
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/hooks@3.0.0
  - @leafygreen-ui/popover@5.1.2

## 3.3.1

### Patch Changes

- 083eec3: Restore TS <3.8 compatibility that was broken from using the `import type` syntax.
- Updated dependencies [083eec3]
- Updated dependencies [083eec3]
  - @leafygreen-ui/popover@5.1.1
  - @leafygreen-ui/lib@4.5.1

## 3.3.0

### Minor Changes

- 12bc8c3: Tooltip allows setting a `portalClassName` prop

### Patch Changes

- Updated dependencies [06fbf05]
  - @leafygreen-ui/popover@5.1.0

## 3.2.2

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards
- Updated dependencies [2a03117]
  - @leafygreen-ui/popover@5.0.1

## 3.2.1

### Patch Changes

- Updated dependencies [2176b77]
  - @leafygreen-ui/popover@5.0.0

## 3.2.0

### Minor Changes

- bc47b13: Added Justify.Fit to tooltip/popover, and Align.CenterHorizontal and Align.CenterVertical to popover

  For direct consumers of <Popover>, the function-as-a-child pattern now passes `align` and `justify` params,
  and the `justification` param/enum has been removed. This should be the only breaking change in this release.

### Patch Changes

- Updated dependencies [bc47b13]
- Updated dependencies [1b298cc]
  - @leafygreen-ui/popover@4.0.0
  - @leafygreen-ui/hooks@2.1.0

## 3.1.0

### Minor Changes

- ab1a1c1: Exposes `usePortal` prop

## 3.0.2

### Patch Changes

- ac5c473: Adds lodash as dependency
- Updated dependencies [ac5c473]
  - @leafygreen-ui/hooks@2.0.1

## 3.0.1

### Patch Changes

- fabc1c9: Conditionally enables `useEscapeKey` hook, to ensure that escapeKey events are not unintentionally blocked from propagating
- Updated dependencies [fabc1c9]
- Updated dependencies [232cf52]
  - @leafygreen-ui/lib@4.2.0
  - @leafygreen-ui/popover@3.0.2

## 3.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/hooks@2.0.0
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/palette@2.0.0
  - @leafygreen-ui/popover@3.0.0

## 2.0.2

### Patch Changes

- 13e3eab: Enables `trigger` prop to accept nested components
- Updated dependencies [319844d]
  - @leafygreen-ui/palette@1.1.1

## 2.0.1

### Patch Changes

- 50853ca: Upgrades dependencies

## 2.0.0

### Major Changes

- f6b6b7a: No longer renders Children of Popover to the DOM when the Popover is closed

### Patch Changes

- 319fb82: Updates PropTypes based on eslint updates
- Updated dependencies [9c45cb4]
- Updated dependencies [f6b6b7a]
  - @leafygreen-ui/lib@3.1.0
  - @leafygreen-ui/popover@2.0.0

## 1.0.0

### Major Changes

- 12fb220: Initial implementation of Tooltip component

- Updated dependencies [12fb220]:
  - @leafygreen-ui/popover@1.2.0
