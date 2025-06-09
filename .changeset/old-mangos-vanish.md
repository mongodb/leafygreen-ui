---
'@leafygreen-ui/code': major
---

- Move `lgIds` to context, use `LgIdString` type, and remove setting `DEFAULT_LGID_ROOT`. 
- Update all IDs to return the unique root identifier passed to `data-lgid`: 
  ```tsx
  export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) => {
    const ids = {
      root,
      panel: `${root}-panel`, // Updated to use unique root identifier
      select: `${root}-select`,
      copyButton: `${root}-copy_button`, // Updated to use unique root identifier
      copyTooltip: `${root}-copy_tooltip`, // Updated to use unique root identifier
      expandButton: `${root}-expand_button`,
      skeleton: `${root}-skeleton`,
      pre: `${root}-pre`,
      title: `${root}-title`, // Updated to use unique root identifier
    } as const;
    return ids;
  };
  ```



