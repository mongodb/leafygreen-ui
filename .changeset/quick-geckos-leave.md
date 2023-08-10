---
'@leafygreen-ui/side-nav': major
---

Refactor the `CollapseToggle`` tooltip so that it no longer uses a portal, as React 18 displays the tooltip in the wrong position when the side nav is toggled.
