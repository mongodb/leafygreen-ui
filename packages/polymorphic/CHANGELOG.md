# @leafygreen-ui/polymorphic

## 2.0.3

### Patch Changes

- Updated dependencies [274d7e1a7]
  - @leafygreen-ui/lib@14.0.0

## 2.0.2

### Patch Changes

- 667496f83: Adds more type safety around nested Polymorphic components accepting refs

## 2.0.1

### Patch Changes

- ef158d904: - `PolymorphicRef` extends `null`
  - `PolymorphicProps` extends `ComponentPropsWithRef`
  - Adds type specs for refs and event handlers

## 2.0.0

### Major Changes

- 7a901b954: - Updates `InferredPolymorphicProps` to avoid errors when providing a generically typed as prop
  - adds type tests for `Polymorphic` and `InferredPolymorphic`
  - Adds `useInferredPolymorphicProps` utility for nested inferred polymorphic components
  - Updates the return type of `useInferredPolymorphic` to match a generic `InferredPolymorphicProps`
  - Adds `hasAnchorProps` type guard

### Patch Changes

- Updated dependencies [7a901b954]
  - @leafygreen-ui/lib@13.6.0

## 1.3.7

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`

## 1.3.6

### Patch Changes

- 4fcf2e94: Updates types with `React.PropsWithChildren`

## 1.3.5

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.

## 1.3.4

### Patch Changes

- c15ee2ac: Fixes missing documentation file

## 1.3.3

### Patch Changes

- 215268ff: Updates build tooling. No functional changes

## 1.3.2

### Patch Changes

- d2ce54e2f: Updates story files for Storybook 7.x

## 1.3.1

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle

## 1.3.0

### Minor Changes

- 3ef365fd3: Expose two internal hooks `usePolymorphicComponent` and `useInferredPolymorphicComponent` to support React Server Components

## 1.2.0

### Minor Changes

- b9841decc: - Improves support for `InferredPolymorphic` when using anchor-like components (e.g. NextJS Link)
  - Exports `PropsOf` utility to get the resolved type of a Polymorphic component

## 1.1.1

### Patch Changes

- 97cf09502: Adds additional styled test, and documents `styled` props best practice

## 1.1.0

### Minor Changes

- 9f06c9495: Adds `InferredPolymorphic` factory function. Adds additional generic prop to `Polymorphic` and `InferredPolymorphic` to set a default as prop

## 1.0.0

### Major Changes

- 45dd84e9b: Releases the Polymorphic component
