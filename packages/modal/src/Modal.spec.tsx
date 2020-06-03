import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from './Modal';

const modalContent = 'Modal Content';

function renderModal(props = {}) {
  const utils = render(
    <Modal data-testid="modal-test-id" {...props}>
      {modalContent}
    </Modal>,
  );
  return utils;
}

describe('packages/modal', () => {
  describe('when the "open" prop is true', () => {
    test('renders modal to the DOM', () => {
      const { getByTestId } = renderModal({ open: true });
      const modal = getByTestId('modal-test-id');

      expect(modal).toBeInTheDocument();
      expect(modal).toBeVisible();
    });

    test(`renders the content as expected`, () => {
      const { getByText } = renderModal({ open: true });
      const content = getByText(modalContent);
      expect(content).toBeVisible();
    });

    test('closes modal when escape key is pressed', () => {
      const { container } = renderModal({ open: true });
      window.dispatchEvent(
        new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }),
      );
      expect(container.innerHTML).toBe('');
    });

    test('when "shouldClose" prop returns false', () => {
      const { getByTestId } = renderModal({
        open: true,
        shouldClose: () => false,
      });
      const modal = getByTestId('modal-test-id');
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(modal).toBeVisible();
    });

    test('when "shouldClose" returns true', () => {
      const { container } = renderModal({
        open: true,
        shouldClose: () => true,
      });

      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(container.innerHTML).toBe('');
    });

    test('when "closeOnBackdropClick" is false', () => {
      renderModal({ closeOnBackdropClick: false, open: true });
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(screen.getByText(modalContent)).toBeInTheDocument();
    });
  });

  describe('when "open" prop is false', () => {
    test('does not render to the DOM', () => {
      const { container } = renderModal({ open: false });
      expect(container.innerHTML).toBe('');
    });
  });
});
