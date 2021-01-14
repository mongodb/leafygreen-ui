---
'@leafygreen-ui/tabs': major
---

- Requires that Tabs receive an `aria-label` or `aria-labelledby` prop.
- Ensures that tabs and their corresponding panels are related properly. Specifically, this requires rendering empty tabpanel containers instead of rendering nothing at all when a tabpanel is not selected.
