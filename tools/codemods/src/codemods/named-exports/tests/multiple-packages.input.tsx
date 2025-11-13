import React from 'react';

import Banner from '@leafygreen-ui/banner';
import Button from '@leafygreen-ui/button';
import Checkbox from '@leafygreen-ui/checkbox';
import Modal from '@leafygreen-ui/modal';
import Tooltip from '@leafygreen-ui/tooltip';

const App = () => {
  return (
    <div>
      <Banner>Banner Content</Banner>
      <Button>Click me</Button>
      <Modal open={false}>Modal content</Modal>
      <Checkbox checked={false}>Checkbox</Checkbox>
      <Tooltip>Tooltip content</Tooltip>
    </div>
  );
};

export default App;
