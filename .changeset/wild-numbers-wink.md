---
'@leafygreen-ui/toggle': minor
---

Addresses issue where Toggle caused scrollbars to appear in certain environments. This should no longer happen by default; however, if the focus state still causes the scrollbars to appear, this version adds an export, `interactionRingSize`, which is a value that can be applied to the margin of the container wrapping Toggle, and in turn prevent the focus state from overflowing.
