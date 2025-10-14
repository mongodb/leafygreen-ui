import React from 'react';
import { Spinner as LGSpinner } from '@leafygreen-ui/loading-indicator';

export default function App() {
  return (
    <div>
      <LGSpinner displayOption="default-vertical" description="Loading..." />
      <LGSpinner displayOption="large-vertical" />
    </div>
  );
}
