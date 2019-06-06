import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';

import { Menu, MenuGroup, MenuItem } from './index';
import { Align, Justify } from '@leafygreen-ui/popover';

function Controlled() {
  return (
    <Menu
      align={select('Align', Object.values(Align), Align.Bottom)}
      justify={select('Justify', Object.values(Justify), Justify.Start)}
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
          align={select('Align', Object.values(Align), Align.Bottom)}
          justify={select('Justify', Object.values(Justify), Justify.Start)}
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
