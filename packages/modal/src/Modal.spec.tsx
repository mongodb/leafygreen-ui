import React, { useState } from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import ModalView from './';

const modalContent = 'Modal Content';

const ModalWrapper = ({
  open: initialOpen,
  ...props
}: Partial<React.ComponentProps<typeof ModalView>>) => {
  const [open, setOpen] = useState(initialOpen);

  return (
    <ModalView
      data-testid="modal-test-id"
      {...props}
      open={open}
      setOpen={setOpen}
    >
      {modalContent}
    </ModalView>
  );
};

function renderModal(
  props: Partial<React.ComponentProps<typeof ModalView>> = {},
) {
  return render(<ModalWrapper {...props}>{modalContent}</ModalWrapper>);
}

describe('packages/modal', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderModal({ open: true });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

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

    test('closes modal when button is clicked', async () => {
      const { getByRole } = renderModal({ open: true });
      const modal = getByRole('dialog');
      const button = getByRole('button');

      userEvent.click(button);

      await waitForElementToBeRemoved(modal);
      expect(modal).not.toBeInTheDocument();
    });

    test('closes modal when escape key is pressed', async () => {
      const { getByRole } = renderModal({ open: true });

      const modal = getByRole('dialog');
      userEvent.type(modal, '{esc}');

      await waitForElementToBeRemoved(modal);
      expect(modal).not.toBeInTheDocument();
    });

    test('when "shouldClose" prop returns false', async () => {
      const { getByRole } = renderModal({
        open: true,
        shouldClose: () => false,
      });

      const modal = getByRole('dialog');
      userEvent.type(modal, '{esc}');

      await expectElementToNotBeRemoved(modal);

      expect(modal).toBeVisible();
    });

    test('when "shouldClose" returns true', async () => {
      const { getByRole } = renderModal({
        open: true,
        shouldClose: () => true,
      });

      const modal = getByRole('dialog');
      userEvent.type(modal, '{esc}');

      await waitForElementToBeRemoved(modal);
      expect(modal).not.toBeInTheDocument();
    });

    test('backdrop click should do nothing', async () => {
      const { getByRole } = renderModal({
        open: true,
      });

      const modal = getByRole('dialog');
      userEvent.click(modal.parentElement!);

      await expectElementToNotBeRemoved(modal);

      expect(modal).toBeVisible();
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

async function expectElementToNotBeRemoved(element: HTMLElement) {
  try {
    await waitForElementToBeRemoved(element);
    throw new Error('Expected to catch error.');
  } catch (error) {
    // eslint-disable-next-line jest/no-try-expect
    if (error instanceof Error) {
      expect(error.toString()).toMatch(
        'Timed out in waitForElementToBeRemoved.',
      );
    }
  }
}
