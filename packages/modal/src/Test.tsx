import React from 'react';

import Button from '@leafygreen-ui/button';
import Tooltip from '@leafygreen-ui/tooltip';
import { ModalProps } from './Modal.types';
import Modal from './Modal';

export function TooltipTrigger(args: ModalProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Tooltip
        trigger={
          <Button onClick={() => setOpen(curr => !curr)}>Click me</Button>
        }
      >
        Lorem Ipsum
      </Tooltip>
      <Modal {...args} open={open} setOpen={setOpen} />
    </>
  );
}
