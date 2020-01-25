import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from '@leafygreen-ui/emotion';
import { boolean, text } from '@storybook/addon-knobs';
import { SideNav, SideNavItem, SideNavGroup } from './index';
import { LEFT_RIGHT_OFFSET } from './styles';

const headerSpacingStyles = css`
  margin-top: 0;
  margin-bottom: 0;
  padding: 5px ${LEFT_RIGHT_OFFSET}px 5px ${LEFT_RIGHT_OFFSET}px;
`;

function MockSideNav() {
  const textHeader = 'States (text header)';
  const contentHeader = (
    <div className={headerSpacingStyles}>
      <strong>Polymorphism</strong>
      <br />
      <small>(content header)</small>
    </div>
  );

  return (
    <SideNav>
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

      <SideNavGroup header={text('Header Text', 'With Knobs!')}>
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
