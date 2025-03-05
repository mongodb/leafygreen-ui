import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Option, OptionGroup, Select } from '@leafygreen-ui/select';

import Modal from './Modal';
import { ModalProps } from './Modal.types';

type TestProps = Partial<ModalProps>;

const content = 'Modal content';

function renderModal(props: TestProps) {
  const utils = render(<Modal {...props}>{content}</Modal>);
  return utils;
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

  describe('open and close behavior', () => {
    test('it renders a visible modal to the DOM when the "open" prop is true', () => {
      const { getByRole } = renderModal({ open: true });
      const modal = getByRole('dialog');
      expect(modal).toBeVisible();
    });

    test('it renders a hidden modal to the DOM when the "open" prop is false', () => {
      const { getByRole } = renderModal({ open: false });
      const modal = getByRole('dialog', { hidden: true });
      expect(modal).not.toBeVisible();
    });

    describe('clicking the close button', () => {
      test('closes the modal', async () => {
        const { getByLabelText, getByRole } = renderModal({ open: true });
        const closeButton = getByLabelText('Close modal');
        userEvent.click(closeButton);

        await waitFor(() => getByRole('dialog', { hidden: true }));
      });

      test('fires the setOpen callback', () => {
        const setOpen = jest.fn();
        const { getByLabelText } = renderModal({ open: true, setOpen });
        const closeButton = getByLabelText('Close modal');
        userEvent.click(closeButton);

        expect(setOpen).toHaveBeenCalledWith(false);
      });
    });

    describe('using the escape key', () => {
      test('closes the modal', async () => {
        const { getByRole } = renderModal({ open: true });
        const modal = getByRole('dialog');
        userEvent.type(modal, '{esc}');

        await waitFor(() => getByRole('dialog', { hidden: true }));
      });

      test('fires the setOpen callback', () => {
        const setOpen = jest.fn();
        const { getByRole } = renderModal({ open: true, setOpen });
        const modal = getByRole('dialog');
        userEvent.type(modal, '{esc}');

        expect(setOpen).toHaveBeenCalledWith(false);
      });
    });

    describe('clicking the backdrop, outside the modal', () => {
      test('does not close the modal', async () => {
        const { getByRole } = renderModal({ open: true });
        const modal = getByRole('dialog');
        userEvent.click(modal.parentElement!);

        await waitFor(() => expect(modal).toBeVisible());
      });

      test('does not call setOpen', () => {
        const setOpen = jest.fn();
        const { getByRole } = renderModal({ open: true, setOpen });
        const modal = getByRole('dialog');
        userEvent.click(modal.parentElement!);

        expect(setOpen).not.toHaveBeenCalled();
      });
    });

    describe('shouldClose', () => {
      test('prevents the modal from closing when shouldClose returns false', async () => {
        const { getByLabelText, getByRole } = renderModal({
          open: true,
          shouldClose: () => false,
        });

        const closeButton = getByLabelText('Close modal');
        userEvent.click(closeButton);

        await waitFor(() => getByRole('dialog'));
        expect(getByRole('dialog')).toBeVisible();
      });

      test('does not call setOpen', () => {
        const setOpen = jest.fn();
        const { getByLabelText } = renderModal({
          open: true,
          setOpen,
          shouldClose: () => false,
        });

        const closeButton = getByLabelText('Close modal');
        userEvent.click(closeButton);

        expect(setOpen).not.toHaveBeenCalled();
      });
    });

    test('interacting with an element inside of the modal does not close it', () => {
      const buttonClick = jest.fn();
      const { getByRole, getByText } = render(
        <Modal open>
          <button onClick={buttonClick}>Click me</button>
        </Modal>,
      );

      const modal = getByRole('dialog');
      expect(modal).toBeVisible();

      const button = getByText('Click me');
      userEvent.click(button);

      expect(modal).toBeVisible();
      expect(buttonClick).toHaveBeenCalled();
    });
  });

  describe('modal contents', () => {
    test('it renders the children as expected', () => {
      const { getByText } = renderModal({ open: true });
      const modalContent = getByText(content);
      expect(modalContent).toBeVisible();
    });

    test('it renders an X button inside the modal', () => {
      const { getByLabelText } = renderModal({ open: true });
      const closeButton = getByLabelText('Close modal');
      expect(closeButton).toBeVisible();
    });

    test('uses "id" from props when set', () => {
      const { getByRole } = renderModal({
        id: 'id-test',
        open: true,
      });

      const modal = getByRole('dialog');
      expect(modal.getAttribute('id')).toBe('id-test');
    });
  });

  test('popover renders inside same portal as modal', async () => {
    const { getByTestId } = render(
      <Modal data-testid="modal-test-id" open={true}>
        Modal Content
        <Select
          label="label"
          size="small"
          placeholder="animals"
          name="pets"
          data-testid="modal-select-test-id"
        >
          <OptionGroup label="Common">
            <Option value="dog">Dog</Option>
            <Option value="cat">Cat</Option>
            <Option value="axolotl">Axolotl</Option>
          </OptionGroup>
        </Select>
      </Modal>,
    );

    const modal = getByTestId('modal-test-id');
    const select = getByTestId('modal-select-test-id');
    userEvent.click(select);

    await waitFor(() => {
      expect(modal).toHaveTextContent('Axolotl');
    });
  });
});
