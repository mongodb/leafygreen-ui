import React, { StrictMode } from 'react';
import { Decorator } from '@storybook/react';

const ReactStrictMode: Decorator = storyFn => (
  <StrictMode>
    STRICT MODE!
    {storyFn()}
  </StrictMode>
);
export default ReactStrictMode;
