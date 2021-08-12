import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { SegmentedControl, SegmentedControlOption } from '.';
import { boolean, select } from '@storybook/addon-knobs';

storiesOf('SegmentedControl', module)
  .add('Default', () => {
    const [selectedFruit, setSelectedFruit] = useState('apple');

    return (
      <LeafygreenProvider>
        <SegmentedControl
          name="fruit"
          size={select('Size', ['small', 'default', 'large'], 'default')}
          darkMode={boolean('darkMode', false)}
          defaultValue="banana"
          value={selectedFruit}
          onChange={e => {
            setSelectedFruit(e.target.value);
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
          defaultValue="eggplant"
          onChange={e => {
            console.log(e.target.value);
          }}
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
  });
