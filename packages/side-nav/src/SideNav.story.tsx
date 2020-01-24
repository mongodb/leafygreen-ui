import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { SideNav, SideNavItem, SideNavGroup } from './index';

function MockSideNav() {
  return (
    <SideNav>
      <SideNavGroup headerText="States">
        <SideNavItem active>Active State</SideNavItem>
        <SideNavItem disabled>Disabled State</SideNavItem>
      </SideNavGroup>

      <SideNavGroup headerText="Polymorphism">
        <SideNavItem>Default root element (button)</SideNavItem>
        <SideNavItem href="/">Anchor root element</SideNavItem>
        <SideNavItem as="label" htmlFor="docs-input">
          Custom root element (label)
          <input
            id="docs-input"
            type="text"
            value=""
            placeholder="placeholder text"
            disabled
          />
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

function Docs() {
  return (
    <SideNav>
      <SideNavGroup headerText="States">
        <SideNavItem active>Active State</SideNavItem>
        <SideNavItem disabled>Disabled State</SideNavItem>
      </SideNavGroup>
      <SideNavGroup headerText="Polymorphism">
        <SideNavItem>Default root element (button)</SideNavItem>
        <SideNavItem href="/">Anchor root element</SideNavItem>
        <SideNavItem as="label" htmlFor="docs-input">
          Custom root element (label)
          <input
            id="docs-input"
            type="text"
            value=""
            placeholder="placeholder text"
            disabled
          />
        </SideNavItem>
      </SideNavGroup>
    </SideNav>
  );
}

storiesOf('SideNav', module).add('Default', () => <MockSideNav />);
storiesOf('SideNav', module).add('docs', () => <Docs />);
