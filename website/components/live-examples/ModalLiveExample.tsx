import React, { useState } from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import Modal, { ModalSize } from '@leafygreen-ui/modal';

// When interface is used, ts complains that index signature is missing
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ModalKnobs = {
  children: string;
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

export default ModalLiveExample;
