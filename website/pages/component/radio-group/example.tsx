import React from 'react';
import { css } from 'emotion';
import { RadioGroup, Radio, Size } from '@leafygreen-ui/radio-group';
import { uiColors } from '@leafygreen-ui/palette';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

// When interface is used, ts complains that index signature is missing
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Knobs = {
  darkMode: boolean;
  size: Size;
  disabled: boolean;
  children: string;
};

const knobsConfig: KnobsConfigInterface<Knobs> = {
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  size: {
    type: 'select',
    default: Size.Default,
    options: Object.values(Size),
    label: 'Size',
  },
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled',
  },
  children: {
    type: 'text',
    default: 'System',
    label: 'Children',
  },
};

function DefaultExample({ darkMode, size, disabled, children }: Knobs) {
  return (
    <RadioGroup
      size={size}
      name="radio-group-default"
      darkMode={darkMode}
      className={css`
        background-color: ${darkMode ? uiColors.gray.dark3 : uiColors.white};
        padding: 20px;
      `}
    >
      <Radio value="1">Application Authentication</Radio>
      <Radio value="2">{children}</Radio>
      <Radio default value="3">
        User ID
      </Radio>
      <Radio disabled={disabled} value="Selection-4">
        Script
      </Radio>
    </RadioGroup>
  );
}

export default function RadioGroupLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <DefaultExample {...props} />}
    </LiveExample>
  );
}
