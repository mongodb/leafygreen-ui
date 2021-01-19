import React from 'react';
import { css } from 'emotion';
import { Tab, Tabs } from '@leafygreen-ui/tabs';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';
import { uiColors } from '@leafygreen-ui/palette/dist';

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
          <Tabs darkMode={darkMode} aria-label="Example usage of Tab component">
            <Tab default name={name}>
              <div
                className={css`
                  color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
                `}
              >
                {children}
              </div>
            </Tab>
            <Tab name="Teams">
              <div
                className={css`
                  color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
                `}
              >
                Grant teams of users access to projects
              </div>
            </Tab>
            <Tab name="API Keys" disabled={disabled}>
              <div
                className={css`
                  color: ${darkMode ? uiColors.white : uiColors.gray.dark3};
                `}
              >
                Manage your infrastructure in code
              </div>
            </Tab>
          </Tabs>
        </div>
      )}
    </LiveExample>
  );
}
