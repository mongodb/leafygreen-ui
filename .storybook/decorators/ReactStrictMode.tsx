import { StoryFn } from '@storybook/react';
import React, { StrictMode } from 'react';

// eslint-disable-next-line react/display-name
export default (StoryFn: StoryFn) => (
  <StrictMode>
    <StoryFn />
  </StrictMode>
);
