import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import TextInput from '.';

storiesOf('TextInput', module).add('Default', () => <TextInput
    label={text('Label', 'Input Label')}
    description={text('Description', 'The input description')}
    inputField={<input type='text' name='text-input'/>}
    errorMessage={text('Error Message', '')}
/>);
