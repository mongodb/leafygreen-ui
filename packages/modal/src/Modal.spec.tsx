import React from 'react';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Modal from './Modal';

afterAll(cleanup);

describe('packages/Modal', () => {
  const modalId = 'modal';
  const modalContent = 'Modal Content';

  describe('when rendered with content', () => {
    const { getByText, getByTestId } = render(
      <Modal active data-testid={modalId}>
        <h4>{modalContent}</h4>
      </Modal>,
    );

    test('it appears on page when active prop is set', () => {
      const modal = getByTestId(modalId);
      expect(modal).toBeVisible();
    });

    test('it is rendered to the DOM when the active prop is set', () => {
      const modal = getByTestId(modalId);
      expect(modal).toBeInTheDocument();
    });

    test(`it renders the ${modalContent} as expected`, () => {
      const content = getByText(modalContent);
      expect(content).toBeVisible();
    });
  });

  describe('when rendered with active equal to false', () => {
    const { container } = render(
      <Modal active={false} data-testid={modalId}>
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
          active={true}
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
          active={true}
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
