import React from 'react';
import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

// When interface is used, ts complains that index signature is missing
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Knobs = {
  header: string;
  active: boolean;
  disabled: boolean;
  collapsible: boolean;
  children: string;
};

const knobsConfig: KnobsConfigInterface<Knobs> = {
  header: {
    type: 'text',
    default: 'Organization',
    label: 'Header',
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
  children: {
    type: 'text',
    default: 'Admin',
    label: 'Children',
  },
};

function DefaultExample({
  header,
  active,
  disabled,
  collapsible,
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

  return (
    <SideNav>
      <SideNavGroup {...collapsibleProps} header={header}>
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
  );
}

export default function SideNavLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <DefaultExample {...props} />}
    </LiveExample>
  );
}
