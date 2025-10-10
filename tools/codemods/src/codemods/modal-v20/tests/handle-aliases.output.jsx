import React from 'react';

import MyModal from '@leafygreen-ui/modal';
import LGConfirmationModal from '@leafygreen-ui/confirmation-modal';
import FooModal from '@leafygreen-ui/marketing-modal';

export const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Note: The initialFocus prop now supports React refs in addition to selector strings. Consider using a ref for better type safety. */}
      <MyModal
        open={open}
        setOpen={setOpen}
        backdropClassName="backdrop-style"
        className="modal-content"
        initialFocus="#lg-button"
      >
        <button id="lg-button">LG Modal Button</button>
      </MyModal>
      {/* Note: The initialFocus prop now supports React refs in addition to selector strings. Consider using a ref for better type safety. */}
      <LGConfirmationModal
        open={open}
        setOpen={setOpen}
        backdropClassName="confirmation-backdrop"
        className="confirmation-content"
        initialFocus="#confirm-btn"
        title="Confirm"
      >
        <button id="confirm-btn">Confirm</button>
      </LGConfirmationModal>
      {/* Note: The initialFocus prop now supports React refs in addition to selector strings. Consider using a ref for better type safety. */}
      <FooModal
        open={open}
        setOpen={setOpen}
        className="marketing-content"
        initialFocus="#marketing-cta"
        title="Marketing"
      >
        <button id="marketing-cta">CTA</button>
      </FooModal>
    </>
  );
};
