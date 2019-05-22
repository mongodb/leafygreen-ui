import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Dropdown from './Dropdown.tsx';
import DropdownItem from './DropdownItem.tsx';
import DropdownGroup from './DropdownGroup.tsx';

class Controlled extends Component {
  state = { active: false };

  render() {
    const { active } = this.state;
    return (
      <Dropdown
        align={select('Align', ['top', 'bottom', 'left', 'right'], 'bottom')}
        justify={select('justify', ['start', 'middle', 'end'], 'start')}
        active={active}
        trigger={<button>trigger</button>}
      >
        <DropdownGroup>
          <DropdownItem>Element A</DropdownItem>
          <DropdownItem>Element B</DropdownItem>
        </DropdownGroup>
        <DropdownItem>Element C</DropdownItem>
      </Dropdown>
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

        <Dropdown
          align={select('Align', ['top', 'bottom', 'left', 'right'], 'bottom')}
          justify={select('justify', ['start', 'middle', 'end'], 'start')}
          active={active}
        >
          <DropdownGroup>
            <DropdownItem>Element A</DropdownItem>
            <DropdownItem>Element B</DropdownItem>
          </DropdownGroup>
          <DropdownItem>Element C</DropdownItem>
        </Dropdown>
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
