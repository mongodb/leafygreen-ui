import React from 'react';

import { Spinner } from '@leafygreen-ui/loading-indicator/spinner';

export default function App() {
  return (
    <div>
      <Spinner displayOption="default-vertical" description="Loading..." />
      <Spinner displayOption="large-vertical" />
    </div>
  );
}
