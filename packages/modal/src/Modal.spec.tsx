import React, { useState } from 'react';
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import Modal from './Modal';

const modalContent = 'Modal Content';

const ModalWrapper = ({
  open: initialOpen,
  ...props
}: Partial<React.ComponentProps<typeof Modal>>) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <Modal data-testid="modal-test-id" {...props} open={open} setOpen={setOpen}>
      {modalContent}
    </Modal>
  );
};

function renderModal(props: Partial<React.ComponentProps<typeof Modal>> = {}) {
  return render(<ModalWrapper {...props}>{modalContent}</ModalWrapper>);
}

describe('packages/modal', () => {
  describe('when the "open" prop is true', () => {
    test('renders modal to the DOM', () => {
      const { getByRole } = renderModal({ open: true });
      const modal = getByRole('dialog');

      expect(modal).toBeVisible();
    });

    test(`renders the content as expected`, () => {
      const { getByText } = renderModal({ open: true });
      const content = getByText(modalContent);
      expect(content).toBeVisible();
    });

    test('closes modal when escape key is pressed', async () => {
      const { getByRole } = renderModal({ open: true });

      const modal = getByRole('dialog');
      fireEvent.keyDown(document, { key: 'Escape', keyCode: 27 });

      await waitForElementToBeRemoved(modal);
    });

    test('when "shouldClose" prop returns false', async () => {
      const { getByRole } = renderModal({
        open: true,
        shouldClose: () => false,
      });

      const modal = getByRole('dialog');
      fireEvent.click(modal.parentElement!);

      await expect(waitForElementToBeRemoved(modal)).rejects.toEqual(
        Error('Timed out in waitForElementToBeRemoved.'),
      );
      expect(modal).toBeVisible();
    });

    test('when "shouldClose" returns true', async () => {
      const { getByRole } = renderModal({
        open: true,
        shouldClose: () => true,
      });

      const modal = getByRole('dialog');
      fireEvent.click(modal.parentElement!);

      await waitForElementToBeRemoved(modal);
    });

    test('when "closeOnBackdropClick" is false', async () => {
      const { getByRole } = renderModal({
        closeOnBackdropClick: false,
        open: true,
      });

      const modal = getByRole('dialog');
      fireEvent.click(modal.parentElement!);

      await expect(waitForElementToBeRemoved(modal)).rejects.toEqual(
        Error('Timed out in waitForElementToBeRemoved.'),
      );
      expect(modal).toBeVisible();
    });

    test('when "closeOnBackdropClick" is true', async () => {
      const { getByRole } = renderModal({
        closeOnBackdropClick: true,
        open: true,
      });

      const modal = getByRole('dialog');
      fireEvent.click(modal.parentElement!);

      await waitForElementToBeRemoved(modal);
    });
  });

  describe('when "open" prop is false', () => {
    test('does not render to the DOM', () => {
      const { queryByRole } = renderModal({ open: false });
      const modal = queryByRole('dialog');
      expect(modal).not.toBeInTheDocument();
    });
  });
});
