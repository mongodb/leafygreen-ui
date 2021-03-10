import React from 'react';
import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';
import { css } from 'emotion';

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
    <div
      className={css`
        display: grid;
        grid-template-columns: auto 1fr;
        height: 500px;
      `}
    >
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
