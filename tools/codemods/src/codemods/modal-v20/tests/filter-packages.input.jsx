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
        className="modal-backdrop"
        contentClassName="modal-content"
        initialFocus="#modal-button"
      >
        <button id="modal-button">Modal Button</button>
      </Modal>
      
      <ConfirmationModal
        open={open}
        setOpen={setOpen}
        className="confirmation-backdrop"
        contentClassName="confirmation-content"
        initialFocus="#confirmation-button"
        title="Confirm"
      >
        <button id="confirmation-button">Confirm</button>
      </ConfirmationModal>
      
      <MarketingModal
        open={open}
        setOpen={setOpen}
        className="marketing-backdrop"
        contentClassName="marketing-content"
        initialFocus="#marketing-button"
        title="Marketing"
      >
        <button id="marketing-button">Marketing Button</button>
      </MarketingModal>
    </>
  );
};
