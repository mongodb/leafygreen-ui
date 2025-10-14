import React from 'react';
import { Spinner } from '@leafygreen-ui/loading-indicator';

export default function App() {
  return (
    <div>
      <Spinner displayOption="default-vertical" />
      <Spinner displayOption="default-horizontal" />
      <Spinner displayOption="large-vertical" />
      <Spinner displayOption="xlarge-vertical" />
    </div>
  );
}
