import React from 'react';

import { SideNavGroupHeaderProps } from '../SideNavGroupHeader/types';

export interface SideNavGroupCollapsedProps extends SideNavGroupHeaderProps {
  groupHeaderProps: { [key: string]: string };
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuGroupLabelId: string;
  indentLevel: number;
  children: React.ReactNode;
}
