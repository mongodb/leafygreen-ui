import React from 'react';
import { renderAsyncTest } from '@lg-tools/test-harnesses';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextInput from '../../TextInput';

import { getLGTextInputTestUtils } from './getLGTextInputTestUtils';

const renderTextInputAsync = () =>
  renderAsyncTest(<TextInput label="text input label" />, render);

function renderMultipleInputs() {
  render(
    <>
      <TextInput
        data-lgid="lg-text_input-1"
        label="label 1"
        value="text input 1"
        description="description 1"
      />
      <TextInput
        data-lgid="lg-text_input-2"
        label="label 2"
        value="text input 2"
        description="description 2"
      />
    </>,
  );

  const { elements: elementsOne, utils: utilsOne } =
    getLGTextInputTestUtils('lg-text_input-1');
  const { elements: elementsTwo, utils: utilsTwo } =
    getLGTextInputTestUtils('lg-text_input-2');

  return {
    elementsOne,
    elementsTwo,
    utilsOne,
    utilsTwo,
  };
}

describe('packages/text-input', () => {
  describe('getLGTextInputTestUtils', () => {
    test('throws error if LG TextInput is not found', () => {
      render(<TextInput data-lgid="lg-text_output" label="hey" />);

      try {
        // eslint-disable-next-line
        const { elements } = getLGTextInputTestUtils();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty(
          'message',
          expect.stringMatching(
            /Unable to find an element by: \[data-lgid="lg-text_input"\]/,
          ),
        );
      }
    });

    describe('multiple inputs', () => {
      test('getInput', () => {
        const { elementsOne, elementsTwo } = renderMultipleInputs();

        expect(elementsOne.getInput()).toBeInTheDocument();
        expect(elementsTwo.getInput()).toBeInTheDocument();
      });

      test('getInputValue', () => {
        const { utilsOne, utilsTwo } = renderMultipleInputs();

        expect(utilsOne.getInputValue()).toBe('text input 1');
        expect(utilsTwo.getInputValue()).toBe('text input 2');
      });

      test('getLabel', () => {
        const { elementsOne, elementsTwo } = renderMultipleInputs();

        expect(elementsOne.getLabel()).toHaveTextContent('label 1');
        expect(elementsTwo.getLabel()).toHaveTextContent('label 2');
      });

      test('getDescription', () => {
        const { elementsOne, elementsTwo } = renderMultipleInputs();

        expect(elementsOne.getDescription()).toHaveTextContent('description 1');
        expect(elementsTwo.getDescription()).toHaveTextContent('description 2');
      });
    });

    describe('Async', () => {
      test('find LG TextInput after awaiting async component', async () => {
        const { openButton, findByTestId, asyncTestComponentId } =
          renderTextInputAsync();

        userEvent.click(openButton);

        const asyncComponent = await findByTestId(asyncTestComponentId);
        expect(asyncComponent).toBeInTheDocument();

        // After awaiting asyncComponent, look for text input
        const {
          elements: { getInput },
        } = getLGTextInputTestUtils();
        expect(getInput()).toBeInTheDocument();
      });

      test('find LG TextInput awaiting getLGTextInputTestUtils', async () => {
        const { openButton } = renderTextInputAsync();

        userEvent.click(openButton);

        // awaiting getLGTextInputTestUtils
        await waitFor(() => {
          const {
            elements: { getInput },
          } = getLGTextInputTestUtils();
          expect(getInput()).toBeInTheDocument();
        });
      });

      test('Updates the value inside an async component', async () => {
        const { openButton, findByTestId, asyncTestComponentId } =
          renderTextInputAsync();

        userEvent.click(openButton);
        const asyncComponent = await findByTestId(asyncTestComponentId);
        expect(asyncComponent).toBeInTheDocument();

        // After awaiting asyncComponent, look for text input
        const {
          elements: { getInput },
          utils: { getInputValue },
        } = getLGTextInputTestUtils();
        const input = getInput();
        userEvent.type(input, 'leafygreen');
        expect(getInputValue()).toBe('leafygreen');
      });
    });
  });
});
