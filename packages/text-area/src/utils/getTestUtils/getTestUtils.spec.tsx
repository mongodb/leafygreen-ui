import React from 'react';
import { renderAsyncTest } from '@lg-tools/test-harnesses';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { State, TextArea } from '../../TextArea';

import { getTestUtils } from './getTestUtils';

const error = 'This is the error message';
const defaultProps = {
  label: 'Test Input Label',
  description: 'This is the description',
  placeholder: 'This is some placeholder text',
};

const renderTextAreaAsync = () =>
  renderAsyncTest(<TextArea label="textarea label" />, render);

function renderTextArea(props = {}) {
  const renderUtils = render(
    <TextArea
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
      <TextArea
        data-lgid="lg-text_area-1"
        label="label 1"
        value="text input 1"
      />
      <TextArea
        data-lgid="lg-text_area-2"
        label="label 2"
        value="text input 2"
      />
    </>,
  );
}

describe('packages/text-input', () => {
  describe('getTestUtils', () => {
    test('throws error if LG TextArea is not found', () => {
      render(<TextArea data-lgid="lg-text_output" label="hey" />);

      try {
        const _utils = getTestUtils();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty(
          'message',
          expect.stringMatching(
            /Unable to find an element by: \[data-lgid="lg-text_area"\]/,
          ),
        );
      }
    });

    describe('single input', () => {
      describe('getInput', () => {
        test('is in the document', () => {
          renderTextArea();
          const { getInput } = getTestUtils();
          expect(getInput()).toBeInTheDocument();
        });
      });

      describe('getLabel', () => {
        test('is in the document', () => {
          renderTextArea();
          const { getLabel } = getTestUtils();
          expect(getLabel()).toBeInTheDocument();
        });

        test('is not in the document', () => {
          renderTextArea({ label: '' });
          const { getLabel } = getTestUtils();
          expect(getLabel()).not.toBeInTheDocument();
        });
      });

      describe('getDescription', () => {
        test('is in the document', () => {
          renderTextArea();
          const { getDescription } = getTestUtils();
          expect(getDescription()).toBeInTheDocument();
        });

        test('is not in the document', () => {
          renderTextArea({ description: '' });
          const { getDescription } = getTestUtils();
          expect(getDescription()).not.toBeInTheDocument();
        });
      });

      describe('getErrorMessage', () => {
        test('is in the document', () => {
          renderTextArea({ state: State.Error, errorMessage: error });
          const { getErrorMessage } = getTestUtils();
          expect(getErrorMessage()).toBeInTheDocument();
          expect(getErrorMessage()).toHaveTextContent(error);
        });

        test('is not in the document', () => {
          renderTextArea({ errorMessage: 'hey' });
          const { getErrorMessage } = getTestUtils();
          expect(getErrorMessage()).not.toBeInTheDocument();
        });
      });

      describe('getInputValue', () => {
        test('returns value when uncontrolled', () => {
          renderTextArea();
          const { getInput, getInputValue } = getTestUtils();
          userEvent.type(getInput(), '123');
          expect(getInputValue()).toBe('123');
        });

        test('returns value when controlled', () => {
          renderTextArea({ value: '456' });
          const { getInputValue } = getTestUtils();
          expect(getInputValue()).toBe('456');
        });
      });

      describe('isDisabled', () => {
        test('is true', () => {
          renderTextArea({ disabled: true });
          const { isDisabled } = getTestUtils();
          expect(isDisabled()).toBe(true);
        });

        test('is false', () => {
          renderTextArea();
          const { isDisabled } = getTestUtils();
          expect(isDisabled()).toBe(false);
        });
      });

      describe('isError', () => {
        test('is true', () => {
          renderTextArea({ state: State.Error });
          const { isError } = getTestUtils();
          expect(isError()).toBe(true);
        });

        test('is false', () => {
          renderTextArea();
          const { isError } = getTestUtils();
          expect(isError()).toBe(false);
        });
      });
    });

    describe('multiple inputs', () => {
      test('getInput', () => {
        renderMultipleInputs();

        const utilsOne = getTestUtils('lg-text_area-1');
        const utilsTwo = getTestUtils('lg-text_area-2');

        expect(utilsOne.getInput()).toBeInTheDocument();
        expect(utilsTwo.getInput()).toBeInTheDocument();
      });

      test('getInputValue', () => {
        renderMultipleInputs();
        const utilsOne = getTestUtils('lg-text_area-1');
        const utilsTwo = getTestUtils('lg-text_area-2');

        expect(utilsOne.getInputValue()).toBe('text input 1');
        expect(utilsTwo.getInputValue()).toBe('text input 2');
      });
    });

    describe('Async component', () => {
      test('find LG TextArea after awaiting an async component', async () => {
        const { openButton, findByTestId, asyncTestComponentId } =
          renderTextAreaAsync();

        userEvent.click(openButton);

        const asyncComponent = await findByTestId(asyncTestComponentId);
        expect(asyncComponent).toBeInTheDocument();

        // After awaiting asyncComponent, look for text area
        const { getInput } = getTestUtils();
        expect(getInput()).toBeInTheDocument();
      });

      test('find LG TextArea awaiting getTestUtils', async () => {
        const { openButton } = renderTextAreaAsync();

        userEvent.click(openButton);

        // awaiting getTestUtils
        await waitFor(() => {
          const { getInput } = getTestUtils();
          expect(getInput()).toBeInTheDocument();
        });
      });

      test('Updates the value inside an async component', async () => {
        const { openButton, findByTestId, asyncTestComponentId } =
          renderTextAreaAsync();

        userEvent.click(openButton);
        const asyncComponent = await findByTestId(asyncTestComponentId);
        expect(asyncComponent).toBeInTheDocument();

        // After awaiting asyncComponent, look for text area
        const { getInput, getInputValue } = getTestUtils();
        const input = getInput();
        userEvent.type(input, 'whats blue and not heavy? light blue');
        expect(getInputValue()).toBe('whats blue and not heavy? light blue');
      });
    });
  });
});
