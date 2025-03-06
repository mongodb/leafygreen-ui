import React from 'react';
import { renderAsyncTest } from '@lg-tools/test-harnesses';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal from '..';

import { getTestUtils } from './getTestUtils';

const renderModalAsync = () =>
  renderAsyncTest(<Modal open>Click me</Modal>, render);

function renderModal(props = {}) {
  render(
    <Modal {...props} open>
      Click me
    </Modal>,
  );
}

function renderMultipleModals() {
  render(
    <>
      <Modal data-lgid="lg-modal-1" open>
        Test Content 1
      </Modal>
      <Modal data-lgid="lg-modal-2" open>
        Test Content 2
      </Modal>
    </>,
  );
}

describe('packages/modal/getTestUtils', () => {
  describe('renders properly', () => {
    test('throws error if LG Modal is not found', () => {
      render(<Modal>Click me</Modal>);

      try {
        const _utils = getTestUtils();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty(
          'message',
          expect.stringMatching(
            /Unable to find an element by: \[data-lgid="lg-modal"\]/,
          ),
        );
      }
    });
  });

  describe('single modal', () => {
    test('findModal', async () => {
      const { openButton } = renderModalAsync();

      userEvent.click(openButton);

      const { findModal } = getTestUtils();
      const modal = await findModal();

      expect(modal).toBeInTheDocument();
    });

    test('getModal', () => {
      renderModal();
      const { getModal } = getTestUtils();

      expect(getModal()).toBeInTheDocument();
    });

    test('queryModal', () => {
      render(<div />);
      const { queryModal } = getTestUtils();

      expect(queryModal()).toBeNull();
    });
  });

  describe('multiple modal instances', () => {
    test('getModal', () => {
      renderMultipleModals();
      const utilsOne = getTestUtils('lg-Modal-1');
      const utilsTwo = getTestUtils('lg-Modal-2');

      expect(utilsOne.getModal()).toBeInTheDocument();
      expect(utilsTwo.getModal()).toBeInTheDocument();
    });
  });
});
