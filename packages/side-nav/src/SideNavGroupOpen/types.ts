import React from 'react';

export interface SideNavGroupOpenProps {
  groupHeaderProps: {};
  menuGroupLabelId: string;
  indentLevel: number;
  renderHeader: () => React.ReactElement;
  children: React.ReactNode;
}
