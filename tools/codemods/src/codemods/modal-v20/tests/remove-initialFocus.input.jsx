import React from 'react';

import Modal from '@leafygreen-ui/modal';
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';
import MarketingModal from '@leafygreen-ui/marketing-modal';

export const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal 
        open={open}
        setOpen={setOpen}
        initialFocus="#primary-button"
        contentClassName="modal-style"
      >
        <h2>Modal title</h2>
        <p>Modal content</p>
        <button id="primary-button">Primary Action</button>
      </Modal>
      
      <ConfirmationModal
        open={open}
        setOpen={setOpen}
        initialFocus="#confirm-button"
        title="Confirm action"
      >
        <p>Are you sure you want to proceed?</p>
        <button id="confirm-button">Confirm</button>
      </ConfirmationModal>
      
      <MarketingModal
        open={open}
        setOpen={setOpen}
        initialFocus="#cta-button"
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
