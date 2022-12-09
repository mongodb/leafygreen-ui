import React from 'react';

export interface SideNavGroupCollapsedProps {
  groupHeaderProps: {};
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuGroupLabelId: string;
  indentLevel: number;
  renderHeader: () => React.ReactElement;
  children: React.ReactNode;
}
