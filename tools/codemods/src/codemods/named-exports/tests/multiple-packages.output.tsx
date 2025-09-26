import React from 'react';

import { Button } from '@leafygreen-ui/button';
import { Modal } from '@leafygreen-ui/modal';
import { Checkbox } from '@leafygreen-ui/checkbox';
import { Tooltip } from '@leafygreen-ui/tooltip';

const App = () => {
  return (
    <div>
      <Button>Click me</Button>
      <Modal open={false}>Modal content</Modal>
      <Checkbox checked={false}>Checkbox</Checkbox>
      <Tooltip>Tooltip content</Tooltip>
    </div>
  );
};

export default App;
