---
'@leafygreen-ui/drawer': patch
---

- Updates `DrawerLayout` to accept the `disabled` property in `toolbarData` prop

  ```js
  <DrawerLayout
    toolbarData={[
      {
        ...,
        disabled: true, // This drawer item is disabled
      },
    ]}
  ```
- Updates `DrawerLayout` to support `ReactNode` for the `title` property in `toolbarData` prop

  ```js
  <DrawerLayout
    toolbarData={[
      {
        ...,
        title: <span>Custom Title</span>, // This allows for custom React nodes as titles
      },
    ]}
  ```
