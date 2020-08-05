import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import ConfirmationModal from '.';

function Confirm() {
  const [open, setOpen] = useState(false);
  const requireTextEntryConfirmation = boolean(
    'Require text confirmation',
    false,
  );
  const primaryActionLabel = text('Primary action label', 'Confirm');
  const secondaryActionLabel = text('Secondary action label', 'Cancel');

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      <ConfirmationModal
        open={open}
        title="Confirm Title Here"
        primaryActionProps={{
          label: primaryActionLabel,
          onClick: () => setOpen(false),
        }}
        secondaryActionProps={{
          label: secondaryActionLabel,
          onClick: () => setOpen(false),
        }}
        requireTextEntryConfirmation={requireTextEntryConfirmation}
      >
        This is some description text, and it is extra long so it fills up this
        modal. Another thing about the modals here. This is some description
        text, and it is extra long so it fills up this modal. Another thing
        about the modals here.
      </ConfirmationModal>
    </>
  );
}

function Cancel() {
  const [open, setOpen] = useState(false);
  const requireTextEntryConfirmation = boolean(
    'Require text confirmation',
    false,
  );
  const primaryActionLabel = text('Primary action label', 'Delete');
  const secondaryActionLabel = text('Secondary action label', 'Cancel');

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      <ConfirmationModal
        open={open}
        title="Delete Title Here"
        primaryActionProps={{
          label: primaryActionLabel,
          variant: 'danger',
          onClick: () => setOpen(false),
        }}
        secondaryActionProps={{
          label: secondaryActionLabel,
          onClick: () => setOpen(false),
        }}
        requireTextEntryConfirmation={requireTextEntryConfirmation}
      >
        This is some description text, and it is extra long so it fills up this
        modal. Another thing about the modals here. This is some description
        text, and it is extra long so it fills up this modal. Another thing
        about the modals here.
      </ConfirmationModal>
    </>
  );
}

storiesOf('ConfirmationModal', module)
  .add('Confirm', () => <Confirm />)
  .add('Delete', () => <Cancel />);
