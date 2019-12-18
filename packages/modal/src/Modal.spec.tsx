import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from './Modal';

afterAll(cleanup);

describe('packages/Modal', () => {
  const modalId = 'modal';
  const modalContent = 'Modal Content';

  describe('when rendered with content and set as open', () => {
    const { container, getByText, getByTestId } = render(
      <Modal open data-testid={modalId}>
        <h4>{modalContent}</h4>
      </Modal>,
    );

    test('it appears on page', () => {
      const modal = getByTestId(modalId);
      expect(modal).toBeInTheDocument();
      expect(modal).toBeVisible();
    });

    test(`it renders the modal content as expected`, () => {
      const content = getByText(modalContent);
      expect(content).toBeVisible();
    });

    test('when a user clicks the escape key', () => {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }),
      );
      expect(container.innerHTML).toBe('');
    });
  });

  describe('when rendered with open equal to false', () => {
    const { container } = render(
      <Modal open={false} data-testid={modalId}>
        <h4>{modalContent}</h4>
      </Modal>,
    );

    test('it is not rendered within the DOM', () => {
      expect(container.innerHTML).toBe('');
    });
  });

  describe('when shouldClose prop is supplied', () => {
    test('when shouldClose returns false', () => {
      const { getByTestId } = render(
        <Modal
          open={true}
          data-testid="falseshouldClose"
          shouldClose={() => false}
        >
          <h4>test content</h4>
        </Modal>,
      );

      const modal = getByTestId('falseshouldClose');
      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(modal).toBeVisible();
    });

    test('when shouldClose returns true', () => {
      const { container } = render(
        <Modal
          open={true}
          data-testid="trueshouldClose"
          shouldClose={() => true}
        >
          <h4>test content</h4>
        </Modal>,
      );

      window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(container.innerHTML).toBe('');
    });
  });
});
