import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import Icon from '@leafygreen-ui/icon';
import { Tab, Tabs } from './index';

function ControlledTabs() {
  const [selected, setSelected] = useState(0);
  const darkMode = boolean('darkMode', false);

  return (
    <LeafyGreenProvider>
      <Tabs
        aria-label="Tabs to demonstrate usage of Leafygreen UI Tab Components"
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
        <Tab
          name={
            <div>
              <Icon glyph="Support" /> Jeremy Steven Tice
            </div>
          }
        >
          Hello 2
        </Tab>
        <Tab name="Mark Frederick Truman">Hello 3</Tab>
      </Tabs>
    </LeafyGreenProvider>
  );
}

storiesOf('Packages/Tabs', module)
  .add('Uncontrolled', () => {
    const darkMode = boolean('darkMode', false);

    return (
      <LeafyGreenProvider>
        <Tabs
          aria-label="Tabs to demonstrate usage of Leafygreen UI Tab Components"
          darkMode={darkMode}
          className={css`
            background-color: ${!darkMode ? 'white' : uiColors.gray.dark3};
            color: ${!darkMode ? uiColors.gray.dark3 : uiColors.white};
            padding: 20px;
          `}
        >
          <Tab
            default={boolean('default', true)}
            name={text('name', 'Adam Michael Thompson')}
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

        <Tabs
          aria-label="Tabs to demonstrate usage of Leafygreen UI Tab Components"
          darkMode={darkMode}
          className={css`
            background-color: ${!darkMode ? 'white' : uiColors.gray.dark3};
            color: ${!darkMode ? uiColors.gray.dark3 : uiColors.white};
            padding: 20px;
          `}
        >
          <Tab
            default={boolean('default', true)}
            name={text('name', 'Adam Michael Thompson')}
          >
            {text('Tab Content', 'Hello 1')}
          </Tab>
          <Tab
            name={
              <>
                <Icon glyph="Support" /> Robert Arnold Audroue
              </>
            }
          >
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
