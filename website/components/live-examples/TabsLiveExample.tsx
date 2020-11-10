import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Tab, Tabs } from '@leafygreen-ui/tabs';

const knobsConfig: KnobsConfigInterface<{
  darkMode: boolean;
  disabled: boolean;
  name: string;
  children: string;
}> = {
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled',
  },
  name: {
    type: 'text',
    default: 'Lorem Ipsum',
    label: 'Name',
  },
  children: {
    type: 'text',
    default:
      'Enim praesent elementum facilisis leo. Magnis dis parturient montes nascetur.',
    label: 'Children',
  },
};

const TabsLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ children, name, disabled, darkMode }) => (
        <LeafyGreenProvider>
          <Tabs darkMode={darkMode}>
            <Tab default disabled={disabled} name={name}>
              {children}
            </Tab>
            <Tab name="Qui officia deserunt mollit">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
            </Tab>
            <Tab name="Vulputate mi sit amet">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
            </Tab>
          </Tabs>
        </LeafyGreenProvider>
      )}
    </LiveExample>
  );
};

export default TabsLiveExample;
