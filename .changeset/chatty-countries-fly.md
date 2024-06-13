---
'@leafygreen-ui/polymorphic': major
---

- Updates `InferredPolymorphicProps` to avoid errors when providing a generically typed as prop
  - adds type tests for `Polymorphic` and `InferredPolymorphic`
- Adds `useInferredPolymorphicProps` utility for nested inferred polymorphic components
- Updates the return type of `useInferredPolymorphic` to match a generic `InferredPolymorphicProps`
- Adds `hasAnchorProps` type guard