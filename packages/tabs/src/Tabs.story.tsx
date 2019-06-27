import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Tab, Tabs } from './index';

function ControlledTabs() {
  const [activeTab, setActiveTab] = useState<string | null>('test1');

  const changeHandler = (e: React.SyntheticEvent<Element, MouseEvent>) => {
    setActiveTab((e.target as HTMLLIElement).getAttribute('data-tab-id'));
  };

  return (
    <div>
      <Tabs onChange={changeHandler} selected={activeTab}>
        <Tab value="test1" title="Title 1">
          Hello 1
        </Tab>
        <Tab disabled value="test2" title="Title 2">
          Hello 2
        </Tab>
        <Tab value="test3" title="Title 3">
          Hello 3
        </Tab>
      </Tabs>
    </div>
  );
}

storiesOf('Tabs', module)
  .add('Uncontrolled', () => (
    <Tabs>
      <Tab value="test1" title="Title 1">
        Hello 1
      </Tab>
      <Tab default value="test2" title="Title 2">
        Hello 2
      </Tab>
      <Tab value="test3" title="Title 3">
        Hello 3
      </Tab>
    </Tabs>
  ))
  .add('Controlled', () => <ControlledTabs />);
