import React, { useState } from 'react';
import Button from '@leafygreen-ui/button';
import Modal, { ModalSize } from '@leafygreen-ui/modal';
import { css } from 'emotion';
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
    label: 'Size',
  },
};

function ModalExample(props: ModalKnobs) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Open Modal</Button>
      <Modal
        className={css`
          z-index: 1;
        `}
        open={open}
        setOpen={setOpen}
        {...props}
      />
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
