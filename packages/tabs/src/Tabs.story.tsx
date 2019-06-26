import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tab, Tabs } from './index';

storiesOf('Tabs', module).add('Default', () => (
  <Tabs defaultSelected="test1" onChange={() => console.log('test')}>
    <Tab id="test1" title="Title 1">
      Hello 1
    </Tab>
    <Tab id="test2" title="Title 2">
      Hello 2
    </Tab>
    <Tab id="test3" title="Title 3">
      Hello 3
    </Tab>
  </Tabs>
));
