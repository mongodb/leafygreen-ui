import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import Checkbox from '@leafygreen-ui/checkbox';

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
    default: 'Insert',
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

export default function CheckboxLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Checkbox {...props} />}
    </LiveExample>
  );
}
