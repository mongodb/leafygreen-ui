# @leafygreen-ui/typography

## 13.2.0-next.0

### Minor Changes

- b70fe564: Updates TypeScript annotations, type structures and export format of some components

### Patch Changes

- 00a2a281: Bumps Typography & Icon Button dependencies to v13. Adds Emotion as a dependency. Updates other dependencies.
- 00a2a281: Updates Storybook configs
- Updated dependencies [b70fe564]
- Updated dependencies [00a2a281]
- Updated dependencies [00a2a281]
- Updated dependencies [b70fe564]
  - @leafygreen-ui/box@3.1.0-next.0
  - @leafygreen-ui/icon@11.11.0-next.0
  - @leafygreen-ui/lib@9.5.0-next.0
  - @leafygreen-ui/leafygreen-provider@2.3.4-next.0
  - @leafygreen-ui/palette@3.4.3-next.0
  - @leafygreen-ui/tokens@1.3.3-next.0

## 13.1.2

### Patch Changes

- e39d8469: Export `anchorClassName`
- 8d7534e9: Adds `tsdoc.json` to published package files
- Updated dependencies [7caa1c3e]
- Updated dependencies [8d7534e9]
  - @leafygreen-ui/icon@11.10.2
  - @leafygreen-ui/box@3.0.8
  - @leafygreen-ui/leafygreen-provider@2.3.3
  - @leafygreen-ui/lib@9.4.2
  - @leafygreen-ui/palette@3.4.2
  - @leafygreen-ui/tokens@1.3.2

## 13.1.1

### Patch Changes

- 5aba12f1: Export and combine `Label` and `Description` styles.

## 13.1.0

### Minor Changes

- 65c86281: Consuming darkMode from the LeafyGreenProvider if the darkMode prop is not set

## 13.0.1

### Patch Changes

- 13a4adcc: Style updates to the `Disclaimer` component

## 13.0.0

### Patch Changes

- Updated dependencies [85d46871]
- Updated dependencies [99e20bb9]
  - @leafygreen-ui/lib@9.4.0
  - @leafygreen-ui/leafygreen-provider@2.3.0

## 12.0.0

### Major Changes

- f0a357e2: Updates `Body`, `Disclaimer`, `H1`, `H2`, `H3`, `InlineCode`, `InlineKeyCode`, `Link`, `Overline`, and `Subtitle` for dark mode refresh.

## 11.0.2

### Patch Changes

- 96d1ff9c: Updates to propTypes, TSDocs, and Storybook controls
- Updated dependencies [6a89bc29]
- Updated dependencies [fd2f6de0]
- Updated dependencies [96d1ff9c]
- Updated dependencies [422dbfcd]
- Updated dependencies [9ff90d4b]
  - @leafygreen-ui/palette@3.4.0
  - @leafygreen-ui/box@3.0.7
  - @leafygreen-ui/tokens@1.3.1
  - @leafygreen-ui/lib@9.3.0

## 11.0.1

### Patch Changes

- 909209c4: Fixes `useUpdatedBaseFontSize` override prop to accept the deprecated value `14`

## 11.0.0

### Major Changes

- Updated dependencies [500d6c60]
  - @leafygreen-ui/leafygreen-provider@2.2.0

### Patch Changes

- Updated dependencies [5f28fce1]
- Updated dependencies [c48e943e]
- Updated dependencies [500d6c60]
  - @leafygreen-ui/tokens@1.3.0
  - @leafygreen-ui/icon@11.9.0

## 10.0.0

### Major Changes

- ba4aab15: Updates `Label` and `Description` for Dark Mode Refresh

  Exports a temporary `useUpdatedBaseFontSize` hook to convert the values returned from `useBaseFontSize` to the new `tokens`

### Minor Changes

- f3aad7e2: Adds an optional `override` parameter to `useUpdatedBaseFontSize`. If the containing component accepts a `baseFontSize` prop, use this parameter to respect that prop

### Patch Changes

- 679b6239: Updating h3 font-weight from 500 to 600
- Updated dependencies [233ac580]
- Updated dependencies [ba4aab15]
- Updated dependencies [2cf1bc4a]
  - @leafygreen-ui/tokens@1.2.0
  - @leafygreen-ui/lib@9.2.1

## 9.1.1

### Patch Changes

- 614be76: Reduces outline width for InlineCode focus state
- Updated dependencies [614be76]
  - @leafygreen-ui/tokens@1.1.0

## 9.1.0

### Minor Changes

- 1067fe9: Body typography component now uses the Box component, allowing the use of the `as` prop

## 9.0.0

### Major Changes

- 8457f92: - Adds "Euclid Circular A" and "MongoDB Value Serif" to `tokens.fontFamilies`
  - Updates Light mode typography according to visual brand refresh

### Patch Changes

- Updated dependencies [8457f92]
  - @leafygreen-ui/tokens@1.0.0
- Updated dependencies [cb54eef]
  - @leafygreen-ui/palette@3.3.1

## 8.1.0

### Minor Changes

- da40935b: Updates appearance of the InlineCode component, and adds dark mode support.

## 8.0.4

### Patch Changes

- Updated dependencies [f6e5655a]
- Updated dependencies [03388ff2]
- Updated dependencies [b8f03aa1]
  - @leafygreen-ui/palette@3.2.2
  - @leafygreen-ui/icon@11.3.0
  - @leafygreen-ui/lib@9.0.0
  - @leafygreen-ui/box@3.0.6
  - @leafygreen-ui/leafygreen-provider@2.1.3
  - @leafygreen-ui/tokens@0.5.3

## 8.0.3

### Patch Changes

- d82eb152: Fixes Link component to support relative links. Links with `href` strings not beginning with `http://` or `https://` will behave the same as a native anchor tag

## 8.0.2

### Patch Changes

- Updated dependencies [047c1930]
  - @leafygreen-ui/lib@8.0.0
  - @leafygreen-ui/box@3.0.5
  - @leafygreen-ui/icon@11.1.1
  - @leafygreen-ui/leafygreen-provider@2.1.2
  - @leafygreen-ui/tokens@0.5.2

## 8.0.1

### Patch Changes

- Updated dependencies [faeb0ce0]
  - @leafygreen-ui/icon@11.0.0

## 8.0.0

### Patch Changes

- Updated dependencies [857a680a]
  - @leafygreen-ui/leafygreen-provider@2.1.0

## 7.6.0

### Minor Changes

- 02417199: Updates line-height for H3 component from 28px to 32px.

### Patch Changes

- Updated dependencies [ab581f34]
- Updated dependencies [90321b36]
  - @leafygreen-ui/palette@3.2.1
  - @leafygreen-ui/lib@7.0.0
  - @leafygreen-ui/box@3.0.4
  - @leafygreen-ui/icon@10.2.1
  - @leafygreen-ui/leafygreen-provider@2.0.3
  - @leafygreen-ui/tokens@0.5.1

## 7.5.0

### Minor Changes

- ec27f36e: - Improves accessibility of link component when rendering an icon.
  - Renders arrow at 12px instead of 10px to account for the reduced height of the glyph.

### Patch Changes

- Updated dependencies [ec27f36e]
  - @leafygreen-ui/icon@10.0.0

## 7.4.0

### Minor Changes

- 1a42c662: Adds value to `rel` prop in Link component when href is external

### Patch Changes

- Updated dependencies [1ed17f68]
  - @leafygreen-ui/box@3.0.3

## 7.3.2

### Patch Changes

- f805b772: Support updated glyph
- Updated dependencies [f805b772]
  - @leafygreen-ui/icon@9.0.0

## 7.3.1

### Patch Changes

- Updated dependencies [ba56b1cc]
  - @leafygreen-ui/icon@8.0.0

## 7.3.0

### Minor Changes

- fc18e572: `H1`, `H2`, `H3` and `Subtitle` components now accept an `as` prop, such that we can keep styles consistent via `Component`, but the actual heading level that should be rendered can change based on context. This was done to support making MongoDB an accessible platform, as headings should only decrease by one level (i.e. from `<h1>` to `<h2>`) but the styles don't always need to appear as such.

## 7.2.0

### Minor Changes

- 8b0ea602: - `Label` component now supports a `disabled` prop

## 7.1.1

### Patch Changes

- ee7923d3: Changes how we extend the types of HTMLElements, and standardizes how we document this across readmes
- Updated dependencies [ee7923d3]
- Updated dependencies [7b71da8f]
  - @leafygreen-ui/lib@6.1.2
  - @leafygreen-ui/icon@7.0.2

## 7.1.0

### Minor Changes

- fe861d52: Adds `Label` and `Description` components
- aab4e65b: Rest props are now forwarded for InlineDefinition components when not rendered as a link

### Patch Changes

- 374430ea: Updates string color value to reference the same color from uiColors palette
- Updated dependencies [c9a0d89f]
- Updated dependencies [9ee1d5fc]
  - @leafygreen-ui/palette@3.1.0
  - @leafygreen-ui/lib@6.1.1
  - @leafygreen-ui/leafygreen-provider@2.0.2

## 7.0.0

### Major Changes

- ac0f3ff1: Visual updates to focus and hover states of <InlineCode /> component. The HTML structure has been returned to that of `v4.*` (the previous change in `v5` was not reflected in the README). Styles provided through `className` prop may need to be updated to accordingly.

### Patch Changes

- Updated dependencies [90996818]
  - @leafygreen-ui/box@3.0.2

## 6.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed
- Updated dependencies [dac3f38b]
- Updated dependencies [059ef833]
  - @leafygreen-ui/box@3.0.1
  - @leafygreen-ui/icon@7.0.1
  - @leafygreen-ui/leafygreen-provider@2.0.1
  - @leafygreen-ui/lib@6.0.1
  - @leafygreen-ui/palette@3.0.1
  - @leafygreen-ui/tokens@0.5.0

## 6.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

### Patch Changes

- Updated dependencies [0267bfd2]
  - @leafygreen-ui/box@3.0.0
  - @leafygreen-ui/icon@7.0.0
  - @leafygreen-ui/leafygreen-provider@2.0.0
  - @leafygreen-ui/lib@6.0.0
  - @leafygreen-ui/palette@3.0.0
  - @leafygreen-ui/tokens@0.4.0

## 5.0.0

### Major Changes

- 001a277f: `Body` component now renders as a `div` instead of `p` element.

### Minor Changes

- d0dac1a0: Updates InlineCode component to match design spec. InlineCode components may now also be links.

### Patch Changes

- Updated dependencies [001a277f]
  - @leafygreen-ui/icon@6.6.1

## 4.3.0

### Minor Changes

- eda10121: Adds `H3` and `InlineKeyCode` components
  Updates color of typography elements from `uiColors.gray.dark2` to `uiColors.gray.dark3`

### Patch Changes

- 3fed752e: Fixes styles for Link component
- Updated dependencies [6883ccd0]
- Updated dependencies [d5d40791]
  - @leafygreen-ui/icon@6.6.0
  - @leafygreen-ui/box@2.1.5

## 4.2.2

### Patch Changes

- f792966: Uses Tokens package to define `font-family` for InlineCode component
- Updated dependencies [f792966]
  - @leafygreen-ui/tokens@0.3.0

## 4.2.1

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/box@2.1.3
  - @leafygreen-ui/icon@6.3.2
  - @leafygreen-ui/leafygreen-provider@1.1.4
  - @leafygreen-ui/lib@5.1.1
  - @leafygreen-ui/palette@2.0.2

## 4.2.0

### Minor Changes

- 458f0c3: Ensures that `rest` props are spread to every component in Typography package

### Patch Changes

- @leafygreen-ui/leafygreen-provider@1.1.3

## 4.1.1

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [d2136a0]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0
  - @leafygreen-ui/icon@6.3.0
  - @leafygreen-ui/box@2.1.2
  - @leafygreen-ui/leafygreen-provider@1.1.2

## 4.1.0

### Minor Changes

- 4873650: Adds `Link` component to typography package

### Patch Changes

- Updated dependencies [e8f5376]
- Updated dependencies [4873650]
  - @leafygreen-ui/box@2.1.1
  - @leafygreen-ui/icon@6.2.0

## 4.0.0

### Major Changes

- 1d24966: Makes `@leafygreen-ui/leafygreen-provider` a peer dependency to ensure that components use hooks from the same version of the provider as what's installed.

## 3.0.0

### Major Changes

- eba8391: Renames `component` prop to `as`

### Patch Changes

- Updated dependencies [eba8391]
  - @leafygreen-ui/box@2.0.0

## 2.0.0

### Major Changes

- 6d1de4a: Removes `display:inline-block` from Body and Small components.

## 1.0.1

### Patch Changes

- 365412e: Adds lib as a dependency rather than a devDep

## 1.0.0

### Major Changes

- 94ed125: Initial implementation of Typography component

### Patch Changes

- Updated dependencies [94ed125]
  - @leafygreen-ui/leafygreen-provider@1.1.0
