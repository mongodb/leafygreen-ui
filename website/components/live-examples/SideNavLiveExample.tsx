import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

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
    default: 'Header',
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
    default: 'Text!',
    label: 'children',
  },
};

function DefaultExample({
  header,
  active,
  disabled,
  collapsible,
  children,
}: Knobs) {
  return (
    <LeafyGreenProvider>
      <SideNav>
        <SideNavGroup
          header={header}
          collapsible={collapsible}
          initialCollapsed={false}
        >
          <SideNavItem active={active}>Active State</SideNavItem>
          <SideNavItem disabled={disabled}>Disabled State</SideNavItem>
          <SideNavItem>{children}</SideNavItem>
        </SideNavGroup>
      </SideNav>
    </LeafyGreenProvider>
  );
}

export default function SideNavLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <DefaultExample {...props} />}
    </LiveExample>
  );
}
