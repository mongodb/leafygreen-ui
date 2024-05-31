---
'@leafygreen-ui/tabs': major
---

[LG-4087](https://jira.mongodb.org/browse/LG-4087)

- Removed `@leafygreen-ui/portal` dependency and tabs and their corresponding panels are hydrated with initial render
- Added `@leafygreen-ui/descendants` dependency to handle relationships between `Tabs` and `TabTitle` descendants and between `Tabs` and `TabPanel` descendants
- Replaced `Box` with `Polymorphic` which allows tab elements to render as any element or component. It is recommended to continue to use a button or link for accessibility purposes
- Added `forceRenderAllTabPanels` to `Tabs` component. By default, tab panels conditionally render in the DOM. Setting this prop to `true` will render all, non-disabled tab panels in the DOM and hide the non-selected tabs with CSS
- Added fixed height to tabs
- Exported class names to customize styling on containers
  - `tabListElementClassName` can be used to select tab list container
  - `tabPanelsElementClassName` can be used to select tab panels container
- Added `getAllTabPanelsInDOM` test util
- Updated `getSelectedPanel` test util. It now checks CSS display property to get the selected panel
