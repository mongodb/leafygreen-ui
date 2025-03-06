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
      const { getByTestId } = renderModal({
        id: 'id-test',
        open: true,
      });
      const container = getByTestId('modal-test-id');
      expect(container.getAttribute('id')).toBe('id-test');
    });

    test('closes modal when button is clicked', async () => {
      const { getByRole, getModal } = renderModal({ open: true });
      const modal = getModal();
      const button = getByRole('button');

      userEvent.click(button);

      await waitForElementToBeRemoved(modal);
      expect(modal).not.toBeInTheDocument();
    });

    test('closes modal when escape key is pressed', async () => {
      const { getModal } = renderModal({ open: true });

      const modal = getModal();

      userEvent.type(modal, '{esc}');

      await waitForElementToBeRemoved(modal);
      expect(modal).not.toBeInTheDocument();
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

      await waitForElementToBeRemoved(modal);
      expect(modal).not.toBeInTheDocument();
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

    test('popover renders inside same portal as modal', async () => {
      const { getByTestId } = render(
        <ModalView data-testid="modal-test-id" open={true}>
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

      const modal = getByTestId('modal-test-id');
      const select = getByTestId('modal-select-test-id');
      userEvent.click(select);

      await waitFor(() => {
        expect(modal).toHaveTextContent('Axolotl');
      });
    });
  });

  describe('when "open" prop is false', () => {
    test('does not render to the DOM', () => {
      const { queryModal } = renderModal({ open: false });
      const modal = queryModal();
      expect(modal).not.toBeInTheDocument();
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
