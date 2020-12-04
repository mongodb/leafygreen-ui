import React, { useState } from 'react';
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

// When interface is used, ts complains that index signature is missing
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ConfirmationModalExampleProps = {
  buttonText: string;
  requiredInputText: boolean;
  title: string;
  children: string;
};

const knobsConfig: KnobsConfigInterface<ConfirmationModalExampleProps> = {
  buttonText: {
    type: 'text',
    default: 'Configure a New Data Lake',
    label: 'Button Text',
  },
  requiredInputText: {
    type: 'boolean',
    default: false,
    label: 'Required Input Text',
  },
  title: {
    type: 'text',
    default: 'Configure a New Data Lake',
    label: 'Title',
  },
  children: {
    type: 'area',
    default: 'Analyze your data in S3 with MQL.',
    label: 'Children',
  },
};

function Confirm({
  title = 'Confirm Title Here',
  buttonText = 'Confirm',
  requiredInputText,
  children,
}: ConfirmationModalExampleProps) {
  const [open, setOpen] = useState(false);
  const reqInputText = requiredInputText ? 'Confirmation text' : undefined;

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

export default function ConfirmationModalLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Confirm {...props} />}
    </LiveExample>
  );
}
