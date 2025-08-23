---
'@leafygreen-ui/drawer': minor
---

# What's New

- **New `visible` property**: Toolbar items can now be conditionally shown/hidden using a `visible` boolean property (defaults to true). [LG-5460](https://jira.mongodb.org/browse/LG-5460)
  ```tsx
  export const DRAWER_TOOLBAR_DATA: DrawerToolbarLayoutProps['toolbarData'] = [
    {
      id: 'Code',
      label: 'Code',
      content: <DrawerContent />,
      title: 'Code Title',
      glyph: 'Code',
    },
    {
      id: 'Dashboard',
      label: 'Dashboard',
      content: <DrawerContent />,
      title: 'Dashboard Title',
      glyph: 'Dashboard',
      visible: false, // This item will be hidden
    },
    {
      id: 'Plus',
      label: "Perform some action, doesn't open a drawer",
      glyph: 'Plus',
    },
    {
      id: 'Sparkle',
      label: 'Disabled item',
      glyph: 'Sparkle',
      disabled: true,
    },
  ];
  ```


- **Dynamic toolbar rendering**: When all toolbar items have `visible: false`, the entire toolbar element is removed from the DOM. [LG-5460](https://jira.mongodb.org/browse/LG-5460)

  ```tsx
    {
      id: 'Code',
      label: 'Code',
      content: <DrawerContent />,
      title: 'Code Title',
      glyph: 'Code',
      visible: false,
    },
    {
      id: 'Dashboard',
      label: 'Dashboard',
      content: <DrawerContent />,
      title: 'Dashboard Title',
      glyph: 'Dashboard',
      visible: false,
    },
    {
      id: 'Plus',
      label: "Perform some action, doesn't open a drawer",
      glyph: 'Plus',
      visible: false,
    },
    {
      id: 'Sparkle',
      label: 'Disabled item',
      glyph: 'Sparkle',
      disabled: true,
      visible: false,
    },
  ```
