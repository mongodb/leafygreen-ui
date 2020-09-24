/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import TextInput from '@leafygreen-ui/text-input';
import { spacing } from '@leafygreen-ui/tokens';
import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';
import MDBDesignLogo from '../logos/MDBDesignLogo';

const navWidth = css`
  width: 270px;
  // spacing[3] already built into side nav
  padding-left: ${spacing[5] - spacing[3]}px;
  padding-right: 60px;
`;

const logoStyles = css`
  // adds back spacing that was already built into side nav
  margin-left: ${spacing[3]}px;
  margin-top: 12px;
`;

const inputStyles = css`
  width: 192px;
  // adds back spacing that was already built into side nav
  margin-left: ${spacing[3]}px;
  margin-top: ${spacing[4]}px;
  margin-bottom: ${spacing[4]}px;
`;

function Navigation() {
  return (
    <nav css={navWidth}>
      <MDBDesignLogo css={logoStyles} />
      {/* this is a placeholder until we get our select component */}
      <TextInput label="" placeholder="Find docs" css={inputStyles} />
      <SideNav>
        <SideNavGroup
          header="Core Guidelines"
          collapsible
          initialCollapsed={false}
        >
          <SideNavItem>Logos</SideNavItem>
          <SideNavItem>User Personas</SideNavItem>
          <SideNavItem>Tone</SideNavItem>
          <SideNavItem>Colors</SideNavItem>
          <SideNavItem>Illustration</SideNavItem>
          <SideNavItem>Typography</SideNavItem>
        </SideNavGroup>
        <SideNavGroup header="Components" collapsible initialCollapsed={false}>
          <SideNavItem>Badges</SideNavItem>
          <SideNavItem>Banners</SideNavItem>
          <SideNavItem>Box</SideNavItem>
          <SideNavItem>Button</SideNavItem>
          <SideNavItem>Callout</SideNavItem>
          <SideNavItem>Code</SideNavItem>
          <SideNavItem>Confirmation Modal</SideNavItem>
          <SideNavItem>Icons</SideNavItem>
          <SideNavItem>Icon Button</SideNavItem>
          <SideNavItem>Inline Definition</SideNavItem>
          <SideNavItem>Logo</SideNavItem>
          <SideNavItem>Marketing Modal</SideNavItem>
          <SideNavItem>Menu</SideNavItem>
          <SideNavItem>Modal</SideNavItem>
          <SideNavItem>Mongo Nav</SideNavItem>
          <SideNavItem>Palette</SideNavItem>
          <SideNavItem>Pipeline</SideNavItem>
          <SideNavItem>Popover</SideNavItem>
          <SideNavItem>Portal</SideNavItem>
          <SideNavItem>Radio Box Group</SideNavItem>
          <SideNavItem>Radio Group</SideNavItem>
          <SideNavItem>Side Nav</SideNavItem>
          <SideNavItem>Stepper</SideNavItem>
          <SideNavItem>Syntax</SideNavItem>
          <SideNavItem>Table</SideNavItem>
          <SideNavItem>Tabs</SideNavItem>
          <SideNavItem>Text Input</SideNavItem>
          <SideNavItem>Toast</SideNavItem>
          <SideNavItem>Toggle</SideNavItem>
          <SideNavItem>Tokens</SideNavItem>
          <SideNavItem>Tooltip</SideNavItem>
          <SideNavItem>Typography</SideNavItem>
        </SideNavGroup>
      </SideNav>
    </nav>
  );
}

export default Navigation;
