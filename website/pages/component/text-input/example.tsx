import React from 'react';
import TextInput, {
  State,
  TextInputType,
  SizeVariant,
} from '@leafygreen-ui/text-input';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';
import { BaseFontSize } from '@leafygreen-ui/tokens';

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
  sizeVariant: SizeVariant;
  baseFontSize: BaseFontSize;
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
  sizeVariant: {
    type: 'select',
    options: Object.values(SizeVariant),
    default: 'default',
    label: 'Size Variant',
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
  baseFontSize: {
    type: 'select',
    options: [13, 16],
    default: 13,
    label: 'Base Font Size',
  },
};

export default function TextInputLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <TextInput {...props} />}
    </LiveExample>
  );
}
