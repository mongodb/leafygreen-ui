import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { SegmentedControl, SegmentedControlOption } from '.';
import { boolean, select } from '@storybook/addon-knobs';
import Icon from '@leafygreen-ui/icon';

storiesOf('SegmentedControl', module)
  .add('Default', () => {
    const [selectedFruit, setSelectedFruit] = useState('apple');

    return (
      <LeafygreenProvider>
        <SegmentedControl
          name="fruit"
          size={select('Size', ['small', 'default', 'large'], 'default')}
          darkMode={boolean('darkMode', false)}
          followFocus={boolean('followFocus', false)}
          value={selectedFruit}
          onChange={(value: string) => {
            setSelectedFruit(value);
            console.log(value);
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
          onChange={val => console.log(val)}
          aria-controls="tabpanel"
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
        <br />
        <div tabIndex={0} id="tabpanel" role="tabpanel">
          Cum sociis natoque penatibus et magnis dis parturient montes.
        </div>
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
          onChange={e => {
            console.log(e.target.value);
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
          onChange={e => {
            console.log(e.target.value);
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
