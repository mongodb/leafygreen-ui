import React from 'react';

import Button from '@leafygreen-ui/button';
import Popover from '@leafygreen-ui/popover';
import Modal from '@leafygreen-ui/modal';

const App = () => {
  return (
    <div>
      <Button>Click me</Button>
      <Popover>Popover content</Popover>
      <Modal open={false}>Modal content</Modal>
    </div>
  );
};

export default App;
