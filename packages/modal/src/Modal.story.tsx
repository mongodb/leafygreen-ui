import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Modal, { ModalSize } from '.';

const scroll = css`
  height: 200vh;
`;

const buttonPadding = css`
  margin-top: 4px;
`;

function Default() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Open Modal</Button>
      <Modal
        open={open}
        setOpen={setOpen}
        size={select('size', Object.values(ModalSize), ModalSize.Default)}
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
      <Button onClick={() => setOpen(!open)}>Open Modal</Button>
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
      <Button onClick={() => setOpen(!open)}>Open Modal</Button>
      <Modal
        open={open}
        setOpen={setOpen}
        size={select('size', Object.values(ModalSize), ModalSize.Default)}
      >
        <div>
          <div>Modal Content goes here.</div>
          <Button className={buttonPadding}>
            Click me, I will not close the modal!
          </Button>
        </div>
      </Modal>
    </>
  );
}

storiesOf('Packages/Modal', module)
  .add('Default', () => <Default />)
  .add('Scroll', () => <Scroll />)
  .add('Interactive', () => <Interactive />);
