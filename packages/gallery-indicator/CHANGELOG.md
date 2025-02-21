# @leafygreen-ui/gallery-indicator

## 1.0.1

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
- Updated dependencies [3111a76f3]
  - @leafygreen-ui/emotion@4.0.10
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3
  - @leafygreen-ui/palette@4.1.4
  - @leafygreen-ui/tokens@2.11.4
  - @lg-tools/test-harnesses@0.2.0

## 1.0.0

### Major Changes

- 81d2a3ae3: - First major release of `GalleryIndicator`.
  - Exports `getTestUtils`, a util to reliably interact with LG `GalleryIndicator` in a product test suite. For more details, check out the [README](https://github.com/mongodb/leafygreen-ui/tree/main/packages/gallery-indicator#test-harnesses)
  - Exports the constant, `LGIDs` which stores `data-lgid` values.
