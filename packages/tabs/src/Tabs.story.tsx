import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Tab, Tabs } from './index';
import { Variant } from './Tabs';

function ControlledTabs() {
  const [selected, setSelected] = useState(0);

  const variant = select('variant', Object.values(Variant), Variant.Default);

  return (
    <LeafyGreenProvider>
      <Tabs
        setSelected={setSelected}
        selected={selected}
        variant={variant}
        className={css`
          background-color: ${variant === Variant.Default
            ? 'white'
            : uiColors.gray.dark3};
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
    const variant = select('variant', Object.values(Variant), Variant.Default);

    return (
      <LeafyGreenProvider>
        <Tabs
          variant={variant}
          className={css`
            background-color: ${variant === Variant.Default
              ? 'white'
              : uiColors.gray.dark3};
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
