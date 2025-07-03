import React from 'react';
import { Tabs, Tab } from '@leafygreen-ui/tabs';

function App() {
  return (
    <>
    <Tabs>
      <Tab name="Tab 1" default>Content 1</Tab>
      <Tab name="Tab 2">Content 2</Tab>
    </Tabs>
    <Tabs value="Tab 1" onValueChange={() => {}}>
      <Tab name="Tab 1">Content 1</Tab>
      <Tab name="Tab 2">Content 2</Tab>
    </Tabs>
    <Tabs value={1} onValueChange={() => {}}>
      <Tab name="Tab 1">Content 1</Tab>
      <Tab name="Tab 2">Content 2</Tab>
    </Tabs>
    </>
  );
}
