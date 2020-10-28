import React, { useState } from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import Modal, { ModalSize } from './Modal';

// eslint-disable-next-line
type ModalKnobs = {
  children: React.ReactNode;
  size: ModalSize;
};

const knobsConfig: KnobsConfigInterface<ModalKnobs> = {
  children: {
    type: 'text',
    default: 'This is the modal content',
    label: 'Children',
  },
  size: {
    type: 'select',
    options: Object.values(ModalSize),
    default: ModalSize.Default,
    label: 'size',
  },
} as const;

const ModalExample = (props: ModalKnobs) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      <Modal open={open} setOpen={setOpen} {...props} />
    </>
  );
};

const ModalLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <ModalExample {...props} />}
    </LiveExample>
  );
};

export { ModalLiveExample };
