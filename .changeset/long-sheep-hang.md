---
'@leafygreen-ui/side-nav': patch
---

`SideNavItem` previously relied on parent context for `list-style`. Now, it is reset on each individual `SideNavItem`
[LG-3301](https://jira.mongodb.org/browse/LG-3301)

`SideNavGroupCollapsed` had a bug on initial render due to shallow dependency check. Now, when `initialCollapsed=false`, content will properly display on initial render
[LG-3357](https://jira.mongodb.org/browse/LG-3357)
