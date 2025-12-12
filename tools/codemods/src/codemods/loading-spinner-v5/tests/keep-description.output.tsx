import React from 'react';

import { Spinner } from '@leafygreen-ui/loading-indicator';

export default function App() {
  return (
    <div>
      <Spinner description="Loading..." />
      <Spinner size="large" description="Please wait" direction="vertical" />
    </div>
  );
}
