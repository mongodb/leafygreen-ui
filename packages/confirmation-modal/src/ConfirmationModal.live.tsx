import React, { useState } from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import ConfirmationModal, { ConfirmationModalProps } from './ConfirmationModal';

const knobsConfig: KnobsConfigInterface<Partial<ConfirmationModalProps>> = {
  buttonText: {
    type: 'text',
    default: 'Confirm',
    label: 'Button Text',
  },
  requiredInputText: {
    type: 'boolean',
    default: false,
    label: 'Required Input Text',
  },
  title: {
    type: 'text',
    default: 'Confirm Title Here',
    label: 'Title',
  },
  children: {
    type: 'text',
    default:
      'This is some description text, and it is extra long so it fills up this modal. Another thing about the modals here. This is some description text, and it is extra long so it fills up this modal. Another thing about the modals here.',
    label: 'Children',
  },
};

function Confirm({
  title = 'Confirm Title Here',
  buttonText = 'Confirm',
  requiredInputText,
  children,
}: Partial<ConfirmationModalProps>) {
  const [open, setOpen] = useState(false);
  const reqInputText = requiredInputText ? 'Confirmation text' : undefined;
  console.log('hey');

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      <ConfirmationModal
        open={open}
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        title={title}
        buttonText={buttonText}
        requiredInputText={reqInputText}
      >
        {children}
      </ConfirmationModal>
    </>
  );
}

const ConfirmationModalLiveExample = () => {
  console.log('hi');
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Confirm {...props} />}
    </LiveExample>
  );
};

export { ConfirmationModalLiveExample };
