---
'@leafygreen-ui/leafygreen-provider': minor
---

[LG-4446](https://jira.mongodb.org/browse/LG-4446): Adds `PopoverPropsContext` to pass props to a deeply nested popover element

Additionally exposes a `forceUseTopLayer` prop in the `LeafyGreenProvider` which can be used to test interactions with all LG popover elements forcibly set to `renderMode="top-layer"`. This can help pressure test for any regressions to more confidently and safely migrate. However, this should only be used when all LG dependencies are relying on v12+ of `@leafygreen-ui/popover`.
