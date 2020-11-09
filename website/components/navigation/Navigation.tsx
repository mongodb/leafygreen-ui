import React from 'react';
import { useRouter } from 'next/router';
import { css } from 'emotion';
import { spacing, breakpoints } from '@leafygreen-ui/tokens';
import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';
import { useViewportSize } from '@leafygreen-ui/hooks';
import MDBDesignLogo from 'components/svgs/MDBDesignLogo';
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
  margin: 12px 0 ${spacing[4]}px ${spacing[3]}px;
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

const GroupType = {
  Component: 'component',
  Guideline: 'guideline',
} as const;

type GroupType = typeof GroupType[keyof typeof GroupType];

function Content({ isTouchDevice = false }: { isTouchDevice?: boolean }) {
  const router = useRouter();

  const Group = isTouchDevice ? MobileNavigationGroup : SideNavGroup;
  const Item = isTouchDevice ? MobileNavigationItem : SideNavItem;

  const renderGroup = (type: GroupType) => {
    const isGuideline = type === GroupType.Guideline;
    const items = isGuideline ? coreGuidelines : components;

    const collapsibleProp = isTouchDevice && { collapsible: true } as const

    return (
      <Group
        {...collapsibleProp}
        key={type}
        header={isGuideline ? 'Core Guidelines' : 'Components'}
        initialCollapsed={isTouchDevice ? !router.asPath.includes(type) : false}
      >
        {items.map(item => {
          const path = `/${type}/${item}`;
          return (
            <Item
              key={item}
              onClick={() => router.push(path)}
              active={router.asPath === path}
            >
              {item.split('-').join(' ')}
            </Item>
          );
        })}
      </Group>
    );
  };

  return <>{[GroupType.Guideline, GroupType.Component].map(renderGroup)}</>;
}

function Navigation() {
  const viewport = useViewportSize();
  const isTouchDevice = !!viewport && viewport.width < breakpoints.Desktop;

  if (isTouchDevice) {
    return (
      <MobileNavigation>
        <Content isTouchDevice />
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
