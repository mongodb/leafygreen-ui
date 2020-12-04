import React, { useState } from 'react';
import Modal, { ModalSize } from '@leafygreen-ui/modal';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

// When interface is used, ts complains that index signature is missing
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ModalKnobs = {
  children: string;
  size: ModalSize;
};

const knobsConfig: KnobsConfigInterface<ModalKnobs> = {
  children: {
    type: 'area',
    default: 'This is the modal content',
    label: 'Children',
  },
  size: {
    type: 'select',
    options: Object.values(ModalSize),
    default: ModalSize.Default,
    label: 'size',
  },
};

function ModalExample(props: ModalKnobs) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      <Modal open={open} setOpen={setOpen} {...props} />
    </>
  );
}

export default function ModalLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <ModalExample {...props} />}
    </LiveExample>
  );
}
