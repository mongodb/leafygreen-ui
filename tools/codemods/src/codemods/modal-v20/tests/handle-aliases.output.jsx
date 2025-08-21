import React from 'react';

import MyModal from '@leafygreen-ui/modal';
import LGConfirmationModal from '@leafygreen-ui/confirmation-modal';
import FooModal from '@leafygreen-ui/marketing-modal';

export const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TODO: Please specify autoFocus prop on the element that should receive initial focus. Alternatively, you may rely on the default focus behavior which will focus the first focusable element in the children. */}
      <MyModal 
        open={open}
        setOpen={setOpen}
        backdropClassName="backdrop-style"
        className="modal-content"
      >
        <button id="lg-button">LG Modal Button</button>
      </MyModal>
      {/* TODO: Please specify autoFocus prop on the element that should receive initial focus. Alternatively, you may rely on the default focus behavior which will focus the first focusable element in the children. */}
      <LGConfirmationModal
        open={open}
        setOpen={setOpen}
        backdropClassName="confirmation-backdrop"
        className="confirmation-content"
        title="Confirm"
      >
        <button id="confirm-btn">Confirm</button>
      </LGConfirmationModal>
      {/* TODO: Please specify autoFocus prop on the element that should receive initial focus. Alternatively, you may rely on the default focus behavior which will focus the first focusable element in the children. */}
      <FooModal
        open={open}
        setOpen={setOpen}
        className="marketing-content"
        title="Marketing"
      >
        <button id="marketing-cta">CTA</button>
      </FooModal>
    </>
  );
};
