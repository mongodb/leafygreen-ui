# @leafygreen-ui/hooks

## 8.1.3

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
- Updated dependencies [66df9ab8]
  - @leafygreen-ui/lib@13.3.0

## 8.1.2

### Patch Changes

- e487fb24: Renames story files from `.story.tsx` to `.stories.tsx`

## 8.1.1

### Patch Changes

- 2bceccb1: Fixes `lodash` imports to use default exports of specific functions to reduce component's bundle size.
- Updated dependencies [2bceccb1]
  - @leafygreen-ui/lib@13.2.1

## 8.1.0

### Minor Changes

- ffd11f24: - Extends `useControlledValue` to accept any type.
  - Adds `updateValue` function in return value. This method triggers a synthetic event to update the value of a controlled or uncontrolled component.
  - Adds `initialValue` argument. Used for setting the initial value for uncontrolled components. Without this we may encounter a React error for switching between controlled/uncontrolled inputs
  - The value of `isControlled` is now immutable after the first render

### Patch Changes

- 7f38e78a: Updates test to import `renderHook` from `@leafygreen-ui/testing-lib`
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
- Updated dependencies [ffd11f24]
  - @leafygreen-ui/lib@13.2.0

## 8.0.1

### Patch Changes

- 89f439e8: - Makes `useDynamicRefs` `prefix` argument optional
  - Adds tests to `useDynamicRefs`

## 8.0.0

### Major Changes

- fd907503: Updates `useControlledValue` hook to remove the controlled value from internal state. Instead the controlled value is consumed directly.

## 7.7.8

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.

## 7.7.7

### Patch Changes

- c15ee2ac: Fixes missing documentation file

## 7.7.6

### Patch Changes

- 215268ff: Updates build tooling. No functional changes

## 7.7.5

### Patch Changes

- 735342e9: Adds `useForceRerender` hook.

## 7.7.4

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x

## 7.7.3

### Patch Changes

- a3a52e131: Removes call to use React 18's useId hook if found

## 7.7.2

### Patch Changes

- 32b3d3146: Rewrites `useIdAllocator` hook so that it performs properly across client-side and server-side renders

## 7.7.1

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle

## 7.7.0

### Minor Changes

- d351c02bc: Creates `useStateRef` - a combination of useState and useRef, that returns the current state, a `setState` function, and a `getState` function that will return the current walue of the state. This is useful to avoid referencing stale state inside callbacks

### Patch Changes

- c2c5601f4: Adds missing dependencies. Removes unused dependencies

## 7.6.0

### Minor Changes

- ec2a3d66d: Creates `useAutoScroll` to automatically scroll a container

## 7.5.0

### Minor Changes

- ffb99f417: Creates `useControlledValue` hook

## 7.4.0

### Minor Changes

- 405636249: Adds `useBackdropClick` hook. Fires a callback when any element _except_ the provided foreground element(s) are clicked

## 7.3.3

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.

## 7.3.2

### Patch Changes

- 3690df49: Updates `tsdoc.json` file

## 7.3.1

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files

## 7.3.0

### Minor Changes

- 6792bc44: Adds `useAvailableSpace` to calculate the available vertical space between an element and the viewport

## 7.2.0

### Minor Changes

- 63ddf39: - Adds useForwardedRef hook
  - Adds useDynamicRefs hook

## 7.1.1

### Patch Changes

- 70f3c2c: Removes error message in useValidation when no prop is passed in

## 7.1.0

### Minor Changes

- d661688: Adds a useValidation hook, used in TextArea and TextInput

## 7.0.0

### Major Changes

- 047c1930: Adds `useIdAllocator` hook

## 6.0.1

### Patch Changes

- 1ed17f68: Updates lodash to 4.17.21, as there's a vulnerability in 4.17.20 that's been resolved in 4.17.21

## 6.0.0

### Major Changes

- c18f16e6: The `useElementNode` hook has been removed. It's recommended to use `useState` directly instead.

  # Example

  ## Before

  ```tsx
  const [node, setNode] = useElementNode<HTMLDivElement>();
  ```

  ## After

  ```tsx
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  ```

## 5.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed

## 5.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

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
