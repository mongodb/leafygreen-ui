import React from 'react';

import { Button as LGButton } from '@leafygreen-ui/button';
import { Popover as LGPopover } from '@leafygreen-ui/popover';

const App = () => {
  return (
    <div>
      <LGButton>Click me</LGButton>
      <LGPopover>Popover content</LGPopover>
    </div>
  );
};

export default App;
