import React from 'react';

import { Button } from '@leafygreen-ui/button';
import Card from '@leafygreen-ui/card';
import { Modal } from '@leafygreen-ui/modal';

const App = () => {
  return (
    <div>
      <Button>Click me</Button>
      <Modal open={false}>Modal content</Modal>
      <Card>Card</Card>
    </div>
  );
};

export default App;
