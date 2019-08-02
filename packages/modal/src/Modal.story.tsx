import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import Modal, { ModalSize } from './Modal';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      <Modal
        open={open}
        setOpen={setOpen}
        size={select('size', Object.values(ModalSize), ModalSize.Default)}
      >
        Modal Content goes here.
      </Modal>
    </>
  );
}

storiesOf('Modal', module).add('Default', () => <Example />);
