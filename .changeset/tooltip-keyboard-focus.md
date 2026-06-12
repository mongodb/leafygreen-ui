---
'@leafygreen-ui/tooltip': patch
'@leafygreen-ui/code': patch
---

[LG-5488](https://jira.mongodb.org/browse/LG-5488): `Tooltip` no longer opens when its trigger receives focus from mouse interaction or programmatic focus (e.g. focus restored after closing a modal). It still opens when focus comes from keyboard navigation. `Code`'s copy button now explicitly opens its tooltip on click to continue showing the copied confirmation.
