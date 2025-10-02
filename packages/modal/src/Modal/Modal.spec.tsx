import React, { useState } from 'react';
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Option, OptionGroup, Select } from '@leafygreen-ui/select';

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
  // Mock dialog methods for JSDOM environment
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

    test('closes modal when button is clicked', async () => {
      const { getByRole, getModal } = renderModal({ open: true });
      const modal = getModal();
      const button = getByRole('button');

      userEvent.click(button);

      await waitFor(() => {
        expect(modal).not.toHaveAttribute('open');
        expect(modal).not.toBeVisible();
      });
    });

    test('closes modal when escape key is pressed', async () => {
      const { getModal } = renderModal({ open: true });

      const modal = getModal();

      userEvent.type(modal, '{esc}');

      await waitFor(() => {
        expect(modal).not.toHaveAttribute('open');
        expect(modal).not.toBeVisible();
      });
    });

    test('when "shouldClose" prop returns false', async () => {
      const { getModal } = renderModal({
        open: true,
        shouldClose: () => false,
      });

      const modal = getModal();
      userEvent.type(modal, '{esc}');

      await expectElementToNotBeRemoved(modal);

      expect(modal).toBeVisible();
    });

    test('when "shouldClose" returns true', async () => {
      const { getModal } = renderModal({
        open: true,
        shouldClose: () => true,
      });

      const modal = getModal();
      userEvent.type(modal, '{esc}');

      await waitFor(() => {
        expect(modal).not.toHaveAttribute('open');
      });
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

    test('clicking on modal content does not close modal', async () => {
      const { getByText } = render(
        <ModalView open={true}>
          <div data-testid="modal-content">
            <h2>Test Modal</h2>
            <p>This is modal content</p>
          </div>
        </ModalView>,
      );

      const content = getByText('This is modal content');
      const modal = content.closest('dialog');

      expect(modal).toHaveAttribute('open');

      // Click on the paragraph content
      userEvent.click(content);

      // Wait a bit to ensure no state change occurred
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(modal).toHaveAttribute('open');
    });

    test('uses native dialog element', () => {
      const { getModal } = renderModal({ open: true });
      const modal = getModal();
      expect(modal.tagName.toLowerCase()).toBe('dialog');
      expect(modal).toHaveAttribute('open');
    });

    test('supports autofocus on child elements', () => {
      const { getByTestId } = render(
        <ModalView open={true}>
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <input data-testid="auto-focus-input" autoFocus />
          <button>Submit</button>
        </ModalView>,
      );

      const input = getByTestId('auto-focus-input');
      expect(input).toHaveFocus();
    });

    test('focuses first focusable element when no autoFocus is set', () => {
      const { getByRole } = render(
        <ModalView open={true}>
          <button>Submit</button>
          <input />
        </ModalView>,
      );

      const submitButton = getByRole('button', { name: 'Submit' });
      expect(submitButton).toHaveFocus();
    });

    test('deprecated backdropClassName still works', () => {
      const { getModal } = renderModal({
        open: true,
        backdropClassName: 'my-backdrop-class',
      });
      const modal = getModal();
      expect(modal).toHaveClass('my-backdrop-class');
    });

    test('popover renders inside same portal as modal', async () => {
      const { getByTestId } = render(
        <ModalView open={true}>
          {modalContent}
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
        </ModalView>,
      );

      const modal = getByTestId('lg-modal'); // Use the correct test id
      const select = getByTestId('modal-select-test-id');
      userEvent.click(select);

      await waitFor(() => {
        expect(modal).toHaveTextContent('Axolotl');
      });
    });
  });

  describe('when "open" prop is false', () => {
    test('renders to DOM but dialog is not open', () => {
      const { queryModal } = renderModal({ open: false });
      const modal = queryModal();
      expect(modal).not.toHaveAttribute('open');
      expect(modal).not.toBeVisible();
    });
  });

  describe('testid attribute', () => {
    it('propagates to the dom element', () => {
      const { getByTestId } = renderModal({
        open: true,
        'data-testid': 'my-modal',
      });

      const modal = getByTestId('my-modal');
      expect(modal).toBeInTheDocument();
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
