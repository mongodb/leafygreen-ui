import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import TextArea, { State } from '@leafygreen-ui/text-area';

const knobsConfig: KnobsConfigInterface<{
  label: string;
  description: string;
  disabled: boolean;
  state: State;
  darkMode: boolean;
  errorMessage: string;
}> = {
  label: {
    type: 'text',
    default: 'Text Area Label',
    label: 'Label',
  },
  description: {
    type: 'text',
    default: 'This is the description for the text area',
    label: 'Description',
  },
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled',
  },
  state: {
    type: 'select',
    options: Object.values(State),
    default: State.None,
    label: 'State',
  },
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  errorMessage: {
    type: 'text',
    default: 'This is an error message',
    label: 'Error Message',
  },
};

export default function TextAreaLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <TextArea {...props} />}
    </LiveExample>
  );
}
