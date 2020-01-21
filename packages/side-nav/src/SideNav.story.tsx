
import React from 'react';
import { storiesOf } from '@storybook/react';
import { SideNav, SideNavItem, SideNavGroup } from './index';

function MockAtlasSideNav() {
  return (
    <SideNav>
      <SideNavGroup headerText="Data Storage">
        <SideNavItem href="#clusters" active>
          Clusters (active)
        </SideNavItem>
        <SideNavItem >
          Triggers (not a link)
        </SideNavItem>
        <SideNavItem href="#dataLake" disabled>
          Data Lake (disabled)
        </SideNavItem>
      </SideNavGroup>
      <SideNavGroup headerText="Security">
        <SideNavItem href="#databaseAccess">
          Database Access
        </SideNavItem>
        <SideNavItem href="#networkAccess">
          Network Access
        </SideNavItem>
        <SideNavItem href="#advanced">
          Advanced
        </SideNavItem>
      </SideNavGroup>
    </SideNav>
  );
};

storiesOf('SideNav', module)
  .add('SideNav', () => <MockAtlasSideNav />)
