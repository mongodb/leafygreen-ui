import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Menu from './Menu.tsx';
import MenuItem from './MenuItem.tsx';
import MenuList from './MenuList.tsx';

class Example extends Component {
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
          <MenuList>
            <MenuItem>Element A</MenuItem>
            <MenuItem>Element B</MenuItem>
          </MenuList>
          <MenuItem>Element C</MenuItem>
        </Menu>
      </>
    );
  }
}

storiesOf('Menu', module).add('Default', () => (
  <div>
    <Example />
  </div>
));
