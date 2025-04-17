import React, { useState } from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { getTestUtils } from '../utils/getTestUtils';
import ModalView from '..';

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
  const utils = render(<ModalWrapper {...props}>{modalContent}</ModalWrapper>);
  const { getModal, findModal, queryModal } = getTestUtils();
  return { ...utils, getModal, findModal, queryModal };
}

describe('packages/modal', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = true;
    });

    HTMLDialogElement.prototype.showModal = jest.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = true;
    });

    HTMLDialogElement.prototype.close = jest.fn(function mock(
      this: HTMLDialogElement,
    ) {
      this.open = false;
    });
  });

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderModal({ open: true });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('when the "open" prop is true', () => {
    test('renders modal to the DOM', () => {
      const { getModal } = renderModal({ open: true });
      const modal = getModal();
      expect(modal).toBeVisible();
    });

    test(`renders the content as expected`, () => {
      const { getByText } = renderModal({ open: true });
      const content = getByText(modalContent);
      expect(content).toBeVisible();
    });

    test('uses "id" from props when set', () => {
      const { getModal } = renderModal({
        id: 'id-test',
        open: true,
      });

      const modal = getModal();
      expect(modal.getAttribute('id')).toBe('id-test');
    });

    test('closes modal when button is clicked', () => {
      const { getByRole, getModal } = renderModal({ open: true });
      const modal = getModal();
      const button = getByRole('button');

      userEvent.click(button);

      expect(modal.getAttribute('open')).toBe(null);
      expect(modal).not.toBeVisible();
    });

    test('closes modal when escape key is pressed', () => {
      const { getModal } = renderModal({ open: true });

      const modal = getModal();

      userEvent.type(modal, '{esc}');

      expect(modal).not.toBeVisible();
    });

    test('when "shouldClose" prop returns false', () => {
      const { getModal } = renderModal({
        open: true,
        shouldClose: () => false,
      });

      const modal = getModal();
      userEvent.type(modal, '{esc}');

      expect(modal).toBeVisible();
    });

    test('when "shouldClose" returns true', () => {
      const { getModal } = renderModal({
        open: true,
        shouldClose: () => true,
      });

      const modal = getModal();
      userEvent.type(modal, '{esc}');

      expect(modal).not.toBeVisible();
    });

    test('backdrop click should do nothing', async () => {
      const { getModal } = renderModal({
        open: true,
      });

      const modal = getModal();
      userEvent.click(modal.parentElement!);

      await expectElementToNotBeRemoved(modal);

      expect(modal).toBeVisible();
    });
  });

  describe('when "open" prop is false', () => {
    test('does not render to the DOM', () => {
      const { queryModal } = renderModal({ open: false });
      const modal = queryModal();
      expect(modal).not.toBeVisible();
    });
  });
});

async function expectElementToNotBeRemoved(element: HTMLElement) {
  try {
    await waitForElementToBeRemoved(element);
    throw new Error('Expected to catch error.');
  } catch (error) {
    if (error instanceof Error) {
      expect(error.toString()).toMatch(
        'Timed out in waitForElementToBeRemoved.',
      );
    }
  }
}
