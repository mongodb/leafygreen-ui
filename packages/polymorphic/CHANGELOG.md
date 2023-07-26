# @leafygreen-ui/polymorphic

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
