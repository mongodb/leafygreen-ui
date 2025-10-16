import React from 'react';

import { Spinner } from '@leafygreen-ui/loading-indicator/spinner';

export default function App() {
  return (
    <div>
      <LGSpinner displayOption="default-vertical" description="Loading..." />
      <LGSpinner displayOption="large-vertical" />
    </div>
  );
}
