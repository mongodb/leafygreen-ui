import React from 'react';

import { Spinner } from '@leafygreen-ui/loading-indicator/spinner';

export default function App() {
  return (
    <div>
      <Spinner size="default" description="Loading..." direction="vertical" />
      <Spinner size="large" />
    </div>
  );
}
