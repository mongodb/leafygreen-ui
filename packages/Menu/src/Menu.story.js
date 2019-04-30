import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Menu from './Menu.tsx';
import MenuItem from './MenuItem.tsx';
import MenuList from './MenuList.tsx';

class TestClass extends Component {
  state = { active: false };
  myRef = React.createRef();

  render() {
    const { active } = this.state;
    return (
      <>
        <button
          ref={this.myRef}
          onClick={() => this.setState({ active: !active })}
        >
          TRIGGER
        </button>
        <Menu
          align={select('Align', ['top', 'bottom', 'left', 'right'], 'bottom')}
          justify={select('justify', ['start', 'middle', 'end'], 'start')}
          refEl={this.myRef}
          active={active}
          withoutPortal
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
    <TestClass />
  </div>
));
