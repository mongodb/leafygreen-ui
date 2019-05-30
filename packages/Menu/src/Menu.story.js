import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';

import Menu from './Menu.tsx';
import MenuItem from './MenuItem.tsx';
import MenuGroup from './MenuGroup.tsx';

function Controlled() {
  return (
    <Menu
      align={select('Align', ['top', 'bottom', 'left', 'right'], 'bottom')}
      justify={select('justify', ['start', 'middle', 'end'], 'start')}
      trigger={<button>trigger</button>}
    >
      <MenuGroup>
        <MenuItem
          description="cloud.mongodb.com"
          disabled={boolean('disabled', false)}
        >
          Atlas
        </MenuItem>
        <MenuItem description="university.mongodb.com">University</MenuItem>
        <MenuItem
          description="support.mongodb.com"
          active={boolean('active', true)}
        >
          Cloud Support
        </MenuItem>
      </MenuGroup>
      <MenuItem>Logout</MenuItem>
    </Menu>
  );
}

function Uncontrolled() {
  const [active, setActive] = useState(false);
  return (
    <>
      <button onClick={() => setActive(!active)}>
        trigger
        <Menu
          align={select('Align', ['top', 'bottom', 'left', 'right'], 'bottom')}
          justify={select('justify', ['start', 'middle', 'end'], 'start')}
          active={active}
        >
          <MenuGroup>
            <MenuItem
              description="cloud.mongodb.com"
              disabled={boolean('disabled', false)}
            >
              Atlas
            </MenuItem>
            <MenuItem description="university.mongodb.com">University</MenuItem>
            <MenuItem
              description="support.mongodb.com"
              active={boolean('active', true)}
            >
              Cloud Support
            </MenuItem>
          </MenuGroup>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </button>
    </>
  );
}

storiesOf('Menu', module)
  .add('Controlled', () => <Controlled />)
  .add('Uncontrolled', () => <Uncontrolled />);
