import React from 'react';

import { Button, Size } from '@leafygreen-ui/button';
import { Popover, Align } from '@leafygreen-ui/popover';

const App = () => {
  return (
    <div>
      <Button size={Size.Small}>Click me</Button>
      <Popover align={Align.Top}>Popover content</Popover>
    </div>
  );
};

export default App;
