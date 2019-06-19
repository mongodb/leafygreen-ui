import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import Modal, { ModalSize, useModalState } from './index';

function Example() {
  const { active, setActive } = useModalState();

  return (
    <>
      <button onClick={() => setActive(active => !active)}>Open Modal</button>
      <Modal
        active={active}
        setActive={setActive}
        usePortal={boolean('usePortal', true)}
        size={select('size', Object.values(ModalSize), ModalSize.Normal)}
        title={text('title', 'Modal Title')}
      >
        Modal Content goes here
      </Modal>
    </>
  );
}

storiesOf('Modal', module).add('Default', () => <Example />);
