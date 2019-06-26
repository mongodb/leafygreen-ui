import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Tab, Tabs } from './index';

function ControlledTabs() {
  const [activeTab, setActiveTab] = useState('test1')

  const changeHandler: React.EventHandler<React.MouseEvent> = e => setActiveTab((e.target as HTMLElement).getAttribute('data-tab-id') || 'test1')

  return (
    <Tabs onChange={changeHandler}>
      <Tab active={activeTab === 'test1'} value="test1" title="Title 1">
        Hello 1
      </Tab>
      <Tab active={activeTab === 'test2'} value="test2" title="Title 2">
        Hello 2
      </Tab>
      <Tab active={activeTab === 'test3'} value="test3" title="Title 3">
        Hello 3
      </Tab>
    </Tabs>
  )
}

storiesOf('Tabs', module)
.add('uncontrolled', () => (
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
.add('controlled', () => <ControlledTabs />);
