# @leafygreen-ui/hooks

## 9.2.1

### Patch Changes

- bab8e2a: The type of the returned `value` is now inferred from the types of the parameters in `useControlled`

## 9.2.0

### Minor Changes

- 579e8c7: - Creates `useControlled` hook. This hook is a more generic version of `useControlledValue` that can be used for any component.
  - Refactors `useControlledValue` to use `useControlled` under the hood.

### Patch Changes

- Updated dependencies [88e25a1]
  - @leafygreen-ui/lib@15.6.1

## 9.1.4

### Patch Changes

- 3471b94: Update React ref objects to be explicitly nullable
- Updated dependencies [3471b94]
- Updated dependencies [6f30c55]
- Updated dependencies [cee1e79]
- Updated dependencies [6f30c55]
  - @leafygreen-ui/lib@15.4.0

## 9.1.3

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- Updated dependencies [a9eb172]
- Updated dependencies [dc3299b]
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/tokens@3.2.4

## 9.1.2

### Patch Changes

- 172c228: Adds `react-test-renderer` as devDependency
- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/tokens@3.2.3

## 9.1.1

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @leafygreen-ui/tokens@3.1.2

## 9.1.0

### Minor Changes

- 3bef1e7: Exports `useFirstRender`: Returns whether this is the first render of a component.

### Patch Changes

- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [3bef1e7]
  - @leafygreen-ui/lib@15.1.0
  - @leafygreen-ui/tokens@3.1.1

## 9.0.0

### Major Changes

- 0757cfbfc: Updates Typescript build to TS5.8

### Patch Changes

- 0757cfbfc: Adds `@lg-tools/build` as a dev dependency
- 0757cfbfc: Adds missing `@lg-tools/` devDependencies.
  Updates `build`, `tsc` & `docs` scripts to use `lg-build *` cli
- 0757cfbfc: Updates `types` entry point to `./dist/types`.
  Removes redundant `compilerOptions` from TSConfig
- 0757cfbfc: Updates `main` entry point in package.json to `./dist/umd`
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
- Updated dependencies [0757cfbfc]
  - @leafygreen-ui/lib@15.0.0

## 8.4.1

### Patch Changes

- 21bcd4195: Makes `allowPropagation` option optional

## 8.4.0

### Minor Changes

- 30b13adec: - Updates 3rd argument in `useBackdropClick` to accept an options object. Retains (but deprecates) boolean-only functionality.
  - Adds `options.allowPropagation` to allow or disallow the click event to bubble up to other elements.

### Patch Changes

- Updated dependencies [30b13adec]
  - @leafygreen-ui/lib@14.2.0

## 8.3.6

### Patch Changes

- Updated dependencies [0e4c5099b]
  - @leafygreen-ui/lib@14.1.0

## 8.3.5

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @leafygreen-ui/lib@14.0.3

## 8.3.4

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/lib@14.0.2

## 8.3.3

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/lib@14.0.1

## 8.3.2

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/lib@14.0.0

## 8.3.1

### Patch Changes

- 7a83cd4c6: Adds `useMergeRefs` into `useMergeRef` directory

## 8.3.0

### Minor Changes

- 04bb887c0: Add `useMergeRefs` hook for merging array of refs into a single memoized callback ref or `null`

### Patch Changes

- Updated dependencies [117a463f8]
  - @leafygreen-ui/lib@13.8.1

## 8.2.1

### Patch Changes

- 84028dc5d: Removes `useMemo` from `useAvailableSpace`, which was preventing the hook from returning the correct value.

  On first render, the `triggerRef` is not available but `useViewportSize` is. When the menu is opened, the `triggerRef` is available but the viewport size remains the same so the memo callback is not triggered since refs do not trigger a re-render.

  Previously, `useViewportSize` returned null and then re-rendered with the correct dimensions, which would trigger the memo callback.

  These changes should affect the following components:

  - `Select`
  - `Combobox`
  - `Menu`
  - `SearchInput`

## 8.2.0

### Minor Changes

- 9776f5f42: Adds `useSsrCheck` and adds it to viewport check in `useViewportSize`.

  When server side rendering is used, `window` is not defined. This is causing build issues on the server where we access `window` in `useViewportSize`. To fix this, this change adds a hook, `useSsrCheck`, that checks the rendering environment and can be used before attempting to access `window`. It adds a check of this to `useViewportSize` to fix the current build issue.

## 8.1.4

### Patch Changes

- c1b8b633b: Fixes re-render after initial render of `useViewportSize` hook
- fe2483937: Makes prefix argument optional for `useDynamicRefs`

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
