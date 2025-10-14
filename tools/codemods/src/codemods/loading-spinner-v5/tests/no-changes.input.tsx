import React from 'react';
import { PageLoader, Spinner } from '@leafygreen-ui/loading-indicator';

export default function App() {
  return (
    <div>
      <Spinner size="default" />
      <Spinner size="large" darkMode={true} />
      <Spinner />
      <PageLoader
        baseFontSize={16}
        description="Loading page..."
        darkMode={true}
      />
    </div>
  );
}
