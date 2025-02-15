import React from 'react';
import { renderAsyncTest } from '@lg-tools/test-harnesses';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '..';

import { getTestUtils } from './getTestUtils';

const renderButtonAsync = () =>
  renderAsyncTest(<Button>Click me</Button>, render);

function renderButton(props = {}) {
  render(<Button {...props}>Click me</Button>);
}

function renderMultipleButtons() {
  render(
    <>
      <Button data-lgid="lg-Button-1">Click me</Button>
      <Button data-lgid="lg-Button-2" disabled>
        Click me{' '}
      </Button>
    </>,
  );
}

describe('packages/button/getTestUtils', () => {
  describe('renders properly', () => {
    test('throws error if LG Button is not found', () => {
      render(<Button>Click me</Button>);

      try {
        const _utils = getTestUtils();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty(
          'message',
          expect.stringMatching(
            /Unable to find an element by: \[data-lgid="lg-button"\]/,
          ),
        );
      }
    });
  });

  describe('single button', () => {
    test('findButton', async () => {
      const { openButton } = renderButtonAsync();

      userEvent.click(openButton);

      const { findButton } = getTestUtils();
      const button = await findButton();

      expect(button).toBeInTheDocument();
    });

    test('getButton', () => {
      renderButton();
      const { getButton } = getTestUtils();

      expect(getButton()).toBeInTheDocument();
    });

    test('queryButton', () => {
      render(<div />);
      const { queryButton } = getTestUtils();

      expect(queryButton()).toBeNull();
    });

    describe('isDisabled', () => {
      test('to be false', () => {
        renderButton();
        const { isDisabled } = getTestUtils();

        expect(isDisabled()).toBe(false);
      });

      test('to be true', () => {
        renderButton({ disabled: true });
        const { isDisabled } = getTestUtils();

        expect(isDisabled()).toBe(true);
      });
    });
  });

  describe('multiple button instances', () => {
    test('getButton', () => {
      renderMultipleButtons();
      const utilsOne = getTestUtils('lg-Button-1');
      const utilsTwo = getTestUtils('lg-Button-2');

      expect(utilsOne.getButton()).toBeInTheDocument();
      expect(utilsTwo.getButton()).toBeInTheDocument();
    });
  });
});
