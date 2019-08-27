import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { Tab, Tabs } from './index';

function ControlledTabs() {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <Tabs setSelected={setSelected} selected={selected}>
        <Tab name={text('name', 'Harry Spencer Wolff')}>
          {text('Tab Content', 'Hello 1')}
        </Tab>
        <Tab name="Jeremy Steven Tice">Hello 2</Tab>
        <Tab name="Mark Frederick Truman">Hello 3</Tab>
      </Tabs>
    </div>
  );
}

storiesOf('Tabs', module)
  .add('Uncontrolled', () => (
    <Tabs>
      <Tab
        default={boolean('default', true)}
        name={text('name', 'Brooke Scarlett Yalof')}
      >
        {text('Tab Content', 'Hello 1')}
      </Tab>
      <Tab disabled={boolean('disabled', true)} name="Robert Audroue">
        Hello 2
      </Tab>
      <Tab name="David Scott McCarthy">Hello 3</Tab>
    </Tabs>
  ))
  .add('Controlled', () => <ControlledTabs />);
