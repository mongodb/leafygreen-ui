import React, { useState } from 'react';
import {
  act,
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { axe } from 'jest-axe';

import ConfirmationModal from '..';

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
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container, getByText } = renderModal({ open: true });
      const results = await axe(container);
      expect(results).toHaveNoViolations();

      let newResults = null as any;
      act(() => void fireEvent.click(getByText('Confirm')));
      await act(async () => {
        newResults = await axe(container);
      });
      expect(newResults).toHaveNoViolations();
    });
  });

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
      expect(confirmationButton).toHaveAttribute('aria-disabled', 'true');

      const cancelButton = getByText('Cancel').closest('button');
      expect(cancelButton).not.toHaveAttribute('aria-disabled', 'true');

      const textInput = getByLabelText('Type "Confirm" to confirm your action');

      expect(textInput).toBeVisible();
      expect(textInput).toBe(document.activeElement);

      // Should still be disabled after partial entry
      fireEvent.change(textInput, { target: { value: 'Confir' } });
      expect(confirmationButton).toHaveAttribute('aria-disabled', 'true');

      fireEvent.change(textInput, { target: { value: 'Confirm' } });
      expect(confirmationButton).not.toHaveAttribute('aria-disabled', 'true');

      // Should be disabled again
      fireEvent.change(textInput, { target: { value: 'Confirm?' } });
      expect(confirmationButton).toHaveAttribute('aria-disabled', 'true');

      // Case matters
      fireEvent.change(textInput, { target: { value: 'confirm' } });
      expect(confirmationButton).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('submit is disabled when', () => {
    test('"submitDisabled" prop is set', () => {
      const { getByText } = renderModal({
        open: true,
        submitDisabled: true,
      });

      const confirmationButton = getByText('Confirm').closest('button');
      expect(confirmationButton).toHaveAttribute('aria-disabled', 'true');

      const button = getByText('Confirm');
      expect(button).toBeVisible();

      // Modal doesn't close when button is clicked
      fireEvent.click(button);
      expect(button).toBeVisible();
    });

    test('"submitDisabled" prop is set and the "requiredInputText" prop is also set', () => {
      const { getByText, getByLabelText } = renderModal({
        open: true,
        submitDisabled: true,
        requiredInputText: 'Confirm',
      });

      const confirmationButton = getByText('Confirm').closest('button');
      expect(confirmationButton).toHaveAttribute('aria-disabled', 'true');

      const textInput = getByLabelText('Type "Confirm" to confirm your action');
      expect(textInput).toBeVisible();

      fireEvent.change(textInput, { target: { value: 'Confirm' } });
      expect(confirmationButton).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
