import React from 'react';

import Modal from '@leafygreen-ui/modal';
import ConfirmationModal from '@leafygreen-ui/confirmation-modal';
import MarketingModal from '@leafygreen-ui/marketing-modal';

export const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Note: The initialFocus prop now supports React refs in addition to selector strings. Consider using a ref for better type safety. */}
      <Modal
        open={open}
        setOpen={setOpen}
        backdropClassName="modal-backdrop"
        className="modal-content"
        initialFocus="#modal-button"
      >
        <button id="modal-button">Modal Button</button>
      </Modal>
      {/* Note: The initialFocus prop now supports React refs in addition to selector strings. Consider using a ref for better type safety. */}
      <ConfirmationModal
        open={open}
        setOpen={setOpen}
        backdropClassName="confirmation-backdrop"
        className="confirmation-content"
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
