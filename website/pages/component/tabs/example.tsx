import React from 'react';
import { css } from 'emotion';
import { Tab, Tabs } from '@leafygreen-ui/tabs';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

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
    default: 'Users',
    label: 'Name',
  },
  children: {
    type: 'text',
    default: 'Find a user',
    label: 'Children',
  },
};

export default function TabsLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ children, name, disabled, darkMode }) => (
        <div
          className={css`
            min-width: 400px;
          `}
        >
          <Tabs darkMode={darkMode}>
            <Tab default disabled={disabled} name={name}>
              {children}
            </Tab>
            <Tab name="Teams">Grant teams of users access to projects</Tab>
            <Tab name="API Keys">Manage your infrastructure in code</Tab>
          </Tabs>
        </div>
      )}
    </LiveExample>
  );
}
