---
'@leafygreen-ui/side-nav': major
---

Refactors the `CollapseToggle`` tooltip so that it no longer uses a portal, as React 18 displays the tooltip in the wrong position when the side nav is toggled. Also refactor the internal function, `renderedChildren`.
