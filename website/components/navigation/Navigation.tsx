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
import Components from 'utils/components';

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

const components = Object.values(Components);

const GroupType = {
  Component: 'component',
  Guideline: 'guideline',
} as const;

type GroupType = typeof GroupType[keyof typeof GroupType];

function Content({ isTouchDevice = false }: { isTouchDevice?: boolean }) {
  const router = useRouter();

  const renderGroup = (type: GroupType) => {
    const isGuideline = type === GroupType.Guideline;
    const items = isGuideline ? coreGuidelines : components;

    if (isTouchDevice) {
      return (
        <MobileNavigationGroup
          key={type}
          header={isGuideline ? 'Core Guidelines' : 'Components'}
          initialCollapsed={!router.asPath.includes(type)}
        >
          {items.map(item => {
            const path = `/${type}/${item}`;
            return (
              <MobileNavigationItem
                key={item}
                onClick={() => router.push(path)}
                active={router.asPath === path}
              >
                {item.split('-').join(' ')}
              </MobileNavigationItem>
            );
          })}
        </MobileNavigationGroup>
      );
    }

    return (
      <SideNavGroup
        key={type}
        header={isGuideline ? 'Core Guidelines' : 'Components'}
        collapsible
        initialCollapsed={false}
      >
        {items.map(item => {
          const path = `/${type}/${item}`;
          return (
            <SideNavItem
              key={item}
              onClick={() => router.push(path)}
              active={router.asPath === path}
            >
              {item.split('-').join(' ')}
            </SideNavItem>
          );
        })}
      </SideNavGroup>
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
