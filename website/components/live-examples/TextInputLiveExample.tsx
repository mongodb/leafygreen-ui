import React from 'react';
import TextInput, { State, TextInputType } from '@leafygreen-ui/text-input';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';

const knobsConfig: KnobsConfigInterface<{
  label: string;
  description: string;
  optional: boolean;
  disabled: boolean;
  placeholder: string;
  state: State;
  type: TextInputType;
  darkMode: boolean;
  errorMessage: string;
}> = {
  label: {
    type: 'text',
    default: 'Text Input Label',
    label: 'Label',
  },
  description: {
    type: 'text',
    default: 'This is the description for the text input',
    label: 'Description',
  },
  optional: {
    type: 'boolean',
    default: false,
    label: 'Optional',
  },
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled',
  },
  placeholder: {
    type: 'text',
    default: 'This is some placeholder text',
    label: 'Placeholder',
  },
  state: {
    type: 'select',
    options: Object.values(State),
    default: State.None,
    label: 'State',
  },
  type: {
    type: 'select',
    options: Object.values(TextInputType),
    default: TextInputType.Text,
    label: 'Type',
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

export default function TextInputLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <TextInput {...props} />}
    </LiveExample>
  );
}
