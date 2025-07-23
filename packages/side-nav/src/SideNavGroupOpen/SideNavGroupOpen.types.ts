import React from 'react';

import { SideNavGroupHeaderProps } from '../SideNavGroupHeader/SideNavGroupHeader.types';

export interface SideNavGroupOpenProps extends SideNavGroupHeaderProps {
  groupHeaderProps: { [key: string]: string };
  menuGroupLabelId: string;
  indentLevel: number;
  children: React.ReactNode;
}
