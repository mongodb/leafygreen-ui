import React from 'react';

export interface SideNavGroupOpenProps {
  groupHeaderProps: { [key: string]: string };
  menuGroupLabelId: string;
  indentLevel: number;
  renderHeader: () => React.ReactElement;
  children: React.ReactNode;
}
