import React from 'react';
import { renderAsyncTest } from '@lg-tools/test-harnesses';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Toggle from '../../Toggle/Toggle';

import { getLGToggleUtils } from './getLGToggleUtils';

const renderToggleAsync = () =>
  renderAsyncTest(<Toggle aria-label="Toggle who?" />, render);

function renderMultipleToggles() {
  render(
    <>
      <Toggle aria-label="Toggle who?" data-lgid="lg-toggle-1" />
      <Toggle aria-label="Toggle who?" data-lgid="lg-toggle-2" checked={true} />
    </>,
  );

  const { elements: elementsOne, utils: utilsOne } =
    getLGToggleUtils('lg-toggle-1');
  const { elements: elementsTwo, utils: utilsTwo } =
    getLGToggleUtils('lg-toggle-2');

  return {
    elementsOne,
    elementsTwo,
    utilsOne,
    utilsTwo,
  };
}

describe('packages/toggle', () => {
  describe('getLGToggleUtils', () => {
    describe('throws error if LG Toggle is not found', () => {
      test('', () => {
        render(<Toggle aria-label="Toggle who?" />);

        try {
          // eslint-disable-next-line
          const { elements } = getLGToggleUtils();
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
    });

    describe('multiple toggles', () => {
      test('getInput', () => {
        const { elementsOne, elementsTwo } = renderMultipleToggles();

        expect(elementsOne.getInput()).toBeInTheDocument();
        expect(elementsTwo.getInput()).toBeInTheDocument();
      });

      test('getInputValue', () => {
        const { utilsOne, utilsTwo } = renderMultipleToggles();

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
        const {
          elements: { getInput },
        } = getLGToggleUtils();
        expect(getInput()).toBeInTheDocument();
      });

      test('find LG Toggle after awaiting getLGToggleUtils', async () => {
        const { openButton } = renderToggleAsync();

        userEvent.click(openButton);

        // awaiting getLGToggleUtils
        await waitFor(() => {
          const {
            elements: { getInput },
          } = getLGToggleUtils();
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
        const {
          elements: { getInput },
          utils: { getInputValue },
        } = getLGToggleUtils();
        const input = getInput();
        userEvent.click(input);
        expect(getInputValue()).toBe('true');
      });
    });
  });
});
