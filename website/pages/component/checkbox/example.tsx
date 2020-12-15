import React from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  darkMode: boolean;
  disabled: boolean;
  indeterminate: boolean;
  label: string;
  bold: boolean;
  animate: boolean;
}> = {
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
    default: 'I accept the Privacy Policy and the Terms of Service',
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
};

export default function CheckboxLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Checkbox {...props} />}
    </LiveExample>
  );
}
