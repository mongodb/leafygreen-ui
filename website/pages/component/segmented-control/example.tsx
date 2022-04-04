import React from 'react';
import {
  SegmentedControl,
  SegmentedControlOption,
} from '@leafygreen-ui/segmented-control';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  size: 'small' | 'default' | 'large';
  darkMode: boolean;
  label: string;
  followFocus: boolean;
  disabled: boolean;
}> = {
  size: {
    type: 'select',
    default: 'default',
    options: ['small', 'default', 'large'],
    label: 'Size',
  },
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  label: {
    type: 'text',
    default: 'Fruit',
    label: 'Label',
  },
  followFocus: {
    type: 'boolean',
    default: true,
    label: 'Follow focus',
  },
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled',
  },
};

export default function SelectLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ darkMode, size, label, followFocus, disabled }) => (
        <SegmentedControl
          label={label}
          name="fruit"
          size={size}
          darkMode={darkMode}
          followFocus={followFocus}
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

          <SegmentedControlOption disabled={disabled} value="grape">
            Grape
          </SegmentedControlOption>
        </SegmentedControl>
      )}
    </LiveExample>
  );
}
