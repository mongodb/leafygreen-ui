import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Menu from './Menu.tsx';
import MenuItem from './MenuItem.tsx';
import MenuGroup from './MenuGroup.tsx';

class Controlled extends Component {
  render() {
    return (
      <Menu
        align={select('Align', ['top', 'bottom', 'left', 'right'], 'bottom')}
        justify={select('justify', ['start', 'middle', 'end'], 'start')}
        trigger={<button>trigger</button>}
      >
        <MenuGroup>
          <MenuItem disabled title="Atlas" description="cloud.mongodb.com" />
          <MenuItem title="University" description="university.mongodb.com" />
          <MenuItem title="Cloud Support" description="support.mongodb.com" />
          <MenuGroup>
            <MenuItem title="TEST" />
          </MenuGroup>
        </MenuGroup>
        <MenuItem title="Logout" />
      </Menu>
    );
  }
}

class Uncontrolled extends Component {
  state = { active: false };

  render() {
    const { active } = this.state;
    return (
      <>
        <button onClick={() => this.setState({ active: !active })}>
          TRIGGER
        </button>

        <Menu
          align={select('Align', ['top', 'bottom', 'left', 'right'], 'bottom')}
          justify={select('justify', ['start', 'middle', 'end'], 'start')}
          active={active}
        >
          <MenuGroup>
            <MenuItem active title="Atlas" description="cloud.mongodb.com" />
            <MenuItem title="University" description="university.mongodb.com" />
            <MenuItem title="Cloud Support" description="support.mongodb.com" />
          </MenuGroup>
          <MenuItem title="Logout" />
        </Menu>
      </>
    );
  }
}

storiesOf('Dropdown', module)
  .add('Controlled', () => (
    <div>
      <Controlled />
    </div>
  ))
  .add('Uncontrolled', () => (
    <div>
      <Uncontrolled />
    </div>
  ));
