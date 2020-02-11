import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import TextInput from '.';

storiesOf('TextInput', module).add('Default', () => (
  <TextInput
    label={text('Label', 'Input Label')}
    description={text('Description', 'This is a description for the input')}
    optional={boolean('Optional', false)}
    disabled={boolean('Disabled', false)}
    placeholder={text('Placeholder Text', 'This is some placeholder text')}
    state={select('State', ['none', 'valid', 'error'], 'none')}
    errorMessage={text('Error Message', 'This is an error message')}
  />
));
