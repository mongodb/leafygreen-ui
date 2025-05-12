---
'@leafygreen-ui/tabs': minor
---

[LG-4694](https://jira.mongodb.org/browse/LG-4696): make `setSelected` type less restrictive. The type of `setSelected` was updated from `React.Dispatch<number>` to `React.Dispatch<React.SetStateAction<SelectedType>>` in [v13.1.0](https://github.com/mongodb/leafygreen-ui/blob/main/packages/tabs/CHANGELOG.md#1310) which was causing type errors for existing implementations. It is updated to `React.Dispatch<SelectedType> | React.Dispatch<React.SetStateAction<SelectedType>>`.4