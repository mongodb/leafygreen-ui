import React from 'react';

import { Spinner } from '@leafygreen-ui/loading-indicator/spinner';

export default function App() {
  return (
    <div>
      {/* Previous description: "Loading..." */}
      {/* TODO: The Spinner component no longer supports the `description` prop. Please render description text separately using the Typography component. */}
      <Spinner size="default" />
      <Spinner size="large" />
    </div>
  );
}
