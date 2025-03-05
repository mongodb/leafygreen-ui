# @leafygreen-ui/chip

## 3.0.5

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/icon@13.1.3
  - @leafygreen-ui/inline-definition@8.0.5
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.11.4

## 3.0.4

### Patch Changes

- @leafygreen-ui/inline-definition@8.0.4

## 3.0.3

### Patch Changes

- @leafygreen-ui/inline-definition@8.0.3

## 3.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/emotion@4.0.9
  - @leafygreen-ui/icon@13.1.2
  - @leafygreen-ui/inline-definition@8.0.2
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2
  - @leafygreen-ui/palette@4.1.3
  - @leafygreen-ui/tokens@2.11.3

## 3.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/inline-definition@8.0.1
  - @leafygreen-ui/palette@4.1.2
  - @leafygreen-ui/tokens@2.11.2
  - @leafygreen-ui/icon@13.1.1
  - @leafygreen-ui/lib@14.0.1

## 3.0.0

### Major Changes

- 274d7e1a7: Removes prop-types from LeafyGreen UI

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/inline-definition@8.0.0
  - @leafygreen-ui/icon@13.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/tokens@2.11.1

## 2.0.0

### Major Changes

- 04bb887c0: [LG-4121](https://jira.mongodb.org/browse/LG-4121): Removes `popoverZIndex` prop because the `InlineDefinition` component instance will now render in the top layer

  #### Migration guide

  ##### Old

  ```js
  <Chip popoverZIndex={9999} />
  ```

  ##### New

  ```js
  <Chip />
  ```

### Patch Changes

- Updated dependencies [04bb887c0]

  - @leafygreen-ui/inline-definition@7.0.0
  - @leafygreen-ui/leafygreen-provider@3.2.0

- Updated dependencies [117a463f8]
  - @leafygreen-ui/lib@13.8.1

## 1.2.1

### Patch Changes

- e7bc12814: Adds more thorough test coverage for disabled inputs

## 1.2.0

### Minor Changes

- 3f52c844b: - Adds optional `glyph` prop. The glyph will appear to the left of the chip text.

  ```js
  <Chip label="chip" glyph={<Icon glyph="Wizard" />} />
  ```

  - Decrease left and right padding from `6px` to `4px`.

## 1.1.0

### Minor Changes

- 5d03e71a0: Updates dismiss button to include `type="button"` so that component dismissal does not submit forms

### Patch Changes

- Updated dependencies [7a901b954]
- Updated dependencies [342ab81b0]
- Updated dependencies [29d50edaa]
  - @leafygreen-ui/lib@13.6.0
  - @leafygreen-ui/icon@12.5.4
  - @leafygreen-ui/tokens@2.9.0

## 1.0.3

### Patch Changes

- c86227a6: Updates Storybook argTypes for mongodb.design

## 1.0.2

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
  - @leafygreen-ui/inline-definition@6.0.15
  - @leafygreen-ui/palette@4.0.9
  - @leafygreen-ui/tokens@2.5.2

## 1.0.1

### Patch Changes

- 7c6166f9: Bumps `lib` dependency
- Updated dependencies [74057388]
  - @leafygreen-ui/icon@12.0.0

## 1.0.0

### Major Changes

- 9a728c7b: First major release of `Chip`.
