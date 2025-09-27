import React from 'react';

import LGButton from '@leafygreen-ui/button';
import LGModal from '@leafygreen-ui/modal';

const App = () => {
  return (
    <div>
      <LGButton>Click me</LGButton>
      <LGModal open={false}>Modal content</LGModal>
    </div>
  );
};

export default App;
