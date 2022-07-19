import React from 'react';
import { storiesOf } from '@storybook/react';
import Blob from '.';

storiesOf('Components/Blob', module).add('Default', () => (
  <Blob
    shape={[
      ['_', '_', 'o', 'o'],
      ['_', '_', 'o', '_'],
      ['o', 'o', '_', '_'],
      ['o', '_', 'o', 'o'],
    ]}
  />
));
