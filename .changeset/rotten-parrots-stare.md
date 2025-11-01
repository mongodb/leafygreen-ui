---
'@lg-charts/core': minor
---

Chart improvements and refactoring:
- ChartTooltip: Added `axisPointer` prop supporting 'line', 'shadow', and 'none' options
- ChartTooltip: Added `className` prop for custom styling
- Bar: `emphasis` prop now accepts 'self' and 'none' options to control hover focus behavior
- Axis Types: Added 'category' axis type for discrete data (e.g., bar charts) with properly aligned labels
- Bug Fix: Fixed null/undefined check in CustomTooltip to properly handle falsy values like 0 and empty strings