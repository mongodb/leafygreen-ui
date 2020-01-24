import React from 'react';
import { storiesOf } from '@storybook/react';
import { SideNav, SideNavItem, SideNavGroup } from './index';

function MockSideNav() {
  return (
    <SideNav>
      <SideNavGroup headerText="Simple States">
        <SideNavItem href="#clusters" active>
          Active State
        </SideNavItem>
        <SideNavItem href="#dataLake" disabled>
          Disabled State
        </SideNavItem>
      </SideNavGroup>
      <SideNavGroup headerText="Other Usages">
        <SideNavItem href="#databaseAccess">Content with a link</SideNavItem>
        <SideNavItem>Content without a link renders as a div</SideNavItem>
        <SideNavItem>
          <div>This can contain any content</div>
          <input type="text" value="even inputs" disabled />
        </SideNavItem>
      </SideNavGroup>
    </SideNav>
  );
}

storiesOf('SideNav', module).add('Default', () => <MockSideNav />);
