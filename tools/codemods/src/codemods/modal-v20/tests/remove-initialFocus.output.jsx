import React from 'react';

import Modal from '@leafygreen-ui/modal';
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';
import MarketingModal from '@leafygreen-ui/marketing-modal';

export const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TODO: Please specify autoFocus prop on the element that should receive initial focus. Alternatively, you may rely on the default focus behavior which will focus the first focusable element in the children. */}
      <Modal 
        open={open}
        setOpen={setOpen}
        className="modal-style"
      >
        <h2>Modal title</h2>
        <p>Modal content</p>
        <button id="primary-button">Primary Action</button>
      </Modal>
      {/* TODO: Please specify autoFocus prop on the element that should receive initial focus. Alternatively, you may rely on the default focus behavior which will focus the first focusable element in the children. */}
      <ConfirmationModal
        open={open}
        setOpen={setOpen}
        title="Confirm action"
      >
        <p>Are you sure you want to proceed?</p>
        <button id="confirm-button">Confirm</button>
      </ConfirmationModal>
      {/* TODO: Please specify autoFocus prop on the element that should receive initial focus. Alternatively, you may rely on the default focus behavior which will focus the first focusable element in the children. */}
      <MarketingModal
        open={open}
        setOpen={setOpen}
        title="Special Offer"
      >
        <p>Limited time offer!</p>
        <button id="cta-button">Get Started</button>
      </MarketingModal>
      {/* Modal without initialFocus should not be affected */}
      <Modal open={open} setOpen={setOpen}>
        <h2>Simple Modal</h2>
        <p>No initial focus specified</p>
      </Modal>
    </>
  );
};
