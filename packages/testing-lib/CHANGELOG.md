# @leafygreen-ui/testing-lib

## 0.4.1

### Patch Changes

- 2bceccb1: Fixes `lodash` imports to use default exports of specific functions to reduce component's bundle size.

## 0.4.0

### Minor Changes

- 7f38e78a: Exports `waitForState`, a wrapper around `act` that returns the result of the state update callback
- 7f38e78a: Exports overrides for `renderHook` and `act` that will work in both a React 17 and React 18 test environment

## 0.3.4

### Patch Changes

- 4fcf2e94: Fixes `isPromiseLike` TS errors

## 0.3.3

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.

## 0.3.2

### Patch Changes

- c15ee2ac: Fixes missing documentation file

## 0.3.1

### Patch Changes

- 215268ff: Updates build tooling. No functional changes

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
