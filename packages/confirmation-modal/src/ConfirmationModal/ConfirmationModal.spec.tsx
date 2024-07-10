import React, { useState } from 'react';
import {
  act,
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { LGIDS_MODAL } from '@leafygreen-ui/modal';

import { LGIDS_CONFIRMATION_MODAL } from '../constants';
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

  describe('button text', () => {
    // TODO: remove - buttonText is deprecated
    test('renders from "buttonText"', () => {
      const { getByText } = renderModal({
        open: true,
        buttonText: 'custom button text',
      });

      expect(getByText('custom button text')).toBeVisible();
    });

    test('renders from "confirmButtonProps"', () => {
      const { getByText } = renderModal({
        open: true,
        buttonText: undefined,
        confirmButtonProps: {
          children: 'custom confirm',
        },
      });

      expect(getByText('custom confirm')).toBeVisible();
    });

    // TODO: remove - buttonText is deprecated
    test('overrides "confirmButtonProps"', () => {
      const { getByText } = renderModal({
        open: true,
        buttonText: 'custom button text',
        confirmButtonProps: {
          children: 'custom confirm',
        },
      });

      expect(getByText('custom button text')).toBeVisible();
    });
  });

  describe('on confirm', () => {
    // TODO: remove test  - onConfirm is deprecated
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

    test('fires `onClick` from "confirmButtonProps"', () => {
      const confirmSpy = jest.fn();

      const { getByText } = renderModal({
        open: true,
        onConfirm: undefined,
        confirmButtonProps: {
          onClick: confirmSpy,
        },
      });

      const button = getByText('Confirm');
      expect(button).toBeVisible();

      fireEvent.click(button);
      expect(confirmSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('on cancel', () => {
    // TODO: remove test - OnCancel is deprecated
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

    test('fires `onClick` from "cancelButtonProps"', () => {
      const confirmSpy = jest.fn();
      const cancelSpy = jest.fn();

      const { getByText } = renderModal({
        open: true,
        onCancel: undefined,
        cancelButtonProps: {
          onClick: cancelSpy,
        },
      });

      const button = getByText('Cancel');
      expect(button).toBeVisible();

      fireEvent.click(button);
      expect(confirmSpy).not.toHaveBeenCalled();
      expect(cancelSpy).toHaveBeenCalledTimes(1);
    });
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

    const requiredInputTextCases = [
      {
        describeCase:
          'when requiredInputText is provided, confirm button is reset',
        requiredInputText: 'Confirm',
        disabledAfterReopeningModal: true,
      },
      {
        describeCase:
          'when requiredInputText is undefined, confirm button is not reset',
        requiredInputText: undefined,
        disabledAfterReopeningModal: false,
      },
    ];

    const buttonClickCases = [
      { testCase: 'on cancel', testId: LGIDS_CONFIRMATION_MODAL.cancel },
      { testCase: 'on confirm', testId: LGIDS_CONFIRMATION_MODAL.confirm },
      { testCase: 'on modal close', testId: LGIDS_MODAL.close },
    ];

    describe.each(requiredInputTextCases)(
      '$describeCase',
      ({ requiredInputText, disabledAfterReopeningModal }) => {
        test.each(buttonClickCases)('$testCase', async ({ testId }) => {
          const { findByTestId, getByLabelText, getByRole, rerender } =
            renderModal({
              open: true,
              requiredInputText,
            });

          const modal = getByRole('dialog');
          const confirmationButton = await findByTestId(
            LGIDS_CONFIRMATION_MODAL.confirm,
          );
          const buttonToClick = await findByTestId(testId);
          expect(confirmationButton).toHaveAttribute(
            'aria-disabled',
            disabledAfterReopeningModal.toString(),
          );

          let textInput;

          if (requiredInputText) {
            textInput = getByLabelText(
              `Type "${requiredInputText}" to confirm your action`,
            );
            fireEvent.change(textInput, {
              target: { value: requiredInputText },
            });
            expect(confirmationButton).not.toHaveAttribute(
              'aria-disabled',
              'true',
            );
          }

          userEvent.click(buttonToClick);

          await waitForElementToBeRemoved(modal);

          rerender(
            <ConfirmationModal
              title="Title text"
              open={true}
              requiredInputText={requiredInputText}
            >
              Content text
            </ConfirmationModal>,
          );

          if (requiredInputText) {
            textInput = getByLabelText(
              `Type "${requiredInputText}" to confirm your action`,
            );
            expect(textInput).toHaveValue('');
          }

          expect(confirmationButton).toHaveAttribute(
            'aria-disabled',
            disabledAfterReopeningModal.toString(),
          );
        });
      },
    );
  });

  describe('confirm is not disabled when', () => {
    test('By default', () => {
      const { getByText } = renderModal({
        open: true,
      });

      const confirmationButton = getByText('Confirm').closest('button');
      expect(confirmationButton).toHaveAttribute('aria-disabled', 'false');
    });

    // TODO: remove this test - submitDisabled is deprecated
    test('"submitDisabled" prop is false and "confirmButtonProps" has "disabled: true"', async () => {
      const { getByText, getByRole } = renderModal({
        open: true,
        submitDisabled: false,
        confirmButtonProps: {
          disabled: true,
        },
      });

      const confirmationButton = getByText('Confirm').closest('button');
      expect(confirmationButton).toHaveAttribute('aria-disabled', 'false');

      const modal = getByRole('dialog');
      const button = getByText('Confirm');
      expect(button).toBeVisible();

      // Modal doesn't close when button is clicked
      fireEvent.click(button);
      await waitForElementToBeRemoved(modal);
    });

    test('"confirmButtonProps" has "disabled: false"', async () => {
      const { getByText, getByRole } = renderModal({
        open: true,
        confirmButtonProps: {
          disabled: false,
        },
      });

      const confirmationButton = getByText('Confirm').closest('button');
      expect(confirmationButton).toHaveAttribute('aria-disabled', 'false');

      const modal = getByRole('dialog');
      const button = getByText('Confirm');
      expect(button).toBeVisible();

      // Modal doesn't close when button is clicked
      fireEvent.click(button);
      await waitForElementToBeRemoved(modal);
    });
  });

  describe('confirm is disabled when', () => {
    test('"confirmButtonProps" includes "disabled"', () => {
      const { getByText } = renderModal({
        open: true,
        confirmButtonProps: {
          disabled: true,
        },
      });

      const confirmationButton = getByText('Confirm').closest('button');
      expect(confirmationButton).toHaveAttribute('aria-disabled', 'true');

      const button = getByText('Confirm');
      expect(button).toBeVisible();

      // Modal doesn't close when button is clicked
      fireEvent.click(button);
      expect(button).toBeVisible();
    });

    // TODO: remove this test - submitDisabled is deprecated
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

    // TODO: remove this test - submitDisabled is deprecated
    test('"submitDisabled" prop is true and "confirmButtonProps" has "disabled: false"', () => {
      const { getByText } = renderModal({
        open: true,
        submitDisabled: true,
        confirmButtonProps: {
          disabled: false,
        },
      });

      const confirmationButton = getByText('Confirm').closest('button');
      expect(confirmationButton).toHaveAttribute('aria-disabled', 'true');

      const button = getByText('Confirm');
      expect(button).toBeVisible();

      // Modal doesn't close when button is clicked
      fireEvent.click(button);
      expect(button).toBeVisible();
    });

    test('"confirmButtonProps" has "disabled: true" and the "requiredInputText" prop is also set', () => {
      const { getByText, getByLabelText } = renderModal({
        open: true,
        confirmButtonProps: {
          disabled: true,
        },
        requiredInputText: 'Confirm',
      });

      const confirmationButton = getByText('Confirm').closest('button');
      expect(confirmationButton).toHaveAttribute('aria-disabled', 'true');

      const textInput = getByLabelText('Type "Confirm" to confirm your action');
      expect(textInput).toBeVisible();

      fireEvent.change(textInput, { target: { value: 'Confirm' } });
      expect(confirmationButton).toHaveAttribute('aria-disabled', 'true');
    });

    // TODO: remove this test - submitDisabled is deprecated
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

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('types behave as expected', () => {
    <>
      <ConfirmationModal
        title="Title text"
        buttonText="Confirm"
        onConfirm={() => {}}
        onCancel={() => {}}
        open={true}
        submitDisabled={false}
      >
        Hey
      </ConfirmationModal>

      <ConfirmationModal
        title="Title text"
        confirmButtonProps={{
          children: 'confirm',
          onClick: () => {},
          disabled: true,
        }}
      >
        Hey
      </ConfirmationModal>

      <ConfirmationModal
        title="Title text"
        confirmButtonProps={{
          // @ts-expect-error - variant does exist in  confirmButtonProps
          variant: 'primary',
        }}
      >
        Hey
      </ConfirmationModal>

      <ConfirmationModal
        title="Title text"
        cancelButtonProps={{
          children: 'confirm',
          variant: 'primary',
          disabled: true,
          isLoading: true,
        }}
      >
        Hey
      </ConfirmationModal>
    </>;
  });
});
