import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Tab, Tabs } from './index';

function ControlledTabs() {
  const [selected, setSelected] = useState(0);
  const darkMode = boolean('darkMode', false);

  return (
    <LeafyGreenProvider>
      <Tabs
        setSelected={setSelected}
        selected={selected}
        darkMode={darkMode}
        className={css`
          background-color: ${!darkMode ? 'white' : uiColors.gray.dark3};
          padding: 20px;
        `}
      >
        <Tab name={text('name', 'Harry Spencer Wolff')}>
          {text('Tab Content', 'Hello 1')}
        </Tab>
        <Tab disabled name="Jeremy Steven Tice">
          Hello 2
        </Tab>
        <Tab name="Mark Frederick Truman">Hello 3</Tab>
      </Tabs>
    </LeafyGreenProvider>
  );
}

storiesOf('Tabs', module)
  .add('Uncontrolled', () => {
    const darkMode = boolean('darkMode', false);

    return (
      <LeafyGreenProvider>
        <Tabs
          darkMode={darkMode}
          className={css`
            background-color: ${!darkMode ? 'white' : uiColors.gray.dark3};
            padding: 20px;
          `}
        >
          <Tab
            default={boolean('default', true)}
            name={text('name', 'Brooke Scarlett Yalof')}
          >
            {text('Tab Content', 'Hello 1')}
          </Tab>
          <Tab name="Robert Arnold Audroue Robert Arnold Audroue Robert Arnold Audroue Robert Arnold Audroue Robert Arnold Audroue Robert Arnold Audroue">
            Hello 2
          </Tab>
          <Tab disabled={boolean('disabled', true)} name="David Scott McCarthy">
            Hello 3
          </Tab>
        </Tabs>
      </LeafyGreenProvider>
    );
  })
  .add('Controlled', () => <ControlledTabs />);
