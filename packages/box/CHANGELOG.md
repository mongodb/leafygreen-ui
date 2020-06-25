# @leafygreen-ui/box

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
