import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import Modal, { ModalSize } from '.';

const scroll = css`
  height: 200vh;
`;

function Default() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      <Modal
        open={open}
        setOpen={setOpen}
        size={select('size', Object.values(ModalSize), ModalSize.Default)}
        closeOnBackdropClick={boolean('closeOnBackdropClick', true)}
        darkMode={boolean('darkMode', false)}
      >
        Modal Content goes here.
      </Modal>
    </>
  );
}

function Scroll() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      <Modal
        open={open}
        setOpen={setOpen}
        size={select('size', Object.values(ModalSize), ModalSize.Default)}
      >
        <div className={scroll}>Modal Content goes here.</div>
      </Modal>
    </>
  );
}

function Interactive() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      <Modal
        open={open}
        setOpen={setOpen}
        size={select('size', Object.values(ModalSize), ModalSize.Default)}
      >
        <div>
          <div>Modal Content goes here.</div>
          <button>Click me, I will not close the modal!</button>
        </div>
      </Modal>
    </>
  );
}

storiesOf('Modal', module)
  .add('Default', () => <Default />)
  .add('Scroll', () => <Scroll />)
  .add('Interactive', () => <Interactive />);
