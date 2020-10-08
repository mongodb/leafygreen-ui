import React from 'react';
import { useRouter } from 'next/router';
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

const coreGuidelines = [
  'logos',
  'user-personas',
  'tone',
  'colors',
  'illustration',
  'typography',
];

const components = [
  'badge',
  'banner',
  'box',
  'button',
  'callout',
  'code',
  'confirmation-modal',
  'icon',
  'icon-button',
  'inline-definition',
  'logo',
  'marketing-modal',
  'menu',
  'modal',
  'mongo-nav',
  'palette',
  'pipeline',
  'popover',
  'portal',
  'radio-box-group',
  'radio-group',
  'side-nav',
  'stepper',
  'syntax',
  'table',
  'tabs',
  'text-input',
  'toast',
  'toggle',
  'tokens',
  'tooltip',
  'typography',
];

// add transition to mobile navigation

function Content({ isMobile = false }: { isMobile?: boolean }) {
  const router = useRouter();

  const Group = isMobile ? MobileNavigationGroup : SideNavGroup;
  const Item = isMobile ? MobileNavigationItem : SideNavItem;
  const groupProps = isMobile
    ? undefined
    : ({
        collapsible: true,
        initialCollapsed: false,
      } as const);

  return (
    <>
      <Group header="Core Guidelines" {...groupProps}>
        {coreGuidelines.map(item => (
          <Item key={item} onClick={() => router.push(`/guideline/${item}`)}>
            {item.split('-').join(' ')}
          </Item>
        ))}
      </Group>
      <Group header="Components" {...groupProps}>
        {components.map(item => (
          <Item key={item} onClick={() => router.push(`/component/${item}`)}>
            {item.split('-').join(' ')}
          </Item>
        ))}
      </Group>
    </>
  );
}

function Navigation() {
  const viewport = useViewportSize();
  const isMobile = !!viewport && viewport.width < 768;

  if (isMobile) {
    return (
      <MobileNavigation>
        <Content isMobile />
      </MobileNavigation>
    );
  }

  return (
    <nav className={navWidth}>
      <MDBDesignLogo className={logoStyles} />
      <SideNav>
        <Content />
      </SideNav>
    </nav>
  );
}

export default Navigation;
