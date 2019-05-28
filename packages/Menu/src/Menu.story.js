import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';

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
          title="Atlas"
          description="cloud.mongodb.com"
          disabled={boolean('disabled', false)}
        />
        <MenuItem title="University" description="university.mongodb.com" />
        <MenuItem
          title="Cloud Support"
          description="support.mongodb.com"
          active={boolean('active', true)}
        />
      </MenuGroup>
      <MenuItem title="Logout" />
    </Menu>
  );
}

function Uncontrolled() {
  const [active, setActive] = useState(false);
  return (
    <>
      <button onClick={() => setActive(!active)}>TRIGGER</button>
      <Menu
        align={select('Align', ['top', 'bottom', 'left', 'right'], 'bottom')}
        justify={select('justify', ['start', 'middle', 'end'], 'start')}
        active={active}
      >
        <MenuGroup>
          <MenuItem
            title="Atlas"
            description="cloud.mongodb.com"
            disabled={boolean('disabled', false)}
          />
          <MenuItem title="University" description="university.mongodb.com" />
          <MenuItem
            title="Cloud Support"
            description="support.mongodb.com"
            active={boolean('active', true)}
          />
          <MenuGroup>
            <MenuItem
              title={text('title text', 'Title text')}
              description={text('descriptiontext text', 'Description text')}
            />
          </MenuGroup>
        </MenuGroup>
        <MenuItem title="Logout" />
      </Menu>
    </>
  );
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
