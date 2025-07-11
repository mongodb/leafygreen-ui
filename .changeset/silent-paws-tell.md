---
'@leafygreen-ui/section-nav': major
---

Initial release of `SectionNav`. Refer to the [README](https://github.com/mongodb/leafygreen-ui/tree/main/packages/section-nav/README.md) for more information on usage and available props.

```tsx
import {SectionNav, SectionNavItem} from `@leafygreen-ui/section-nav`;

<SectionNav>
  <SectionNavItem href="#section-1" label="Section 1">
    <SectionNavItem href="#section-1.1" label="Section 1.1" />
  </SectionNavItem>
  <SectionNavItem href="#section-2" label="Section 2" />
  <SectionNavItem active href="#section-3" label="Section 3">
    <SectionNavItem href="#section-3.1" label="Section 3.1" />
    <SectionNavItem href="#section-3.2" label="Section 3.2" />
  </SectionNavItem>
</SectionNav>
```