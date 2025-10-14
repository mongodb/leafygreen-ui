import React from 'react';
import { Spinner } from '@leafygreen-ui/loading-indicator';

export default function App() {
  return (
    <div>
      <Spinner
        displayOption="default-vertical"
        description="Loading data..."
        darkMode={true}
        className="my-spinner"
      />
      <Spinner
        displayOption="large-vertical"
        description="Processing..."
        baseFontSize={16}
        colorOverride="#FF0000"
      />
    </div>
  );
}
