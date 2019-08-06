import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { Tab, Tabs } from './index';

function ControlledTabs() {
  const [activeTab, setActiveTab] = useState<any>('test1');

  const changeHandler = (e: React.SyntheticEvent<Element, MouseEvent>) => {
    setActiveTab((e.target as HTMLLIElement).getAttribute('data-tab-id'));
  };

  return (
    <div>
      <Tabs onChange={changeHandler} selected={activeTab}>
        <Tab value="test1" tabTitle={text('tabTitle', 'Harry Spencer Wolff')}>
          {text('Tab Content', 'Hello 1')}
        </Tab>
        <Tab value="test2" tabTitle="Jeremy Steven Tice">
          Hello 2
        </Tab>
        <Tab value="test3" tabTitle="Mark Frederick Truman">
          Hello 3
        </Tab>
      </Tabs>
    </div>
  );
}

storiesOf('Tabs', module)
  .add('Uncontrolled', () => (
    <Tabs>
      <Tab
        default={boolean('default', true)}
        value="test1"
        tabTitle={text('tabTitle', 'Brooke Scarlett Yalof')}
      >
        {text('Tab Content', 'Hello 1')}
      </Tab>
      <Tab
        disabled={boolean('disabled', true)}
        value="test2"
        tabTitle="Robert Audroue"
      >
        Hello 2
      </Tab>
      <Tab value="test3" tabTitle="David Scott McCarthy">
        Hello 3
      </Tab>
    </Tabs>
  ))
  .add('Controlled', () => <ControlledTabs />);
