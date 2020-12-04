import React from 'react';
import TextInput, { State, TextInputType } from '@leafygreen-ui/text-input';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

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
    default: 'Name Your Team',
    label: 'Label',
  },
  description: {
    type: 'area',
    default: 'Team names have to be unique within the organization',
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
    default: 'Team name',
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
    type: 'area',
    default:
      'The team name that you entered is not unique, please pick another',
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
