import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import TextInput from '.';

storiesOf('TextInput', module).add('Default', () => (
  <TextInput
    label={text('Label', 'Input Label')}
    description={text('Description', 'This is a description for the input')}
    optional={boolean('Optional', false)}
    disabled={boolean('Disabled', false)}
    validationOccurred={boolean('Validation Occurred', false)}
    isValid={boolean('Valid Input', false)}
    placeholderText={text('Placeholder Text', '')}
    errorMessage={text('Error Message', 'This is an error message')}
  />
));
