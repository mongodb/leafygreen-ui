import React from 'react';

import { Button as LGButton } from '@leafygreen-ui/button';
import { Modal as LGModal } from '@leafygreen-ui/modal';

const App = () => {
  return (
    <div>
      <LGButton>Click me</LGButton>
      <LGModal open={false}>Modal content</LGModal>
    </div>
  );
};

export default App;
