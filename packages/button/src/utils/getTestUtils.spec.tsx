import React from 'react';
import { renderAsyncTest } from '@lg-tools/test-harnesses';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '..';

import { getTestUtils } from './getTestUtils';

const renderButtonAsync = () =>
  renderAsyncTest(<Button>Click me</Button>, render);

function renderButton(props = {}) {
  render(<Button {...props}>Click me</Button>);
}

function renderMultipleToggles() {
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
    test('getButton', () => {
      renderButton();
      const { getButton } = getTestUtils();

      expect(getButton()).toBeInTheDocument();
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

  describe('multiple toggles', () => {
    test('getButton', () => {
      renderMultipleToggles();
      const utilsOne = getTestUtils('lg-Button-1');
      const utilsTwo = getTestUtils('lg-Button-2');

      expect(utilsOne.getButton()).toBeInTheDocument();
      expect(utilsTwo.getButton()).toBeInTheDocument();
    });
  });

  describe('async component', () => {
    test('find LG Button after awaiting an async component', async () => {
      const { openButton, findByTestId, asyncTestComponentId } =
        renderButtonAsync();

      userEvent.click(openButton);

      const asyncComponent = await findByTestId(asyncTestComponentId);
      expect(asyncComponent).toBeInTheDocument();

      // After awaiting asyncComponent, look for button
      const { getButton } = getTestUtils();
      expect(getButton()).toBeInTheDocument();
    });

    test('find LG Button after awaiting getTestUtils', async () => {
      const { openButton } = renderButtonAsync();

      userEvent.click(openButton);

      // awaiting getTestUtils
      await waitFor(() => {
        const { getButton } = getTestUtils();
        expect(getButton()).toBeInTheDocument();
      });
    });
  });
});
