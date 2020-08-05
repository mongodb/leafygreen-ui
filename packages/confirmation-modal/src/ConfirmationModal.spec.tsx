import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ConfirmationModal from '.';

function renderModal(
  props: Partial<React.ComponentProps<typeof ConfirmationModal>> = {},
) {
  return render(
    <ConfirmationModal
      title="Title text"
      primaryActionProps={{
        label: 'Primary action',
      }}
      secondaryActionProps={{
        label: 'Secondary action',
      }}
      {...props}
    >
      {props.children ?? 'Content text'}
    </ConfirmationModal>,
  );
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
