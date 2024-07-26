---
'@leafygreen-ui/tabs': major
---

[LG-4253](https://jira.mongodb.org/browse/LG-4253): Adds small size variant to tabs

Additional styling updates:
- [breaking] `inlineChildren` vertical alignment is centered and no longer requires a container element. Instead, pass in a fragment wrapping the children elements and use `inlineChildrenContainerClassName` to customize styling
- Exports `inlineChildrenContainerClassName` for customizing div that contains `inlineChildren`
- Extends bottom divider between inline children and visible tab panel
