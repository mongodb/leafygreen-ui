import React from 'react';

import Button from '@leafygreen-ui/button';
import Modal from '@leafygreen-ui/modal';

const App = () => {
  return (
    <div>
      <Button>Click me</Button>
      <Modal open={false}>Modal content</Modal>
    </div>
  );
};

export default App;
