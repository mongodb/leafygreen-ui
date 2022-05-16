import React, { Key } from 'react';
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
import { MongoDBLogo, MongoDBLogoMark } from '@leafygreen-ui/logo';
import { HOME_PAGE } from 'utils/routes';
import { Component } from 'utils/types';
import MobileNavigationGroup from './MobileNavigationGroup';
import MobileNavigationItem from './MobileNavigationItem';
import MobileNavigation from './MobileNavigation';

const sideNavStyles = css`
  z-index: 1;

  li {
    margin: 6px 0;
  }
`;

const logoStyles = css`
  cursor: pointer;
`;

const logoLinkStyles = css`
  display: inline-block;
  // adds back spacing that was already built into side nav
  margin: 12px 0 ${spacing[4]}px ${spacing[3]}px;
`;

const foundations: Array<String> = [
  'accessibility',
  'forms',
  'grid',
  'icon-creation',
  'refresh-guide',
];

const components: Array<Component> = [
  'badge',
  'banner',
  'box',
  'button',
  'callout',
  'card',
  'checkbox',
  'code',
  'combobox',
  'confirmation-modal',
  'copyable',
  'form-footer',
  'expandable-card',
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
            {foundations.map(item => (
              <MobileNavigationItem
                key={item as Key}
                onClick={() => router.push(`/foundation/${item}`)}
                active={item === activePage}
              >
                {item.split('-').join(' ')}
              </MobileNavigationItem>
            ))}
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
          {foundations.map(item => (
            <SideNavItem
              key={item as Key}
              onClick={() => router.push(`/foundation/${item}`)}
              active={item === activePage}
            >
              {item.split('-').join(' ')}
            </SideNavItem>
          ))}
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
    <SideNav aria-label="LeafyGreen Design System" className={sideNavStyles}>
      <a
        className={logoLinkStyles}
        href="/"
        onClick={e => {
          e.preventDefault();
          push(HOME_PAGE);
        }}
      >
        <MongoDBLogo height={32} className={logoStyles} />
      </a>
      <CollapsedSideNavItem
        className={css`
          background-color: #09804c;
          // Some CSS trickery to make the item not respect the overall padding in the side navigation.
          // 1px pixel-pushing for aesthetics.
          margin-top: -${spacing[3] + 1}px;
          height: calc(25px + ${spacing[4] * 2}px + ${spacing[3]}px);
        `}
      >
        <MongoDBLogoMark color="white" height={24} />
      </CollapsedSideNavItem>
      <Content />
    </SideNav>
  );
}

Navigation.displayName = 'Navigation';

export default Navigation;
