import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { SegmentedControl, SegmentedControlOption } from '.';
import { boolean, select, text } from '@storybook/addon-knobs';
import Icon from '@leafygreen-ui/icon';

storiesOf('Packages/SegmentedControl', module)
  .add('Default', () => {
    const [selectedFruit, setSelectedFruit] = useState('carrot');

    return (
      <LeafygreenProvider baseFontSize={select('Base Font Size', [14, 16], 14)}>
        <SegmentedControl
          name="fruit"
          label={text('Label', 'Label')}
          size={select('Size', ['small', 'default', 'large'], 'default')}
          darkMode={boolean('darkMode', false)}
          followFocus={boolean('followFocus', true)}
          value={selectedFruit}
          onChange={(value: string) => {
            // eslint-disable-next-line no-console
            console.log('Setting value to', value);
            setSelectedFruit(value);
          }}
        >
          <SegmentedControlOption value="apple">Apple</SegmentedControlOption>

          <SegmentedControlOption value="banana">Banana</SegmentedControlOption>

          <SegmentedControlOption value="carrot">Carrot</SegmentedControlOption>

          <SegmentedControlOption value="dragonfruit" disabled>
            Dragonfruit
          </SegmentedControlOption>
        </SegmentedControl>
      </LeafygreenProvider>
    );
  })

  .add('Uncontrolled', () => {
    return (
      <LeafygreenProvider>
        <SegmentedControl
          label="Fruit"
          name="fruit"
          size={select('Size', ['small', 'default', 'large'], 'default')}
          darkMode={boolean('darkMode', false)}
          defaultValue="fig"
          followFocus={boolean('followFocus', false)}
          // eslint-disable-next-line no-console
          onChange={val => console.log(val)}
          aria-controls=""
        >
          <SegmentedControlOption value="dragonfruit">
            Dragonfruit
          </SegmentedControlOption>

          <SegmentedControlOption value="eggplant">
            Eggplant
          </SegmentedControlOption>

          <SegmentedControlOption value="fig">Fig</SegmentedControlOption>

          <SegmentedControlOption value="grape">Grape</SegmentedControlOption>
        </SegmentedControl>
      </LeafygreenProvider>
    );
  })
  .add('with icons', () => {
    return (
      <LeafygreenProvider>
        <SegmentedControl
          label="View as"
          name="language"
          size={select('Size', ['small', 'default', 'large'], 'default')}
          darkMode={boolean('darkMode', false)}
          defaultValue="json"
          onChange={value => {
            // eslint-disable-next-line no-console
            console.log(value);
          }}
        >
          <SegmentedControlOption value="json">
            <Icon glyph="CurlyBraces"></Icon> JSON
          </SegmentedControlOption>

          <SegmentedControlOption value="xml">
            <Icon glyph="Code"></Icon> XML
          </SegmentedControlOption>

          <SegmentedControlOption value="shell">
            <Icon glyph="Shell"></Icon> Shell
          </SegmentedControlOption>
        </SegmentedControl>
      </LeafygreenProvider>
    );
  })
  .add('icons only', () => {
    return (
      <LeafygreenProvider>
        <SegmentedControl
          name="location"
          size={select('Size', ['small', 'default', 'large'], 'default')}
          darkMode={boolean('darkMode', false)}
          defaultValue="cloud"
          onChange={value => {
            // eslint-disable-next-line no-console
            console.log(value);
          }}
        >
          <SegmentedControlOption value="cloud">
            <Icon glyph="Cloud"></Icon>
          </SegmentedControlOption>

          <SegmentedControlOption value="globe">
            <Icon glyph="GlobeAmericas"></Icon>
          </SegmentedControlOption>

          <SegmentedControlOption value="government">
            <Icon glyph="GovernmentBuilding"></Icon>
          </SegmentedControlOption>
        </SegmentedControl>
      </LeafygreenProvider>
    );
  });
