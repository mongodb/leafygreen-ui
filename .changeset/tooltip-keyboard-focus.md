---
'@leafygreen-ui/tooltip': patch
'@leafygreen-ui/code': patch
'@leafygreen-ui/code-editor': patch
---

[LG-5488](https://jira.mongodb.org/browse/LG-5488): `Tooltip` no longer opens when its trigger receives focus from mouse interaction or programmatic focus (e.g. focus restored after closing a modal). It still opens when focus comes from keyboard navigation. Keyboard detection requires the app to be wrapped in `LeafyGreenProvider`; without one, focus continues to open the tooltip as before. The copy buttons in `Code` and `CodeEditor` now explicitly open their tooltips on click to continue showing the copied confirmation.
