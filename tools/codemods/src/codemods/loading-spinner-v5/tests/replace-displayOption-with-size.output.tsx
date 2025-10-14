import React from 'react';
import { Spinner } from '@leafygreen-ui/loading-indicator';

export default function App() {
  return (
    <div>
      <Spinner size="default" />
      <Spinner size="default" />
      <Spinner size="large" />
      <Spinner size="xlarge" />
    </div>
  );
}
