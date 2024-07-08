import React from 'react';
import { renderAsyncTest } from '@lg-tools/test-harnesses';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextInput, { State } from '../../TextInput';

import { getTestUtils } from './getTestUtils';

const error = 'This is the error message';
const defaultProps = {
  label: 'Test Input Label',
  description: 'This is the description',
  placeholder: 'This is some placeholder text',
};

const renderTextInputAsync = () =>
  renderAsyncTest(<TextInput label="text input label" />, render);

function renderTextInput(props = {}) {
  const renderUtils = render(
    <TextInput
      label={defaultProps.label}
      description={defaultProps.description}
      {...props}
    />,
  );

  return { ...renderUtils };
}

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
}

describe('packages/text-input', () => {
  describe('getTestUtils', () => {
    test('throws error if LG TextInput is not found', () => {
      render(<TextInput data-lgid="lg-text_output" label="hey" />);

      try {
        const _utils = getTestUtils();
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

    describe('single input', () => {
      describe('getInput', () => {
        test('is in the document', () => {
          renderTextInput();
          const { getInput } = getTestUtils();
          expect(getInput()).toBeInTheDocument();
        });
      });

      describe('getLabel', () => {
        test('is in the document', () => {
          renderTextInput();
          const { getLabel } = getTestUtils();
          expect(getLabel()).toBeInTheDocument();
        });

        test('is not in the document', () => {
          renderTextInput({ label: '' });
          const { getLabel } = getTestUtils();
          expect(getLabel()).not.toBeInTheDocument();
        });
      });

      describe('getDescription', () => {
        test('is in the document', () => {
          renderTextInput();
          const { getDescription } = getTestUtils();
          expect(getDescription()).toBeInTheDocument();
        });

        test('is not in the document', () => {
          renderTextInput({ description: '' });
          const { getDescription } = getTestUtils();
          expect(getDescription()).not.toBeInTheDocument();
        });
      });

      describe('getErrorMessage', () => {
        test('is in the document', () => {
          renderTextInput({ state: State.Error, errorMessage: error });
          const { getErrorMessage } = getTestUtils();
          expect(getErrorMessage()).toBeInTheDocument();
          expect(getErrorMessage()).toHaveTextContent(error);
        });

        test('is not in the document', () => {
          renderTextInput({ errorMessage: 'hey' });
          const { getErrorMessage } = getTestUtils();
          expect(getErrorMessage()).not.toBeInTheDocument();
        });
      });

      describe('getInputValue', () => {
        test('returns value when uncontrolled', () => {
          renderTextInput();
          const { getInput, getInputValue } = getTestUtils();
          userEvent.type(getInput(), '123');
          expect(getInputValue()).toBe('123');
        });

        test('returns value when controlled', () => {
          renderTextInput({ value: '456' });
          const { getInputValue } = getTestUtils();
          expect(getInputValue()).toBe('456');
        });
      });

      describe('isDisabled', () => {
        test('is true', () => {
          renderTextInput({ disabled: true });
          const { isDisabled } = getTestUtils();
          expect(isDisabled()).toBe(true);
        });

        test('is false', () => {
          renderTextInput();
          const { isDisabled } = getTestUtils();
          expect(isDisabled()).toBe(false);
        });
      });

      describe('isValid', () => {
        test('is true', () => {
          renderTextInput({ state: State.Valid });
          const { isValid } = getTestUtils();
          expect(isValid()).toBe(true);
        });

        test('is false', () => {
          renderTextInput();
          const { isValid } = getTestUtils();
          expect(isValid()).toBe(false);
        });
      });

      describe('isError', () => {
        test('is true', () => {
          renderTextInput({ state: State.Error });
          const { isError } = getTestUtils();
          expect(isError()).toBe(true);
        });

        test('is false', () => {
          renderTextInput();
          const { isError } = getTestUtils();
          expect(isError()).toBe(false);
        });
      });

      describe('isOptional', () => {
        test('is true', () => {
          renderTextInput({ optional: true });
          const { isOptional } = getTestUtils();
          expect(isOptional()).toBe(true);
        });

        test('is false', () => {
          renderTextInput();
          const { isOptional } = getTestUtils();
          expect(isOptional()).toBe(false);
        });
      });
    });

    describe('multiple inputs', () => {
      test('getInput', () => {
        renderMultipleInputs();
        const utilsOne = getTestUtils('lg-text_input-1');
        const utilsTwo = getTestUtils('lg-text_input-2');

        expect(utilsOne.getInput()).toBeInTheDocument();
        expect(utilsTwo.getInput()).toBeInTheDocument();
      });

      test('getInputValue', () => {
        renderMultipleInputs();
        const utilsOne = getTestUtils('lg-text_input-1');
        const utilsTwo = getTestUtils('lg-text_input-2');

        expect(utilsOne.getInputValue()).toBe('text input 1');
        expect(utilsTwo.getInputValue()).toBe('text input 2');
      });

      test('getLabel', () => {
        renderMultipleInputs();
        const utilsOne = getTestUtils('lg-text_input-1');
        const utilsTwo = getTestUtils('lg-text_input-2');

        expect(utilsOne.getLabel()).toHaveTextContent('label 1');
        expect(utilsTwo.getLabel()).toHaveTextContent('label 2');
      });

      test('getDescription', () => {
        renderMultipleInputs();
        const utilsOne = getTestUtils('lg-text_input-1');
        const utilsTwo = getTestUtils('lg-text_input-2');

        expect(utilsOne.getDescription()).toHaveTextContent('description 1');
        expect(utilsTwo.getDescription()).toHaveTextContent('description 2');
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
        const { getInput } = getTestUtils();
        expect(getInput()).toBeInTheDocument();
      });

      test('find LG TextInput awaiting getTestUtils', async () => {
        const { openButton } = renderTextInputAsync();

        userEvent.click(openButton);

        // awaiting getTestUtils
        await waitFor(() => {
          const { getInput } = getTestUtils();
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
        const { getInput, getInputValue } = getTestUtils();
        const input = getInput();
        userEvent.type(input, 'leafygreen');
        expect(getInputValue()).toBe('leafygreen');
      });
    });
  });
});
