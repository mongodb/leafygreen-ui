import React from 'react';
import { Spinner } from '@leafygreen-ui/loading-indicator';

export default function App() {
  return (
    <div>
      {/* TODO: The Spinner component no longer supports the `description` prop. Please render description text separately using the Typography component. */}
      <Spinner size="default" darkMode={true} className="my-spinner" />
      {/* TODO: The Spinner component no longer supports the `description` prop. Please render description text separately using the Typography component. */}
      <Spinner size="large" colorOverride="#FF0000" />
    </div>
  );
}
