import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { SideNav, SideNavItem, SideNavGroup } from './index';

function MockSideNav() {
  return (
    <SideNav>
      <SideNavGroup headerText="Simple States">
        <SideNavItem href="/" active>
          Active State
        </SideNavItem>
        <SideNavItem href="/" disabled>
          Disabled State
        </SideNavItem>
      </SideNavGroup>
      <SideNavGroup headerText="Other Usages">
        <SideNavItem href="/">Content with a link</SideNavItem>
        <SideNavItem>Content without a link renders as a div</SideNavItem>
        <SideNavItem>
          <label htmlFor="side-nav-story">
            Non-Text Content
            <input
              id="side-nav-story"
              type="text"
              value="I'm an input!"
              disabled
            />
          </label>
        </SideNavItem>
      </SideNavGroup>
      <SideNavGroup headerText={text('Header Text', 'With Knobs')}>
        <SideNavItem
          active={boolean('Active', false)}
          disabled={boolean('Disabled', false)}
          href={text('href', '')}
        >
          {text('Nav Item Text', 'Modify Me!')}
        </SideNavItem>
      </SideNavGroup>
    </SideNav>
  );
}

storiesOf('SideNav', module).add('Default', () => <MockSideNav />);
