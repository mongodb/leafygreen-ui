# @leafygreen-ui/testing-lib

## 0.3.0

### Minor Changes

- e6fd9ecfc: First publish of @leafygreen-ui/testing-lib

## 0.2.2

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle

## 0.2.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed

## 0.2.0

### Minor Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

## 0.1.1

### Patch Changes

- 691eb05: Better support for UMD

## 0.1.0

### Minor Changes

- 6953c2f: Handler of `SpyContextManager` now includes `waitForCall` helper. `JestDOM.silenceNavigationErrors` passes a helper to wait for navigation.

## 0.0.1

### Patch Changes

- b0e541b: Initial release of testing-lib
