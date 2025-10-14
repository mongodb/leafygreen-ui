import React from 'react';
import { Spinner as LGSpinner } from '@leafygreen-ui/loading-indicator';

export default function App() {
  return (
    <div>
      {/* TODO: The Spinner component no longer supports the `description` prop. Please render description text separately using the Typography component. */}
      <LGSpinner size="default" />
      <LGSpinner size="large" />
    </div>
  );
}
