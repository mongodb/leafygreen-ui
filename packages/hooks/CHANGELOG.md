# @leafygreen-ui/hooks

## 4.2.1

### Patch Changes

- d5d40791: Pin lodash version to latest to include fix for [prototype pollution attack vulnerability.](https://hackerone.com/reports/712065)

## 4.2.0

### Minor Changes

- 8c867bb: Adds new useIsomorphicLayoutEffect hook

### Patch Changes

- e599707: Changes import pattern for Lodash method.

## 4.1.0

### Minor Changes

- 2c09c48: Added usePrevious hook
- add8745: Add `useObjectDependency` hook

## 4.0.1

### Patch Changes

- 691eb05: Better support for UMD

## 4.0.0

### Major Changes

- fa55b3d: Make some hooks and MongoNav support server-side rendering

## 3.0.0

### Major Changes

- d739511: The `once` option to `useEventListener` has been merged together with the `enabled` option.

## 2.1.0

### Minor Changes

- 1b298cc: Create usePoller hook.

## 2.0.1

### Patch Changes

- ac5c473: Adds lodash as dependency

## 2.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

## 1.1.0

### Minor Changes

- 3a24668: Adds useEscapeKey hook

## 1.0.7

### Patch Changes

- 7825641: Patches a bug in useEventListeners hook, to now ensure that `eventListener` is set or unset when enabled changes values
