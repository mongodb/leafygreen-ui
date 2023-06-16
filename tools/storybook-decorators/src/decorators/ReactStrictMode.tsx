import React, { StrictMode } from 'react';
import { Decorator } from '@storybook/react';

// eslint-disable-next-line react/display-name
const ReactStrictMode: Decorator = storyFn => (
  <StrictMode>{storyFn()}</StrictMode>
);
export default ReactStrictMode;
