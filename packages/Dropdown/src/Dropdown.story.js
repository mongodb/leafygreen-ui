import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Dropdown from './Dropdown.tsx';
import DropdownItem from './DropdownItem.tsx';
import DropdownGroup from './DropdownGroup.tsx';

class Controlled extends Component {
  render() {
    return (
      <Dropdown
        align={select('Align', ['top', 'bottom', 'left', 'right'], 'bottom')}
        justify={select('justify', ['start', 'middle', 'end'], 'start')}
        trigger={<button>trigger</button>}
      >
        <DropdownGroup>
          <DropdownItem title="Atlas" description="cloud.mongodb.com" />
          <DropdownItem
            title="University"
            description="university.mongodb.com"
          />
          <DropdownItem
            title="Cloud Support"
            description="support.mongodb.com"
          />
        </DropdownGroup>
        <DropdownItem title="Logout" />
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
            <DropdownItem
              active
              title="Atlas"
              description="cloud.mongodb.com"
            />
            <DropdownItem
              title="University"
              description="university.mongodb.com"
            />
            <DropdownItem
              title="Cloud Support"
              description="support.mongodb.com"
            />
          </DropdownGroup>
          <DropdownItem title="Logout" />
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
