# @leafygreen-ui/box

## 2.1.5

### Patch Changes

- d5d40791: Pin lodash version to latest to include fix for [prototype pollution attack vulnerability.](https://hackerone.com/reports/712065)

## 2.1.4

### Patch Changes

- a14a079: ExtendableBox type now provides 'displayName' and 'propTypes' properties.

## 2.1.3

### Patch Changes

- 691eb05: Better support for UMD
- Updated dependencies [691eb05]
  - @leafygreen-ui/lib@5.1.1

## 2.1.2

### Patch Changes

- Updated dependencies [2eba736]
- Updated dependencies [1aa26ee]
- Updated dependencies [a571361]
  - @leafygreen-ui/lib@5.0.0

## 2.1.1

### Patch Changes

- e8f5376: Ensures that only props that are of type `string` are recognized as being passed to the `href` prop.

## 2.1.0

### Minor Changes

- 0593116: Updates `ExtendableBox` type such that a consumer can pass a default value for `as` rather than assuming that the default case is a `div`. This fixes bugs in Button and Menu components.

## 2.0.0

### Major Changes

- eba8391: Box component now accepts `as` prop instead of `component` and exports generic `ExtendableBox` as helper type for components wrapping Box.

  ```js
  Example Usage:
  function Example<ExtendableBox<ExampleProps>>(props: ExampleProps) {
    return <div>Example Component</div>
  }
  ```

## 1.1.1

### Patch Changes

- 75c0693: Upgrades workspace dependencies

## 1.1.0

### Minor Changes

- 208d881: Exports `BoxProps` as named export from index

## 1.0.0

### Major Changes

- b1e3fb6: Initial Box component release
