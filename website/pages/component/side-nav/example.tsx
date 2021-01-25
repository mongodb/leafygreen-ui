import React from 'react';
import { css } from 'emotion';
import {
  SideNav,
  SideNavGroup,
  SideNavItem,
  sideNavWidth,
} from '@leafygreen-ui/side-nav';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

// When interface is used, ts complains that index signature is missing
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Knobs = {
  label: string;
  active: boolean;
  disabled: boolean;
  collapsible: boolean;
  collapsibleGroup: boolean;
  children: string;
};

const knobsConfig: KnobsConfigInterface<Knobs> = {
  label: {
    type: 'text',
    default: 'Organization',
    label: 'Label',
  },
  active: {
    type: 'boolean',
    default: true,
    label: 'Active',
  },
  disabled: {
    type: 'boolean',
    default: true,
    label: 'Disabled',
  },
  collapsible: {
    type: 'boolean',
    default: true,
    label: 'Collapsible',
  },
  collapsibleGroup: {
    type: 'boolean',
    default: true,
    label: 'Collapsible group',
  },
  children: {
    type: 'text',
    default: 'Admin',
    label: 'Children',
  },
};

function DefaultExample({
  label,
  active,
  disabled,
  collapsible,
  collapsibleGroup,
  children,
}: Knobs) {
  const collapsibleProps = collapsible
    ? ({
        collapsible: true,
        initialCollapsed: false,
      } as const)
    : ({
        collapsible: false,
      } as const);

  const collapsibleGroupProps = collapsibleGroup
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
        position: relative;
        height: 400px;
        width: ${sideNavWidth}px;
      `}
    >
      <SideNav
        {...collapsibleProps}
        currentPath={active ? 'Projects' : undefined}
      >
        <SideNavGroup {...collapsibleGroupProps} label={label}>
          <SideNavItem>Projects</SideNavItem>
          <SideNavItem disabled={disabled}>Alerts</SideNavItem>
          <SideNavItem>Activity Feed</SideNavItem>
          <SideNavItem>Settings</SideNavItem>
          <SideNavItem>Access Manager</SideNavItem>
          <SideNavItem>Billing</SideNavItem>
          <SideNavItem>Support</SideNavItem>
          <SideNavItem>{children}</SideNavItem>
        </SideNavGroup>
      </SideNav>
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
