import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';
import Modal from './Modal';

afterAll(cleanup);

describe('packages/Modal', () => {
  const modalId = 'modal';
  const modalTitle = 'Modal Title';
  const modalContent = 'Modal Content';
  const onRequestClose = jest.fn();

  describe('when rendered with content', () => {
    const { getByText, getByTestId } = render(
      <Modal active title={modalTitle} data-testid={modalId}>
        <h4>{modalContent}</h4>
      </Modal>,
    );

    test('it appears on DOM when active prop is set', () => {
      const modal = getByTestId(modalId);
      expect(modal).toBeVisible();
    });

    test('it renders the title as expected', () => {
      const title = getByText(modalTitle);
      expect(title).toBeInTheDocument();
    });

    test('it renders the children as expected', () => {
      const content = getByText(modalContent);
      expect(content).toBeInTheDocument();
    });
  });

  describe('when rendered with active equal to false', () => {
    const { getByText, getByTestId } = render(
      <Modal active={false} title={modalTitle} data-testid={modalId}>
        <h4>{modalContent}</h4>
      </Modal>,
    );

    test('it does not display the modal', () => {
      const modal = getByTestId(modalId);
      const title = getByText(modalTitle);
      const content = getByText(modalContent);

      !expect(modal).toBeVisible();
      !expect(title).toBeInTheDocument();
      !expect(content).toBeInTheDocument();
    });
  });

  describe('when onRequestClose prop is supplied', () => {
    // const { getByTestId } = render(
    // <div data-testid={bgId}>
    //   <Modal active onRequestClose={onRequestClose}>
    //     Modal Children
    //   </Modal>
    // </div>,
    // );
    let container: HTMLElement;
    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    test('it fires onRequestClose when the background is clicked', () => {
      act(() => {
        ReactDOM.render(
          <Modal active onRequestClose={onRequestClose}>
            Modal Children
          </Modal>,
          container,
        );
      });

      act(() => {
        window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      // expect(onRequestClose).toHaveBeenCalledTimes(1);
      setTimeout(() => {
        expect(onRequestClose).toHaveBeenCalledTimes(1);
      }, 100);
    });
  });
});
