import React from 'react';

import LiveExample, { KnobsConfigInterface } from 'components/live-example';

import Icon from '@leafygreen-ui/icon';
import { uiColors } from '@leafygreen-ui/palette/dist';
import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';

import { css } from '@emotion/css';

// When interface is used, ts complains that index signature is missing
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Knobs = {
  header: string;
  active: boolean;
  disabled: boolean;
  collapsible: boolean;
  children: string;
  glyph: boolean;
  baseFontSize: 14 | 16;
  widthOverride: number;
  darkMode: boolean;
};

const knobsConfig: KnobsConfigInterface<Knobs> = {
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  header: {
    type: 'text',
    default: 'Organization',
    label: 'Group: Header Text',
  },
  glyph: {
    type: 'boolean',
    default: true,
    label: 'Group: Header Glyph',
  },
  collapsible: {
    type: 'boolean',
    default: true,
    label: 'Group: Collapsible',
  },
  active: {
    type: 'boolean',
    default: true,
    label: 'Item: Active',
  },
  disabled: {
    type: 'boolean',
    default: true,
    label: 'Item: Disabled',
  },
  children: {
    type: 'text',
    default: 'Admin',
    label: 'Item: Text',
  },
  baseFontSize: {
    type: 'select',
    default: 14,
    label: 'Base Font Size',
    options: [14, 16],
  },
  widthOverride: {
    type: 'number',
    default: 184,
    label: 'Width Override',
  },
};

function DefaultExample({
  header,
  active,
  disabled,
  collapsible,
  children,
  glyph,
  baseFontSize,
  widthOverride,
  darkMode,
}: Knobs) {
  const collapsibleProps = collapsible
    ? ({
        collapsible: true,
        initialCollapsed: false,
      } as const)
    : ({
        collapsible: false,
      } as const);

  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 16px;
        min-height: 500px;
        border: 1px solid ${uiColors.gray.light2};
      `}
    >
      <SideNav
        darkMode={darkMode}
        baseFontSize={baseFontSize}
        widthOverride={widthOverride}
      >
        <SideNavItem glyph={<Icon glyph="Calendar" />}>
          Ungrouped Item
        </SideNavItem>

        <SideNavGroup
          {...collapsibleProps}
          glyph={glyph ? <Icon glyph="Building" /> : undefined}
          header={header}
        >
          <SideNavItem active={active}>Projects</SideNavItem>
          <SideNavItem disabled={disabled}>Alerts</SideNavItem>
          <SideNavItem>Activity Feed</SideNavItem>
          <SideNavItem>Settings</SideNavItem>
          <SideNavItem>Access Manager</SideNavItem>
          <SideNavItem>Billing</SideNavItem>
          <SideNavItem>Support</SideNavItem>
          <SideNavItem>{children}</SideNavItem>
        </SideNavGroup>
      </SideNav>

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
        officiis veniam qui eveniet laborum deserunt molestiae. Facilis nostrum
        quibusdam laudantium eos aliquid. Unde laudantium sit molestias
        architecto cupiditate officiis accusamus.
      </div>
    </div>
  );
}

export default function SideNavLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <DefaultExample {...props} />}
    </LiveExample>
  );
}
