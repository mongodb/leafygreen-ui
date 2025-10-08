import React from 'react';

import { Button, Size } from '@leafygreen-ui/button';
import { Popover, RenderMode } from '@leafygreen-ui/popover';

const App = () => {
  return (
    <div>
      <Button size={Size.Small}>Click me</Button>
      <Popover renderMode={RenderMode.TopLayer}>Popover content</Popover>
    </div>
  );
};

export default App;
