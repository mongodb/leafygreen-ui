import React from 'react';
import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';
import Icon from '@leafygreen-ui/icon';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';
import { css } from 'emotion';
import { uiColors } from '@leafygreen-ui/palette/dist';

// When interface is used, ts complains that index signature is missing
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Knobs = {
  header: string;
  active: boolean;
  disabled: boolean;
  collapsible: boolean;
  children: string;
  glyph: boolean;
};

const knobsConfig: KnobsConfigInterface<Knobs> = {
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
};

function DefaultExample({
  header,
  active,
  disabled,
  collapsible,
  children,
  glyph,
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
        height: 500px;
        border: 1px solid ${uiColors.gray.light2};
      `}
    >
      <SideNav>
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
