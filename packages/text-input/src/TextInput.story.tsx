import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import TextInput from '.';

storiesOf('TextInput', module).add('Default', () => (
  <TextInput
    label={text('Label', 'Input Label')}
    description={text('Description', '')}
    optional={boolean('Optional', false)}
    disabled={boolean('Disabled', false)}
    placeholder={text('Placeholder Text', '')}
    errorMessage={text('Error Message', '')}
  />
));
