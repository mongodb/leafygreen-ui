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
        backdropClassName="modal-backdrop"
        className="modal-content"
      >
        <button id="modal-button">Modal Button</button>
      </Modal>
      {/* TODO: Please specify autoFocus prop on the element that should receive initial focus. Alternatively, you may rely on the default focus behavior which will focus the first focusable element in the children. */}
      <ConfirmationModal
        open={open}
        setOpen={setOpen}
        backdropClassName="confirmation-backdrop"
        className="confirmation-content"
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
