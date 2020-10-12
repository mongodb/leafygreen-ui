import React, { useState } from 'react';
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import ConfirmationModal from '.';

const WrappedModal = ({
  open: initialOpen,
  ...props
}: Partial<React.ComponentProps<typeof ConfirmationModal>>) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <ConfirmationModal
      title="Title text"
      buttonText="Confirm"
      open={open}
      onConfirm={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      {...props}
    >
      {props.children ?? 'Content text'}
    </ConfirmationModal>
  );
};

function renderModal(
  props: Partial<React.ComponentProps<typeof ConfirmationModal>> = {},
) {
  return render(<WrappedModal {...props} />);
}

describe('packages/confirmation-modal', () => {
  test('does not render if closed', () => {
    renderModal();
    expect(document.body.innerHTML).toEqual('<div></div>');
  });

  test('renders if open', () => {
    const { getByText } = renderModal({ open: true });
    expect(getByText('Title text')).toBeVisible();
    expect(getByText('Content text')).toBeVisible();
    expect(getByText('Confirm')).toBeVisible();
    expect(getByText('Cancel')).toBeVisible();
  });

  test('fires `onConfirm` on confirmation', () => {
    const confirmSpy = jest.fn();
    const cancelSpy = jest.fn();

    const { getByText } = renderModal({
      open: true,
      onConfirm: confirmSpy,
      onCancel: cancelSpy,
    });

    const button = getByText('Confirm');
    expect(button).toBeVisible();

    fireEvent.click(button);
    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(cancelSpy).not.toHaveBeenCalled();
  });

  test('fires `onCancel` on cancel', () => {
    const confirmSpy = jest.fn();
    const cancelSpy = jest.fn();

    const { getByText } = renderModal({
      open: true,
      onConfirm: confirmSpy,
      onCancel: cancelSpy,
    });

    const button = getByText('Cancel');
    expect(button).toBeVisible();

    fireEvent.click(button);
    expect(confirmSpy).not.toHaveBeenCalled();
    expect(cancelSpy).toHaveBeenCalledTimes(1);
  });

  describe('closes when', () => {
    test('backdrop is clicked', async () => {
      const { getByRole } = renderModal({ open: true });
      const modal = getByRole('dialog');

      fireEvent.click(modal.parentElement!);

      await waitForElementToBeRemoved(modal);
    });

    test('escape key is pressed', async () => {
      const { getByRole } = renderModal({ open: true });
      const modal = getByRole('dialog');

      fireEvent.keyDown(document, { key: 'Escape', keyCode: 27 });

      await waitForElementToBeRemoved(modal);
    });

    test('x icon is clicked', async () => {
      const { getByLabelText, getByRole } = renderModal({ open: true });
      const modal = getByRole('dialog');

      const x = getByLabelText('Close modal');
      fireEvent.click(x);

      await waitForElementToBeRemoved(modal);
    });
  });

  describe('requiring text confirmation', () => {
    test('can only click confirmation button when text confirmation is entered', () => {
      const { getByText, getByLabelText } = renderModal({
        open: true,
        requiredInputText: 'Confirm',
      });

      const confirmationButton = getByText('Confirm').closest('button');
      expect(confirmationButton).toBeDisabled();

      const cancelButton = getByText('Cancel').closest('button');
      expect(cancelButton).not.toBeDisabled();

      const textInput = getByLabelText('Type "Confirm" to confirm your action');

      expect(textInput).toBeVisible();
      expect(textInput).toBe(document.activeElement);

      // Should still be disabled after partial entry
      fireEvent.change(textInput, { target: { value: 'Confir' } });
      expect(confirmationButton).toBeDisabled();

      fireEvent.change(textInput, { target: { value: 'Confirm' } });
      expect(confirmationButton).not.toBeDisabled();

      // Should be disabled again
      fireEvent.change(textInput, { target: { value: 'Confirm?' } });
      expect(confirmationButton).toBeDisabled();

      // Case matters
      fireEvent.change(textInput, { target: { value: 'confirm' } });
      expect(confirmationButton).toBeDisabled();
    });
  });
});
