# @lg-private/canvas-header

## 3.0.1

### Patch Changes

- 1916bd3: Removes background color from canvas header.

  Fixes "Copied" tooltip alignment.

- f66e884: Updates `LiveExample` story so it displays correctly on .design

## 3.0.0

### Major Changes

- c9203f7: Removes `prop-types`. Updates LG core packages to latest

## 2.1.0

### Minor Changes

- daef9ca: Adds `resourceBadges` prop to render badges to the right of the resource name

## 2.0.1

### Patch Changes

- 8f076fb: Fixes naming of lg private packages from `@leafygreen-ui/*` to `@lg-private/*`

## 2.0.0

### Major Changes

- 0d12b4c: - Adds `badges` prop. This prop allows users to pass in [Badges](https://www.mongodb.design/component/badge/live-example).

  E.g.

  ```js
  badges={<Badge variant="green">Enabled</Badge>}
  ```

  - Bump to @leafygreen-ui/leafygreen-provider@3.1.12

## 1.0.2

### Patch Changes

- 33e6b57: No functional changes. Upgrades build to use Node 18

## 1.0.1

### Patch Changes

- 476f90a: Updates `icon` & `tokens` packages to latest
- d5c17a8: Updates TS builds to use `typescript@4.9.5`

## 1.0.0

### Major Changes

- 8a2c4d1: First major release of `CanvasHeader`. [LG-3949](https://jira.mongodb.org/browse/LG-3949)
