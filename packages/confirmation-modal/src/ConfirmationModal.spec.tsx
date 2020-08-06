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
      primaryActionProps={{
        label: 'Primary action',
      }}
      secondaryActionProps={{
        label: 'Secondary action',
      }}
      open={open}
      setOpen={setOpen}
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
    expect(getByText('Primary action')).toBeVisible();
    expect(getByText('Secondary action')).toBeVisible();
  });

  test('fires primary action', () => {
    const clickSpy = jest.fn();

    const { getByText } = renderModal({
      open: true,
      primaryActionProps: {
        label: 'Primary action',
        onClick: clickSpy,
      },
    });

    const button = getByText('Primary action');
    expect(button).toBeVisible();

    fireEvent.click(button);
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  test('fires secondary action', () => {
    const clickSpy = jest.fn();

    const { getByText } = renderModal({
      open: true,
      secondaryActionProps: {
        label: 'Secondary action',
        onClick: clickSpy,
      },
    });

    const button = getByText('Secondary action');
    expect(button).toBeVisible();

    fireEvent.click(button);
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  describe('closes when', () => {
    test('backdrop is clicked', async () => {
      const { getByRole } = renderModal({ open: true });
      const modal = getByRole('dialog');

      fireEvent.click(modal.parentElement);

      await waitForElementToBeRemoved(modal);
    });

    test('escape key is pressed', async () => {
      const { getByRole } = renderModal({ open: true });
      const modal = getByRole('dialog');

      fireEvent.keyDown(document, { key: 'Escape', keyCode: 27 });

      await waitForElementToBeRemoved(modal);
    });

    test('x icon is clicked', async () => {
      const { getByTitle, getByRole } = renderModal({ open: true });
      const modal = getByRole('dialog');

      const x = getByTitle('close modal');
      fireEvent.click(x);

      await waitForElementToBeRemoved(modal);
    });
  });

  describe('requiring text confirmation', () => {
    test('can select primary action only when text confirmation is entered', () => {
      const { getByText, getByLabelText } = renderModal({
        open: true,
        requireTextEntryConfirmation: true,
      });

      const primaryButton = getByText('Primary action');
      expect(primaryButton).toBeDisabled();

      const secondaryButton = getByText('Secondary action');
      expect(secondaryButton).not.toBeDisabled();

      const textInput = getByLabelText(
        'Type "primary action" to confirm your action',
      );

      expect(textInput).toBeVisible();
      expect(textInput).toBe(document.activeElement);

      // Should still be disabled after partial entry
      fireEvent.change(textInput, { target: { value: 'primary actio' } });
      expect(primaryButton).toBeDisabled();

      fireEvent.change(textInput, { target: { value: 'primary action' } });
      expect(primaryButton).not.toBeDisabled();

      // Should be disabled again
      fireEvent.change(textInput, { target: { value: 'primary actions' } });
      expect(primaryButton).toBeDisabled();

      // Case matters
      fireEvent.change(textInput, { target: { value: 'Primary action' } });
      expect(primaryButton).toBeDisabled();
    });
  });
});
