import React from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/css';
import { spacing, breakpoints } from '@leafygreen-ui/tokens';
import {
  SideNav,
  SideNavGroup,
  SideNavItem,
  CollapsedSideNavItem,
} from '@leafygreen-ui/side-nav';
import { useViewportSize } from '@leafygreen-ui/hooks';
import Icon from '@leafygreen-ui/icon';
import MDBDesignLogo from 'components/svgs/MDBDesignLogo';
import { LogoMark } from '@leafygreen-ui/logo';
import { HOME_PAGE } from 'utils/routes';
import { Component } from 'utils/types';
import MobileNavigationGroup from './MobileNavigationGroup';
import MobileNavigationItem from './MobileNavigationItem';
import MobileNavigation from './MobileNavigation';

const logoStyles = css`
  // adds back spacing that was already built into side nav
  margin: 12px 0 ${spacing[4]}px ${spacing[3]}px;
  cursor: pointer;
`;

const components: Array<Component> = [
  'badge',
  'banner',
  'box',
  'button',
  'callout',
  'card',
  'checkbox',
  'code',
  'confirmation-modal',
  'copyable',
  'icon',
  'icon-button',
  'inline-definition',
  'logo',
  'marketing-modal',
  'menu',
  'modal',
  'palette',
  'pipeline',
  'popover',
  'portal',
  'radio-box-group',
  'radio-group',
  'segmented-control',
  'select',
  'side-nav',
  'stepper',
  'table',
  'tabs',
  'text-area',
  'text-input',
  'toast',
  'toggle',
  'tokens',
  'tooltip',
  'typography',
];

function Content({ isTouchDevice = false }: { isTouchDevice?: boolean }) {
  const router = useRouter();
  const activePage = router.asPath.split('/')[2];

  const renderGroup = () => {
    if (isTouchDevice) {
      return (
        <>
          <MobileNavigationGroup header="Foundations">
            <MobileNavigationItem
              onClick={() => router.push('/foundation/icon-creation')}
              active={'icon-creation' === activePage}
            >
              Icon Creation
            </MobileNavigationItem>
            <MobileNavigationItem
              onClick={() => router.push('/foundation/grid')}
              active={'grid' === activePage}
            >
              Grid
            </MobileNavigationItem>
          </MobileNavigationGroup>
          <MobileNavigationGroup
            header="Components"
            initialCollapsed={false} // Always false until we add more sections to navigation
          >
            {components.map(item => {
              return (
                <MobileNavigationItem
                  key={item}
                  onClick={() => router.push(`/component/${item}/example`)}
                  active={item === activePage}
                >
                  {item.split('-').join(' ')}
                </MobileNavigationItem>
              );
            })}
          </MobileNavigationGroup>
        </>
      );
    }

    return (
      <>
        <SideNavGroup header="Foundations" glyph={<Icon glyph="University" />}>
          <SideNavItem
            onClick={() => router.push('/foundation/icon-creation')}
            active={'icon-creation' === activePage}
          >
            Icon Creation
          </SideNavItem>
          <SideNavItem
            onClick={() => router.push('/foundation/grid')}
            active={'grid' === activePage}
          >
            Grid
          </SideNavItem>
        </SideNavGroup>
        <SideNavGroup header="Components" glyph={<Icon glyph="Apps" />}>
          {components.map(item => {
            return (
              <SideNavItem
                key={item}
                onClick={() => router.push(`/component/${item}/example`)}
                active={item === activePage}
              >
                {item.split('-').join(' ')}
              </SideNavItem>
            );
          })}
        </SideNavGroup>
      </>
    );
  };

  return renderGroup();
}

Content.displayName = 'Content';

function Navigation() {
  const { push } = useRouter();
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
    <SideNav
      aria-label="LeafyGreen Design System"
      className={css`
        z-index: 1;
      `}
    >
      <MDBDesignLogo className={logoStyles} onClick={() => push(HOME_PAGE)} />
      <CollapsedSideNavItem
        className={css`
          background-color: #09804c;
          // Some CSS trickery to make the item not respect the overall padding in the side navigation.
          // 1px pixel-pushing for aesthetics.
          margin-top: -${spacing[3] + 1}px;
          height: calc(25px + ${spacing[4] * 2}px + ${spacing[3]}px);
        `}
      >
        <LogoMark knockout darkMode height={24} />
      </CollapsedSideNavItem>
      <Content />
    </SideNav>
  );
}

Navigation.displayName = 'Navigation';

export default Navigation;
