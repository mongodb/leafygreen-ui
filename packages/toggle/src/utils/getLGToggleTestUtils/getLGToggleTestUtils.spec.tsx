import React from 'react';
import { renderAsyncTest } from '@lg-tools/test-harnesses';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Toggle from '../../Toggle/Toggle';

import { getLGToggleTestUtils } from './getLGToggleTestUtils';

const renderToggleAsync = () =>
  renderAsyncTest(<Toggle aria-label="Toggle who?" />, render);

function renderToggle(props = {}) {
  render(<Toggle aria-label="Toggle who?" {...props} />);
}

function renderMultipleToggles() {
  render(
    <>
      <Toggle aria-label="Toggle who?" data-lgid="lg-toggle-1" />
      <Toggle aria-label="Toggle who?" data-lgid="lg-toggle-2" checked={true} />
    </>,
  );
}

describe('packages/toggle', () => {
  describe('getLGToggleTestUtils', () => {
    test('throws error if LG Toggle is not found', () => {
      render(<Toggle aria-label="Toggle who?" />);

      try {
        const _utils = getLGToggleTestUtils();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty(
          'message',
          expect.stringMatching(
            /Unable to find an element by: \[data-lgid="lg-toggle"\]/,
          ),
        );
      }
    });

    describe('single toggles', () => {
      test('getInput', () => {
        renderToggle();
        const { getInput } = getLGToggleTestUtils();

        expect(getInput()).toBeInTheDocument();
      });

      describe('getInputValue', () => {
        test('to be false', () => {
          renderToggle();
          const { getInputValue } = getLGToggleTestUtils();

          expect(getInputValue()).toBe('false');
        });

        test('to be true', () => {
          renderToggle({ checked: true });
          const { getInputValue } = getLGToggleTestUtils();

          expect(getInputValue()).toBe('true');
        });
      });

      describe('isDisabled', () => {
        test('to be false', () => {
          renderToggle();
          const { isDisabled } = getLGToggleTestUtils();

          expect(isDisabled()).toBe(false);
        });

        test('to be true', () => {
          renderToggle({ disabled: true });
          const { isDisabled } = getLGToggleTestUtils();

          expect(isDisabled()).toBe(true);
        });
      });
    });

    describe('multiple toggles', () => {
      test('getInput', () => {
        renderMultipleToggles();
        const utilsOne = getLGToggleTestUtils('lg-toggle-1');
        const utilsTwo = getLGToggleTestUtils('lg-toggle-2');

        expect(utilsOne.getInput()).toBeInTheDocument();
        expect(utilsTwo.getInput()).toBeInTheDocument();
      });

      test('getInputValue', () => {
        renderMultipleToggles();
        const utilsOne = getLGToggleTestUtils('lg-toggle-1');
        const utilsTwo = getLGToggleTestUtils('lg-toggle-2');

        expect(utilsOne.getInputValue()).toBe('false');
        expect(utilsTwo.getInputValue()).toBe('true');
      });
    });

    describe('Async component', () => {
      test('find LG Toggle after awaiting an async component', async () => {
        const { openButton, findByTestId, asyncTestComponentId } =
          renderToggleAsync();

        userEvent.click(openButton);

        const asyncComponent = await findByTestId(asyncTestComponentId);
        expect(asyncComponent).toBeInTheDocument();

        // After awaiting asyncComponent, look for text input
        const { getInput } = getLGToggleTestUtils();
        expect(getInput()).toBeInTheDocument();
      });

      test('find LG Toggle after awaiting getLGToggleTestUtils', async () => {
        const { openButton } = renderToggleAsync();

        userEvent.click(openButton);

        // awaiting getLGToggleTestUtils
        await waitFor(() => {
          const { getInput } = getLGToggleTestUtils();
          expect(getInput()).toBeInTheDocument();
        });
      });

      test('Updates the value inside an async component', async () => {
        const { openButton, findByTestId, asyncTestComponentId } =
          renderToggleAsync();

        userEvent.click(openButton);
        const asyncComponent = await findByTestId(asyncTestComponentId);
        expect(asyncComponent).toBeInTheDocument();

        // After awaiting asyncComponent, look for toggle
        const { getInput, getInputValue } = getLGToggleTestUtils();
        const input = getInput();
        userEvent.click(input);
        expect(getInputValue()).toBe('true');
      });
    });
  });
});
