import React from 'react';
import { Spinner } from '@leafygreen-ui/loading-indicator';

export default function App() {
  return (
    <div>
      {/* Previous description: "Loading..." */}
      {/* TODO: The Spinner component no longer supports the `description` prop. Please render description text separately using the Typography component. */}
      <Spinner />
      {/* Previous description: "Please wait" */}
      {/* TODO: The Spinner component no longer supports the `description` prop. Please render description text separately using the Typography component. */}
      <Spinner size="large" />
    </div>
  );
}
