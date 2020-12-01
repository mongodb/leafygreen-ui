---
'@leafygreen-ui/toggle': major
---

Removed `interactionRingSize` prop. Previously the interaction ring could cause the toggle to overflow its container. Since the interaction ring is now based on box-shadows, this should no longer be necessary.
