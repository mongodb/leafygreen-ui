---
'@leafygreen-ui/skeleton-loader': patch
---

Fixes accessibility issue in TableSkeleton where table headers without column labels were empty and not accessible to screen readers. Adds VisuallyHidden "Loading" text to skeleton table headers to ensure proper screen reader support.

