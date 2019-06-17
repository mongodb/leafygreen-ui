import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Modal } from './Modal';

function Example() {
  const [active, setActive] = useState(false);

  return (
    <>
      <button onClick={() => setActive(active => !active)}>Open Modal</button>
      {active && (
        <Modal
          active={active}
          usePortal
          onRequestClose={() => setActive(active => !active)}
          size="normal"
          title="Modal Title"
        >
          Modal Content goes here
        </Modal>
      )}
    </>
  );
}

storiesOf('Modal', module).add('Default', () => <Example />);
