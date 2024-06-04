---
'@leafygreen-ui/tabs': major
---

[LG-4087](https://jira.mongodb.org/browse/LG-4087)

- Removes `@leafygreen-ui/portal` dependency
  - In previous versions, tabs and their corresponding panels do not render on the server and instead portal content in the respective containers after hydration
  - Moving forward, tabs and their corresponding panels render normally on the server and render content in the respective containers during initial render cycle
- Adds `@leafygreen-ui/descendants` dependency
  - Handles relationships between `Tabs` component and `TabTitle` descendants
  - Handles relationships between `Tabs` component and `TabPanel` descendants
- Replaces `@leafygreen-ui/box` with `@leafygreen-ui/polymorphic
  - Allows tab elements to render as any element or component
  - Note: it is recommended to continue to use a button or link for accessibility purposes
- Adds `forceRenderAllTabPanels` to `Tabs` component. By default, tab panels conditionally render in the DOM. Setting this prop to `true` will:
  - Render all non-disabled tab panels in the DOM
  - Hide the non-selected tab panels with CSS using `display: none;`. This will also remove the non-selected tab panels from the accessibility tree
- Adds fixed height to tabs
- Exports class names to customize styling on containers
  - `tabListElementClassName` can be used to select tab list container
  - `tabPanelsElementClassName` can be used to select tab panels container
- Adds `getAllTabPanelsInDOM` test util
- Updates `getSelectedPanel` test util. It now checks CSS display property to get the selected panel
