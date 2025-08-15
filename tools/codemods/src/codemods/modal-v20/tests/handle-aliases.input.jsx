import React from 'react';

import MyModal from '@leafygreen-ui/modal';
import LGConfirmationModal from '@leafygreen-ui/confirmation-modal';
import FooModal from '@leafygreen-ui/marketing-modal';

export const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MyModal 
        open={open}
        setOpen={setOpen}
        className="backdrop-style"
        contentClassName="modal-content"
        initialFocus="#lg-button"
      >
        <button id="lg-button">LG Modal Button</button>
      </MyModal>
      
      <LGConfirmationModal
        open={open}
        setOpen={setOpen}
        className="confirmation-backdrop"
        contentClassName="confirmation-content"
        initialFocus="#confirm-btn"
        title="Confirm"
      >
        <button id="confirm-btn">Confirm</button>
      </LGConfirmationModal>
      
      <FooModal
        open={open}
        setOpen={setOpen}
        contentClassName="marketing-content"
        initialFocus="#marketing-cta"
        title="Marketing"
      >
        <button id="marketing-cta">CTA</button>
      </FooModal>
    </>
  );
};
