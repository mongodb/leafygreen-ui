
import React from 'react';
import { storiesOf } from '@storybook/react';
import Toast from '.';

storiesOf('Toast', module)
  .add('Default', () => (
    <Toast variant='success' body='hello' open={true} />
  ))
