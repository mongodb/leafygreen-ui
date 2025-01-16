# @leafygreen-ui/tabs

## 14.0.0

### Major Changes

- 274d7e1a7: Removes prop-types from LeafyGreen UI

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/typography@20.0.0
  - @leafygreen-ui/a11y@2.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/descendants@2.0.0
  - @leafygreen-ui/hooks@8.3.2
  - @leafygreen-ui/polymorphic@2.0.3
  - @leafygreen-ui/tokens@2.11.1

## 13.1.1

### Patch Changes

- bca3969cf: Removes incorrect `setSelectedd` prop. `setSelected` is the correct prop.

## 13.1.0

### Minor Changes

- 30f111498: [LG-4473](https://jira.mongodb.org/browse/LG-4473) Updates the `selected` and `setSelected` props to accept both strings and numbers. The string must match the text content from the `name` prop on the `Tab` component.

  ```js
    const [selectedTab, setSelectedTab] = useState<string | number>('Tab 4');

    return (
      <div>
        <Button onClick={() => setSelectedTab('Tab 2')}>
          Set second tab as active
        </Button>
        <Tabs
          selected={selectedTab}
          setSelected={setSelectedTab}
        >
          <Tab name="Tab 1">
            Content 1
          </Tab>
          <Tab name="Tab 2">
            Content 2
          </Tab>
          <Tab name="Tab 3">
            Content 3
          </Tab>
          <Tab name="Tab 4">
            Content 4
          </Tab>
        <Tabs>
      </div>
    );
  ```

### Patch Changes

- Updated dependencies [9776f5f42]
  - @leafygreen-ui/hooks@8.2.0

## 13.0.1

### Patch Changes

- e7bc12814: Adds more thorough test coverage for disabled inputs
- Updated dependencies [c1b8b633b]
- Updated dependencies [fe2483937]
  - @leafygreen-ui/hooks@8.1.4

## 13.0.0

### Major Changes

- d5cd7f552: [LG-4253](https://jira.mongodb.org/browse/LG-4253): Adds small size variant to tabs

  Additional styling updates:

  - [breaking] `inlineChildren` vertical alignment is centered and no longer requires a container element. Instead, pass in a fragment wrapping the children elements and use `inlineChildrenContainerClassName` to customize styling
  - Exports `inlineChildrenContainerClassName` for customizing div that contains `inlineChildren`
  - Extends bottom divider between inline children and visible tab panel

### Patch Changes

- Updated dependencies [94b4e7fa1]
  - @leafygreen-ui/typography@19.3.0

## 12.0.3

### Patch Changes

- 4c04aa0ee: Updates Tabs to use latest Descendants API
- Updated dependencies [4c04aa0ee]
- Updated dependencies [66e5665e8]
- Updated dependencies [4c04aa0ee]
- Updated dependencies [4c04aa0ee]
  - @leafygreen-ui/lib@13.7.0
  - @leafygreen-ui/tokens@2.10.0
  - @leafygreen-ui/descendants@1.0.0

## 12.0.2

### Patch Changes

- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [cfa830701]
- Updated dependencies [db2d1d12c]
- Updated dependencies [cfa830701]
  - @leafygreen-ui/lib@13.6.1
  - @leafygreen-ui/descendants@0.3.0
  - @leafygreen-ui/a11y@1.5.0
  - @leafygreen-ui/typography@19.2.1

## 12.0.1

### Patch Changes

- Updated dependencies [4fb369df7]
- Updated dependencies [7a901b954]
- Updated dependencies [7a901b954]
- Updated dependencies [7a901b954]
- Updated dependencies [659aa9eed]
- Updated dependencies [29d50edaa]
  - @leafygreen-ui/typography@19.2.0
  - @leafygreen-ui/polymorphic@2.0.0
  - @leafygreen-ui/lib@13.6.0
  - @leafygreen-ui/descendants@0.2.0
  - @leafygreen-ui/tokens@2.9.0

## 12.0.0

### Major Changes

- a29ec7d4: [LG-4087](https://jira.mongodb.org/browse/LG-4087)

  - Removes `@leafygreen-ui/portal` dependency
    - In previous versions, tabs and their corresponding panels do not render on the server and instead portal content in the respective containers after hydration
    - Moving forward, tabs and their corresponding panels render normally on the server and render content in the respective containers during initial render cycle
  - Adds `@leafygreen-ui/descendants` dependency
    - Handles relationships between `Tabs` component and `TabTitle` descendants
    - Handles relationships between `Tabs` component and `TabPanel` descendants
  - Replaces `@leafygreen-ui/box` with `@leafygreen-ui/polymorphic
    - Allows tab elements to render as any element or component
    - Note: it is recommended to continue to use a button or link for accessibility purposes
  - Adds `forceRenderAllTabPanels` to `Tabs` component. By default, tab panels conditionally render in the DOM. Setting this prop to `true` will:
    - Render all non-disabled tab panels in the DOM
    - Hide the non-selected tab panels with CSS using `display: none;`. This will also remove the non-selected tab panels from the accessibility tree
  - Adds fixed height to tabs
  - Exports class names to customize styling on containers
    - `tabListElementClassName` can be used to select tab list container
    - `tabPanelsElementClassName` can be used to select tab panels container
  - Adds `getAllTabPanelsInDOM` test util
  - Updates `getSelectedPanel` test util. It now checks CSS display property to get the selected panel

### Patch Changes

- Updated dependencies [7bc4fcde]
- Updated dependencies [7bc4fcde]
  - @leafygreen-ui/lib@13.5.0
  - @leafygreen-ui/tokens@2.8.0

## 11.2.0

### Minor Changes

- 4cfd6dd5: [LG-4250](https://jira.mongodb.org/browse/LG-4250)

  - Exports `getTestUtils`, a util to reliably interact with `LG Tabs` in a product test suite. For more details, check out the [README](https://github.com/mongodb/leafygreen-ui/tree/main/packages/tabs#test-harnesses)

### Patch Changes

- Updated dependencies [3364b542]
- Updated dependencies [0864a420]
- Updated dependencies [0864a420]
  - @leafygreen-ui/tokens@2.7.0
  - @leafygreen-ui/typography@19.1.1

## 11.1.15

### Patch Changes

- Updated dependencies [dfd6972c]
  - @leafygreen-ui/typography@19.0.0

## 11.1.14

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [7a0ff1be]
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/typography@18.3.0
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/box@3.1.9
  - @leafygreen-ui/lib@13.3.0
  - @leafygreen-ui/a11y@1.4.13
  - @leafygreen-ui/emotion@4.0.8
  - @leafygreen-ui/hooks@8.1.3
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/portal@5.1.1
  - @leafygreen-ui/tokens@2.5.2

## 11.1.13

### Patch Changes

- b708fe19: `inlineChildren` are now styled to attach to the bottom of the Tabs component
- Updated dependencies [e3f4d9ce]
- Updated dependencies [89f439e8]
  - @leafygreen-ui/typography@18.0.1
  - @leafygreen-ui/hooks@8.0.1

## 11.1.12

### Patch Changes

- Updated dependencies [dd4f3da8]
- Updated dependencies [90053e16]
  - @leafygreen-ui/lib@13.0.0
  - @leafygreen-ui/typography@18.0.0
  - @leafygreen-ui/a11y@1.4.11
  - @leafygreen-ui/leafygreen-provider@3.1.10
  - @leafygreen-ui/portal@5.0.3

## 11.1.11

### Patch Changes

- 324d9730: Updates the text color of dark mode active tabs from `green.base` to `gray.light2`
- Updated dependencies [324d9730]
  - @leafygreen-ui/typography@17.0.2

## 11.1.10

### Patch Changes

- 3a9b274d: Handles keyboard event based on the event's `key` property rather than its `keyCode` property
- Updated dependencies [3a9b274d]
  - @leafygreen-ui/lib@12.0.0
  - @leafygreen-ui/a11y@1.4.10
  - @leafygreen-ui/leafygreen-provider@3.1.9
  - @leafygreen-ui/portal@5.0.2
  - @leafygreen-ui/typography@17.0.1

## 11.1.9

### Patch Changes

- Updated dependencies [a5770c15]
- Updated dependencies [c89d17a4]
  - @leafygreen-ui/typography@17.0.0

## 11.1.8

### Patch Changes

- Updated dependencies [3fe03b50]
- Updated dependencies [fd907503]
  - @leafygreen-ui/tokens@2.2.0
  - @leafygreen-ui/hooks@8.0.0
  - @leafygreen-ui/a11y@1.4.9
  - @leafygreen-ui/leafygreen-provider@3.1.8
  - @leafygreen-ui/portal@5.0.1

## 11.1.7

### Patch Changes

- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
- Updated dependencies [4fcf2e94]
  - @leafygreen-ui/portal@5.0.0
  - @leafygreen-ui/lib@11.0.0
  - @leafygreen-ui/box@3.1.8
  - @leafygreen-ui/a11y@1.4.8
  - @leafygreen-ui/leafygreen-provider@3.1.7
  - @leafygreen-ui/typography@16.5.5

## 11.1.6

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.
- Updated dependencies [c11bbc29]
  - @leafygreen-ui/a11y@1.4.7
  - @leafygreen-ui/box@3.1.7
  - @leafygreen-ui/emotion@4.0.7
  - @leafygreen-ui/hooks@7.7.8
  - @leafygreen-ui/leafygreen-provider@3.1.6
  - @leafygreen-ui/lib@10.4.3
  - @leafygreen-ui/palette@4.0.7
  - @leafygreen-ui/portal@4.1.7
  - @leafygreen-ui/tokens@2.1.4
  - @leafygreen-ui/typography@16.5.4

## 11.1.5

### Patch Changes

- c15ee2ac: Fixes missing documentation file
- Updated dependencies [c15ee2ac]
  - @leafygreen-ui/a11y@1.4.6
  - @leafygreen-ui/box@3.1.6
  - @leafygreen-ui/emotion@4.0.6
  - @leafygreen-ui/hooks@7.7.7
  - @leafygreen-ui/leafygreen-provider@3.1.5
  - @leafygreen-ui/lib@10.4.2
  - @leafygreen-ui/palette@4.0.6
  - @leafygreen-ui/portal@4.1.6
  - @leafygreen-ui/tokens@2.1.3
  - @leafygreen-ui/typography@16.5.3

## 11.1.4

### Patch Changes

- 215268ff: Updates build tooling. No functional changes
- Updated dependencies [215268ff]
  - @leafygreen-ui/leafygreen-provider@3.1.4
  - @leafygreen-ui/typography@16.5.2
  - @leafygreen-ui/emotion@4.0.5
  - @leafygreen-ui/palette@4.0.5
  - @leafygreen-ui/portal@4.1.5
  - @leafygreen-ui/tokens@2.1.2
  - @leafygreen-ui/hooks@7.7.6
  - @leafygreen-ui/a11y@1.4.5
  - @leafygreen-ui/box@3.1.5
  - @leafygreen-ui/lib@10.4.1

## 11.1.3

### Patch Changes

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
  - @leafygreen-ui/typography@16.5.1

## 11.1.2

### Patch Changes

- 63b2deb0b: Upgrade button to v20.1.1

## 11.1.1

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x
- Updated dependencies [d2ce54e2f]
- Updated dependencies [75099c60b]
- Updated dependencies [d2ce54e2f]
- Updated dependencies [0cd471676]
  - @leafygreen-ui/box@3.1.4
  - @leafygreen-ui/hooks@7.7.4
  - @leafygreen-ui/leafygreen-provider@3.1.3
  - @leafygreen-ui/lib@10.3.4
  - @leafygreen-ui/portal@4.1.3
  - @leafygreen-ui/typography@16.5.0

## 11.1.0

### Minor Changes

- 2077235fe: Component now supports `baseFontSize` prop

## 11.0.10

### Patch Changes

- a3a52e131: Bumps to use new `useIdAllocator` hook
- Updated dependencies [a3a52e131]
- Updated dependencies [a3a52e131]
  - @leafygreen-ui/hooks@7.7.3
  - @leafygreen-ui/a11y@1.4.4

## 11.0.9

### Patch Changes

- 32b3d3146: Bumps to use new `useIdAllocator` hook
- b54f9380f: Updates propTypes for `as` prop
- 73cbbd02c: Uses fontWeight token from `@leafygreen-ui/tokens`
- Updated dependencies [73cbbd02c]
- Updated dependencies [32b3d3146]
- Updated dependencies [8ece56980]
- Updated dependencies [32b3d3146]
  - @leafygreen-ui/tokens@2.1.0
  - @leafygreen-ui/a11y@1.4.3
  - @leafygreen-ui/hooks@7.7.2

## 11.0.8

### Patch Changes

- ce0fcb3f6: Excludes `children` from story controls
- Updated dependencies [55d33e435]
- Updated dependencies [111b680c5]
- Updated dependencies [55d33e435]
- Updated dependencies [cf00160ec]
- Updated dependencies [ce0fcb3f6]
- Updated dependencies [111b680c5]
- Updated dependencies [77320a6b8]
  - @leafygreen-ui/lib@10.3.3
  - @leafygreen-ui/palette@4.0.4
  - @leafygreen-ui/box@3.1.3
  - @leafygreen-ui/portal@4.1.2
  - @leafygreen-ui/tokens@2.0.3

## 11.0.7

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle
- Updated dependencies [8c0c2bdf9]
  - @leafygreen-ui/a11y@1.4.2
  - @leafygreen-ui/box@3.1.2
  - @leafygreen-ui/emotion@4.0.4
  - @leafygreen-ui/hooks@7.7.1
  - @leafygreen-ui/leafygreen-provider@3.1.2
  - @leafygreen-ui/lib@10.3.2
  - @leafygreen-ui/palette@4.0.3
  - @leafygreen-ui/portal@4.1.1
  - @leafygreen-ui/tokens@2.0.2

## 11.0.6

### Patch Changes

- c2c5601f4: Adds missing dependencies. Removes unused dependencies
- Updated dependencies [d351c02bc]
- Updated dependencies [c2c5601f4]
  - @leafygreen-ui/hooks@7.7.0
  - @leafygreen-ui/lib@10.3.1
  - @leafygreen-ui/palette@4.0.1

## 11.0.5

### Patch Changes

- Updated dependencies [5b036515e]
- Updated dependencies [26e341a0b]
- Updated dependencies [52dcb3316]
  - @leafygreen-ui/palette@4.0.0
  - @leafygreen-ui/lib@10.2.2
  - @leafygreen-ui/portal@4.1.0
  - @leafygreen-ui/tokens@2.0.1

## 11.0.4

### Patch Changes

- 64eee134d: TSDoc: Updates some exported TSDoc interfaces. Storybook: Updates story files.
- Updated dependencies [64eee134d]
  - @leafygreen-ui/lib@10.1.0

## 11.0.3

### Patch Changes

- c82ed35d5: Removes `useUsingKeyboardContext` from component, in favor of `&:focus-visible`
- Updated dependencies [741cdd408]
- Updated dependencies [b24b21462]
  - @leafygreen-ui/tokens@2.0.0
  - @leafygreen-ui/palette@3.4.7
  - @leafygreen-ui/portal@4.0.9

## 11.0.2

### Patch Changes

- b7f7a4c95: Updates package dependencies & devDependencies, and ensures each package is appropriately listed. Ensures `tsconfig` has no circular dependencies
- Updated dependencies [b7f7a4c95]
  - @leafygreen-ui/palette@3.4.5
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

- 2195359a: Updates some packges to use a caret instead of an exact version
- dca32bc3: Fixes TS type of `setSelected`
- Updated dependencies [f2d63a60]
  - @leafygreen-ui/lib@10.0.0
  - @leafygreen-ui/a11y@1.3.4
  - @leafygreen-ui/leafygreen-provider@3.0.1
  - @leafygreen-ui/portal@4.0.7

## 10.0.0

### Patch Changes

- Updated dependencies [e399f1b9]
- Updated dependencies [e399f1b9]
  - @leafygreen-ui/leafygreen-provider@3.0.0

## 9.2.1

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.
- Updated dependencies [24683433]
  - @leafygreen-ui/a11y@1.3.3
  - @leafygreen-ui/box@3.1.1
  - @leafygreen-ui/emotion@4.0.3
  - @leafygreen-ui/hooks@7.3.3
  - @leafygreen-ui/leafygreen-provider@2.3.5
  - @leafygreen-ui/lib@9.5.1
  - @leafygreen-ui/palette@3.4.4
  - @leafygreen-ui/portal@4.0.6
  - @leafygreen-ui/tokens@1.3.4

## 9.2.0

### Minor Changes

- 3690df49: Updates TypeScript annotations, type structures and export format of some components

### Patch Changes

- 3690df49: Updates Storybook configs
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [3690df49]
- Updated dependencies [58a5a05e]
  - @leafygreen-ui/box@3.1.0
  - @leafygreen-ui/lib@9.5.0
  - @leafygreen-ui/a11y@1.3.2
  - @leafygreen-ui/emotion@4.0.2
  - @leafygreen-ui/hooks@7.3.2
  - @leafygreen-ui/leafygreen-provider@2.3.4
  - @leafygreen-ui/palette@3.4.3
  - @leafygreen-ui/portal@4.0.5
  - @leafygreen-ui/tokens@1.3.3

## 9.1.0

### Minor Changes

- c9346f93: Adds an `inlineChildren` prop to support inline children after the tabs

## 9.0.2

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/a11y@1.3.1
  - @leafygreen-ui/box@3.0.8
  - @leafygreen-ui/hooks@7.3.1
  - @leafygreen-ui/leafygreen-provider@2.3.3
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2
  - @leafygreen-ui/portal@4.0.4
  - @leafygreen-ui/tokens@1.3.2

## 9.0.1

### Patch Changes

- 699f8ba7: Add missing unit to `TabTitle` font-size
- Updated dependencies [30e038a3]
  - @leafygreen-ui/palette@3.4.1

## 9.0.0

### Major Changes

- 5aba12f1: - Updates `Tabs` for dark mode brand refresh
  - Adds `disabled` to `TabTitle` props

## 8.0.0

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/leafygreen-provider@2.3.0

## 7.0.1

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
  - @leafygreen-ui/portal@4.0.3
  - @leafygreen-ui/tokens@1.3.1
  - @leafygreen-ui/lib@9.3.0

## 7.0.0

### Major Changes

- e13d2487: Moving leafygreen-provider to peerDependencies.
- Updated dependencies [c48e943e]
  - @leafygreen-ui/leafygreen-provider@2.2.0

### Patch Changes

- Updated dependencies [5f28fce1]
- Updated dependencies [c48e943e]
  - @leafygreen-ui/tokens@1.3.0

## 6.0.3

### Patch Changes

- Updated dependencies [233ac580]
- Updated dependencies [ba4aab15]
- Updated dependencies [2cf1bc4a]
  - @leafygreen-ui/tokens@1.2.0
  - @leafygreen-ui/lib@9.2.1

## 6.0.2

### Patch Changes

- acd6919: - Eliminates fuzzy text on hover in `menu` and `tabs`
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
- Updated dependencies [acd6919]
  - @leafygreen-ui/lib@9.2.0
  - @leafygreen-ui/palette@3.3.2

## 6.0.1

### Patch Changes

- Updated dependencies [614be76]
  - @leafygreen-ui/tokens@1.1.0

## 6.0.0

### Major Changes

- ab1fd9e: Updates Tabs component for Visual Brand Refresh

## 5.1.5

### Patch Changes

- cd9be9ec: Fixes a bug where Tabs with a non-string `name` prop would not be rendered accessibly

## 5.1.4

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/portal@4.0.0
  - @leafygreen-ui/a11y@1.2.2
  - @leafygreen-ui/box@3.0.6
  - @leafygreen-ui/leafygreen-provider@2.1.3
  - @leafygreen-ui/tokens@0.5.3

## 5.1.3

### Patch Changes

- 14fa2fdb: Removes `href` from being spread on tabpanel div

## 5.1.2

### Patch Changes

- e1af3278: Updates focus state of Tab component to better comply with a11y contrast ratios.
- Updated dependencies [047c1930]
- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/hooks@7.0.0
  - @leafygreen-ui/a11y@1.2.1
  - @leafygreen-ui/box@3.0.5
  - @leafygreen-ui/leafygreen-provider@2.1.2
  - @leafygreen-ui/portal@3.1.3
  - @leafygreen-ui/tokens@0.5.2

## 5.1.1

### Patch Changes

- 90321b36: Imports validateProps functions from `@leafygreen-ui/a11y` package.
- ab581f34: Re-released components that were erroneously released without `.d.ts` files
- Updated dependencies [90321b36]
- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/a11y@1.2.0
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/box@3.0.4
  - @leafygreen-ui/leafygreen-provider@2.0.3
  - @leafygreen-ui/portal@3.1.1
  - @leafygreen-ui/tokens@0.5.1

## 5.1.0

### Minor Changes

- b9a8df1e: Export Props used by Tabs

### Patch Changes

- Updated dependencies [65032024]
  - @leafygreen-ui/palette@3.2.0

## 5.0.3

### Patch Changes

- b3508a2e: Addresses bug where multiple sets of Tabs on a page, controlled by the same state, would automatically move focus to the last set.

## 5.0.2

### Patch Changes

- eb1caf16: Disables hover state on selected tabs
- Updated dependencies [c8aee7eb]
  - @leafygreen-ui/palette@3.1.1

## 5.0.1

### Patch Changes

- 926e0a13: Ensures that props are properly spread on Tab element

## 5.0.0

### Major Changes

- 7454941e: - Requires that Tabs receive an `aria-label` or `aria-labelledby` prop.
  - Ensures that tabs and their corresponding panels are related properly. Specifically, this requires rendering empty tabpanel containers instead of rendering nothing at all when a tabpanel is not selected.

## 4.0.6

### Patch Changes

- b06ce7fd: Prevents onClick from being fired when Tab is clicked, as it should only be fired when the TabTitle is clicked

## 4.0.5

### Patch Changes

- ee7923d3: Changes how we extend the types of HTMLElements, and standardizes how we document this across readmes
- dc88bac1: Ensures Tabs have an active state
- d12fe9f7: Fixes bug where on new page load, browser would automatically scroll to Tabs due to prematurely manually focusing of the component
- Updated dependencies [ee7923d3]
  - @leafygreen-ui/lib@6.1.2

## 4.0.4

### Patch Changes

- 1e9d336c: Tabs now accepts an empty React element as children, which makes it easier to conditionally render individual Tab components
- Updated dependencies [c9a0d89f]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/palette@3.1.0
  - @leafygreen-ui/lib@6.1.1
  - @leafygreen-ui/leafygreen-provider@2.0.2

## 4.0.3

### Patch Changes

- 6858240b: Previously, if multiple `<Tabs />` were rendered, only the first on the page would be navigable via keyboard. Now, the currently focused `<Tabs />` will be navigable via keyboard, regardless of location on page.
- Updated dependencies [5cf0c95c]
  - @leafygreen-ui/lib@6.1.0

## 4.0.2

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
- Updated dependencies [059ef833]
  - @leafygreen-ui/box@3.0.1
  - @leafygreen-ui/hooks@5.0.1
  - @leafygreen-ui/leafygreen-provider@2.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/palette@3.0.1
  - @leafygreen-ui/tokens@0.5.0

## 4.0.1

### Patch Changes

- 4c0587a0: Fixes issue where TypeScript types were not packaged.

## 4.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/box@3.0.0
  - @leafygreen-ui/hooks@5.0.0
  - @leafygreen-ui/leafygreen-provider@2.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0
  - @leafygreen-ui/tokens@0.4.0

## 3.0.1

### Patch Changes

- a550d645: Properly sets `font-family` of TabTitle and adds fallbacks in case the font is not available

## 3.0.0

### Major Changes

- cac8348a: Updates Tabs component to match new design spec and adds `darkMode` prop

## 2.1.6

### Patch Changes

- 3e32a2ee: Fixes bug where conditionally rendered Tab elements caused the component to try and read the width of a reference to a non-exisistant element.

## 2.1.5

### Patch Changes

- d5d40791: Pin lodash version to latest to include fix for [prototype pollution attack vulnerability.](https://hackerone.com/reports/712065)
- Updated dependencies [d5d40791]
  - @leafygreen-ui/hooks@4.2.1

## 2.1.4

### Patch Changes

- e599707: Require lodash dependencies instead of inlining them.
- Updated dependencies [e599707]
- Updated dependencies [8c867bb]
  - @leafygreen-ui/hooks@4.2.0

## 2.1.3

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/hooks@4.0.1
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2

## 2.1.2

### Patch Changes

- Updated dependencies [fa55b3d]
  - @leafygreen-ui/hooks@4.0.0

## 2.1.1

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
- Updated dependencies [d739511]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/hooks@3.0.0

## 2.1.0

### Minor Changes

- c17a5e1: Changes how keyboard navigation is handled in Tabs componentt. Ensures that navigating browser history is not prevened by component internals

## 2.0.1

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards

## 2.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/palette@2.0.0

## 1.0.5

### Patch Changes

- 2f9a300: Uses exported `keyMap` from lib
- Updated dependencies [2f9a300]
  - @leafygreen-ui/lib@3.2.0

## 1.0.4

### Patch Changes

- d85bd2c: Keyboard navigation responds to keyCode rather than key for more browser compatibility
- Updated dependencies [9c45cb4]
  - @leafygreen-ui/lib@3.1.0

## 1.0.3

### Patch Changes

- 4de039a: Further accessibility updates to make component compliant with a11y standards

## 1.0.2

### Patch Changes

- e1e42f0: Fixes Aria tags in Tab component to be accessible against a11y standards

## 1.0.1

### Patch Changes

- 37d690f: Fixes component dependency on theme to palette

## 1.0.0

### Major Changes

- 410c0d6: Initial release of Tabs
