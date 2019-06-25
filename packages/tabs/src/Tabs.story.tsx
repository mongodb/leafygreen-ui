import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tab, Tabs } from './index';

storiesOf('Tabs', module).add('Default', () => (
  <Tabs>
    <Tab id="test" title="test">hi1</Tab>
    <Tab id="tes2t" title="test">hi2</Tab>
    <Tab id="test3" title="test">hi3</Tab>
  </Tabs>
));
