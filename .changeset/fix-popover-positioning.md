---
'@leafygreen-ui/guide-cue': minor
'@leafygreen-ui/popover': minor
---

[LG-5008](https://jira.mongodb.org/browse/LG-5008)

- Improves positioning logic to enable positioning fallback to optimize popover element visibility
- Fixes positioning logic to include `adjustOnMutation` prop
- Assigns `GuideCue` component's internal beacon ref for better positioning of tooltip instances relative to beacon
