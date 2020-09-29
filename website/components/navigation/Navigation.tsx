import React from 'react';
import { css } from 'emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';
import { useViewportSize } from '@leafygreen-ui/hooks';
import MDBDesignLogo from '../logos/MDBDesignLogo';
import MobileNavigationGroup from './MobileNavigationGroup';
import MobileNavigationItem from './MobileNavigationItem';
import MobileNavigation from './MobileNavigation';

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
  margin-bottom: ${spacing[4]}px;
`;

function Navigation() {
  const viewport = useViewportSize();
  const isMobile = viewport?.width < 768;
  const Group = isMobile ? MobileNavigationGroup : SideNavGroup;
  const Item = isMobile ? MobileNavigationItem : SideNavItem;

  const groupProps =
    !isMobile &&
    ({
      collapsible: true,
      initialCollapsed: false,
    } as const);

  const content = (
    <>
      <Group header="Core Guidelines" {...groupProps}>
        <Item>Logos</Item>
        <Item>User Personas</Item>
        <Item>Tone</Item>
        <Item>Colors</Item>
        <Item>Illustration</Item>
        <Item>Typography</Item>
      </Group>
      <Group header="Components" {...groupProps}>
        <Item>Badges</Item>
        <Item>Banners</Item>
        <Item>Box</Item>
        <Item>Button</Item>
        <Item>Callout</Item>
        <Item>Code</Item>
        <Item>Confirmation Modal</Item>
        <Item>Icons</Item>
        <Item>Icon Button</Item>
        <Item>Inline Definition</Item>
        <Item>Logo</Item>
        <Item>Marketing Modal</Item>
        <Item>Menu</Item>
        <Item>Modal</Item>
        <Item>Mongo Nav</Item>
        <Item>Palette</Item>
        <Item>Pipeline</Item>
        <Item>Popover</Item>
        <Item>Portal</Item>
        <Item>Radio Box Group</Item>
        <Item>Radio Group</Item>
        <Item>Side Nav</Item>
        <Item>Stepper</Item>
        <Item>Syntax</Item>
        <Item>Table</Item>
        <Item>Tabs</Item>
        <Item>Text Input</Item>
        <Item>Toast</Item>
        <Item>Toggle</Item>
        <Item>Tokens</Item>
        <Item>Tooltip</Item>
        <Item>Typography</Item>
      </Group>
    </>
  );

  if (isMobile) {
    return <MobileNavigation>{content}</MobileNavigation>;
  }

  return (
    <nav className={navWidth}>
      <MDBDesignLogo className={logoStyles} />
      <SideNav>{content}</SideNav>
    </nav>
  );
}

export default Navigation;
