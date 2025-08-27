import React from 'react';

import { SideNavProps } from './SideNav.types';

export const SideNav = (props: SideNavProps) => {
  return <div {...props}>your content here</div>;
};

SideNav.displayName = 'SideNav';
