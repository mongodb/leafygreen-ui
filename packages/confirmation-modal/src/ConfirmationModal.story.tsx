import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import ConfirmationModal, { Variant } from '.';

function Confirm() {
  const [open, setOpen] = useState(false);
  const buttonText = text('Primary action text', 'Confirm');
  const submitDisabled = boolean('submitDisabled', false);
  const darkMode = boolean('darkMode', false);
  const requiredInputText = boolean('Require confirmation', false)
    ? text('Confirmation text', 'confirm')
    : undefined;

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      <ConfirmationModal
        open={open}
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        title="Confirm Title Here"
        buttonText={buttonText}
        requiredInputText={requiredInputText}
        submitDisabled={submitDisabled}
        darkMode={darkMode}
      >
        This is some description text, and it is extra long so it fills up this
        modal. Another thing about the modals here. This is some description
        text, and it is extra long so it fills up this modal. Another thing
        about the modals here.
      </ConfirmationModal>
    </>
  );
}

function Delete() {
  const [open, setOpen] = useState(false);
  const buttonText = text('Primary action text', 'Confirm');
  const submitDisabled = boolean('submitDisabled', false);
  const darkMode = boolean('darkMode', false);
  const requiredInputText = boolean('Require confirmation', false)
    ? text('Confirmation text', 'confirm')
    : undefined;

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      <ConfirmationModal
        open={open}
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        title="Delete Title Here"
        buttonText={buttonText}
        variant={Variant.Danger}
        requiredInputText={requiredInputText}
        submitDisabled={submitDisabled}
        darkMode={darkMode}
      >
        This is some description text, and it is extra long so it fills up this
        modal. Another thing about the modals here. This is some description
        text, and it is extra long so it fills up this modal. Another thing
        about the modals here.
      </ConfirmationModal>
    </>
  );
}

storiesOf('Packages/ConfirmationModal', module)
  .add('Confirm', () => <Confirm />)
  .add('Delete', () => <Delete />);
