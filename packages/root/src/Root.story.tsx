import React from 'react';
import { storiesOf } from '@storybook/react';
import Root from '.';

storiesOf('Root', module).add('Default', () => (
  <Root href="https://google.com">test me out</Root>
));
