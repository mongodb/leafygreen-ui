import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import Checkbox, { CheckboxProps } from './Checkbox';

const knobsConfig: KnobsConfigInterface<CheckboxProps> = {
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
  indeterminate: {
    type: 'boolean',
    default: false,
    label: 'Indeterminate',
  },
  label: {
    type: 'text',
    default: 'I agree to this thing',
    label: 'Label',
  },
  bold: {
    type: 'boolean',
    default: false,
    label: 'Bold',
  },
  animate: {
    type: 'boolean',
    default: true,
    label: 'Animate',
  },
} as const;

const CheckboxLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Checkbox {...props} />}
    </LiveExample>
  );
};

export { CheckboxLiveExample };
