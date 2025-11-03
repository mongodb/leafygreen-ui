# @leafygreen-ui/descendants

## 3.0.5

### Patch Changes

- c8559f3: Widens the range of `@leafygreen-ui/leafygreen-provider` peer dependency to `>=3.2.0`

## 3.0.4

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- Updated dependencies [a9eb172]
- Updated dependencies [dc3299b]
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/hooks@9.1.3
  - @leafygreen-ui/leafygreen-provider@5.0.4

## 3.0.3

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
- Updated dependencies [172c228]
  - @leafygreen-ui/hooks@9.1.2
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1

## 3.0.2

### Patch Changes

- Updated dependencies [b67497a]
  - @leafygreen-ui/lib@15.2.0
  - @leafygreen-ui/hooks@9.1.1
  - @leafygreen-ui/leafygreen-provider@5.0.2

## 3.0.1

### Patch Changes

- f685e51: Exports missing `UseHighlightOptions` and `HighlightContextType` types
- Updated dependencies [164b15f]
- Updated dependencies [518ce41]
- Updated dependencies [3bef1e7]
- Updated dependencies [3bef1e7]
  - @leafygreen-ui/lib@15.1.0
  - @leafygreen-ui/hooks@9.1.0
  - @leafygreen-ui/leafygreen-provider@5.0.1

## 3.0.0

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
  - @leafygreen-ui/leafygreen-provider@5.0.0
  - @leafygreen-ui/hooks@9.0.0
  - @leafygreen-ui/lib@15.0.0

## 2.1.5

### Patch Changes

- Updated dependencies [21bcd4195]
  - @leafygreen-ui/hooks@8.4.1
  - @leafygreen-ui/leafygreen-provider@4.0.7

## 2.1.4

### Patch Changes

- Updated dependencies [30b13adec]
- Updated dependencies [30b13adec]
  - @leafygreen-ui/hooks@8.4.0
  - @leafygreen-ui/lib@14.2.0
  - @leafygreen-ui/leafygreen-provider@4.0.6

## 2.1.3

### Patch Changes

- Updated dependencies [16dda633f]
  - @leafygreen-ui/leafygreen-provider@4.0.5

## 2.1.2

### Patch Changes

- Updated dependencies [0e4c5099b]
  - @leafygreen-ui/lib@14.1.0
  - @leafygreen-ui/hooks@8.3.6
  - @leafygreen-ui/leafygreen-provider@4.0.4

## 2.1.1

### Patch Changes

- 541e12e75: Updates builds to leverage Rollup tree shaking. (see [`tools/build/config/rollup.config.mjs`](https://github.com/mongodb/leafygreen-ui/blob/main/tools/build/config/rollup.config.mjs))
- Updated dependencies [541e12e75]
  - @leafygreen-ui/hooks@8.3.5
  - @leafygreen-ui/leafygreen-provider@4.0.3
  - @leafygreen-ui/lib@14.0.3

## 2.1.0

### Minor Changes

- 674d06888: [LG-4399](https://jira.mongodb.org/browse/LG-4399): Enable passing component `index` prop for SSR support

## 2.0.2

### Patch Changes

- e1955dd36: Fixes broken patch build
- Updated dependencies [e1955dd36]
  - @leafygreen-ui/hooks@8.3.4
  - @leafygreen-ui/leafygreen-provider@4.0.2
  - @leafygreen-ui/lib@14.0.2

## 2.0.1

### Patch Changes

- 53c67fba6: [LG-4650](https://jira.mongodb.org/browse/LG-4650): migrates from `yarn` to `pnpm`
- Updated dependencies [53c67fba6]
  - @leafygreen-ui/leafygreen-provider@4.0.1
  - @leafygreen-ui/hooks@8.3.3
  - @leafygreen-ui/lib@14.0.1

## 2.0.0

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/leafygreen-provider@4.0.0
  - @leafygreen-ui/lib@14.0.0
  - @leafygreen-ui/hooks@8.3.2

## 1.0.1

### Patch Changes

- 409377e19: Adds missing `useHighlightContext` export

## 1.0.0

### Major Changes

- 4c04aa0ee: Updates `useInitDescendants` signature to require a Context value, and return a `Provider` component.

  Eliminates the need to destructure `descendants` and `dispatch` from the hook's return value just to pass into the provider. Instead, the hook will construct a pre-populated provider unique to the Context value given.

  Note: `descendants`, `dispatch` and `getDescendants` are still returned by the hook for use in the parent component if necessary.

  Before:

  ```tsx
  const MyDescendantContext = createDescendantsContext();
  const { descendants, dispatch } = useInitDescendants();

  return (
    <DescendantsProvider
      context={MyDescendantContext}
      descendants={descendants}
      dispatch={dispatch}
    >
      <MyDescendantItem />
    </DescendantsProvider>
  );
  ```

  After:

  ```tsx
  const MyDescendantContext = createDescendantsContext();
  const { Provider } = useInitDescendants(MyDescendantContext);

  return (
    <Provider>
      <MyDescendantItem />
    </Provider>
  );
  ```

### Minor Changes

- 4c04aa0ee: Adds Highlight management utilities.
  - `useHighlight`: A hook to initialize the highlight state management
  - `HighlightProvider`: A context provider for consuming the highlight state from descendant components
  - `createHighlightContext`: Constructs a unique Context object in order to support nested contexts

### Patch Changes

- Updated dependencies [4c04aa0ee]
  - @leafygreen-ui/lib@13.7.0

## 0.3.0

### Minor Changes

- cfa830701: Adds & exports `getDescendantById` & `getDescendantByIndex` utilities

### Patch Changes

- cfa830701: Updates Descendant index properties after inserting & removing to ensure the index of the Descendant object matches the index within the Descendants list

## 0.2.0

### Minor Changes

- 659aa9eed: Adds `getDescendants` accessor function, returned from `useInitDescendants`. Use this method when referencing descendants from withing effects/callbacks where the `descendants` object may have updated, and could be stale.

## 0.1.1

### Patch Changes

- 15185af0: Imports Storybook utilities from `@lg-tools/storybook-utils` (previously imported from `@leafygreen-ui/lib`)
- 356a53fd: Update TS builds to use `typescript@4.9.5`
- Updated dependencies [15185af0]
- Updated dependencies [356a53fd]
  - @leafygreen-ui/leafygreen-provider@3.1.12
  - @leafygreen-ui/hooks@8.1.3
