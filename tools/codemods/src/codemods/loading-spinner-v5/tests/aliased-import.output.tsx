import React from 'react';

import { Spinner as LGSpinner } from '@leafygreen-ui/loading-indicator';

export default function App() {
  return (
    <div>
      <LGSpinner size="default" description="Loading..." direction="vertical" />
      <LGSpinner size="large" />
    </div>
  );
}
