import React from 'react';

import { Spinner } from '@leafygreen-ui/loading-indicator';

export default function App() {
  return (
    <div>
      <Spinner
        size="default"
        description="Loading data..."
        darkMode={true}
        className="my-spinner"
        direction="horizontal"
      />
      <Spinner
        size="large"
        description="Processing..."
        baseFontSize={16}
        colorOverride="#FF0000"
        direction="vertical"
      />
    </div>
  );
}
