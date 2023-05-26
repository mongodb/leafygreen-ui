import React, { StrictMode } from 'react';
import { StoryFn } from '@storybook/react';

// eslint-disable-next-line react/display-name
export default (StoryFn: StoryFn) => (
  <StrictMode>
    <StoryFn />
  </StrictMode>
);
