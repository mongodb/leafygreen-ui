import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { SideNav, SideNavItem, SideNavGroup } from './index';
import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

const wrapperStyles = css`
  position: fixed;
  top: 0;
  bottom: 0;
`;

function MockSideNav() {
  const textHeader = 'States (text header)';
  const contentHeader = (
    <div>
      <strong>Polymorphism</strong>
      <br />
      <small>(content header)</small>
    </div>
  );

  return (
    <LeafyGreenProvider>
      <SideNav className={wrapperStyles}>
        <SideNavGroup header={textHeader}>
          <SideNavItem active>Active State</SideNavItem>
          <SideNavItem disabled>Disabled State</SideNavItem>
        </SideNavGroup>

        <SideNavGroup header={contentHeader}>
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

        <SideNavGroup
          header={text('Header Text', 'With Knobs!')}
          collapsible={boolean('collapsible', true)}
        >
          <SideNavItem
            active={boolean('Active', false)}
            disabled={boolean('Disabled', false)}
            href={text('href', '')}
          >
            {text('Nav Item Text', 'Modify Me!')}
          </SideNavItem>
          <SideNavItem>Dave</SideNavItem>
          <SideNavItem>Brooke</SideNavItem>
          <SideNavItem>Rob</SideNavItem>
          <SideNavItem>Michael</SideNavItem>
          <SideNavItem>Fred</SideNavItem>
          <SideNavItem>Harry</SideNavItem>
        </SideNavGroup>
      </SideNav>
    </LeafyGreenProvider>
  );
}

storiesOf('SideNav', module).add('Default', () => <MockSideNav />);
