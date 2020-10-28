import React from 'react';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import Menu from './Menu';
import MenuSeparator from './MenuSeparator';
import MenuItem, { Size } from './MenuItem';
import SubMenu from './SubMenu';

// eslint-disable-next-line
type MenuExampleInterface = {
  subMenuTitle: string;
  subMenuDescription: React.ReactElement;
  subMenuGlyph: keyof typeof glyphs;
  subMenuActive: boolean;
  subMenuHref?: string | undefined;
  menuItemChildren: string;
  menuItemActive: boolean;
  menuItemDisabled: boolean;
  menuItemSize: Size;
  menuItemGlyph: keyof typeof glyphs;
  menuItemDescription: string;
};

const knobsConfig: KnobsConfigInterface<MenuExampleInterface> = {
  subMenuTitle: {
    type: 'text',
    default: 'Settings',
    label: 'SubMenu Title',
  },
  subMenuDescription: {
    type: 'text',
    default: 'User Settings',
    label: 'SubMenu Description',
  },
  subMenuGlyph: {
    type: 'select',
    options: Object.keys(glyphs),
    default: 'Cloud',
    label: 'SubMenu Glyph',
  },
  subMenuActive: {
    type: 'boolean',
    default: true,
    label: 'SubMenu Active',
  },
  subMenuHref: {
    type: 'select',
    default: undefined,
    options: ['http://mongodb.design', undefined],
    label: 'SubMenu Href',
  },
  menuItemActive: {
    type: 'boolean',
    default: false,
    label: 'MenuItem Active',
  },
  menuItemChildren: {
    type: 'text',
    default: 'Preferences',
    label: 'MenuItem Children',
  },
  menuItemDisabled: {
    type: 'boolean',
    default: false,
    label: 'MenuItem Disabled',
  },
  menuItemSize: {
    type: 'select',
    default: Size.Default,
    options: Object.values(Size),
    label: 'MenuItem Size',
  },
  menuItemDescription: {
    type: 'text',
    default: 'Description text',
    label: 'MenuItem Description',
  },
  menuItemGlyph: {
    type: 'select',
    options: Object.keys(glyphs),
    default: 'Megaphone',
    label: 'SubMenu Glyph',
  },
};

const MenuExample = (props: MenuExampleInterface) => {
  return (
    <LeafyGreenProvider>
      <Menu trigger={<button>trigger</button>}>
        <SubMenu
          title={props.subMenuTitle}
          description={props.subMenuDescription}
          glyph={<Icon glyph={props.subMenuGlyph} />}
          active={props.subMenuActive}
          href={props.subMenuHref}
        >
          <MenuItem active={props.menuItemActive}>
            {props.menuItemChildren}
          </MenuItem>
          <MenuItem size={props.menuItemSize} disabled={props.menuItemDisabled}>
            Security
          </MenuItem>
        </SubMenu>
        <MenuItem
          glyph={<Icon glyph={props.menuItemGlyph} />}
          description={props.menuItemDescription}
        >
          Feedback
        </MenuItem>
        <MenuSeparator />
        <MenuItem>Logout</MenuItem>
      </Menu>
    </LeafyGreenProvider>
  );
};

const MenuLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <MenuExample {...props} />}
    </LiveExample>
  );
};

export { MenuLiveExample };
