import React from 'react';

import LiveExample, { KnobsConfigInterface } from 'components/live-example';

import { RadioBox, RadioBoxGroup, Size } from '@leafygreen-ui/radio-box-group';

import { css } from '@emotion/css';

// When interface is used, ts complains that index signature is missing
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Knobs = {
  size: Size;
  disabled: boolean;
  children: string;
  darkMode: boolean;
};

const knobsConfig: KnobsConfigInterface<Knobs> = {
  size: {
    type: 'select',
    default: Size.Default,
    options: Object.values(Size),
    label: 'Size',
  },
  disabled: {
    type: 'boolean',
    default: true,
    label: 'Disabled',
  },
  children: {
    type: 'text',
    default: 'Mumbai (ap-south-1)',
    label: 'Children',
  },
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
};

function DefaultExample({ size, disabled, children, darkMode }: Knobs) {
  return (
    <div
      className={css`
        overflow-x: auto;
        width: 100%;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <RadioBoxGroup
        darkMode={darkMode}
        size={size}
        name="radio-box-group-default"
      >
        <RadioBox value="1">N. Virginia (us-east-1)</RadioBox>
        <RadioBox value="2">{children}</RadioBox>
        <RadioBox disabled={disabled} value="option-4">
          Ireland (eu-west-1)
        </RadioBox>
      </RadioBoxGroup>
    </div>
  );
}

export default function RadioBoxGroupLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <DefaultExample {...props} />}
    </LiveExample>
  );
}
