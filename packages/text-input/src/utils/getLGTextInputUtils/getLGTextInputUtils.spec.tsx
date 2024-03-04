import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextInput from '../../TextInput';
import { State } from '../../TextInput';

import { getLGTextInputUtils } from '.';

const error = 'This is the error message';
const defaultProps = {
  label: 'Test Input Label',
  description: 'This is the description',
  placeholder: 'This is some placeholder text',
};

function renderTextInput(props = {}) {
  const renderUtils = render(
    <TextInput
      data-lgid="lg-text_input"
      label={defaultProps.label}
      description={defaultProps.description}
      {...props}
    />,
  );

  const { elements, utils } = getLGTextInputUtils('lg-text_input');
  return { ...renderUtils, ...elements, ...utils };
}

describe('packages/text-input', () => {
  describe('getLGTextInputUtils', () => {
    describe('throws error if LG TextInput is not found', () => {
      test('', () => {
        render(<TextInput data-lgid="lg-text_output" label="hey" />);

        try {
          const {
            // eslint-disable-next-line
            elements: { getInput },
          } = getLGTextInputUtils('lg-text_input');
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            'message',
            expect.stringMatching(/Unable to find an element by: /),
          );
        }
      });
    });

    describe('getLabel', () => {
      test('returns label', () => {
        const { getLabel } = renderTextInput();

        expect(getLabel()).toBeInTheDocument();
        expect(getLabel()).toHaveTextContent(defaultProps.label);
      });

      test('returns null', () => {
        const { getLabel } = renderTextInput({ label: '' });

        expect(getLabel()).not.toBeInTheDocument();
      });
    });

    describe('getDescription', () => {
      test('returns description', () => {
        const { getDescription } = renderTextInput();

        expect(getDescription()).toBeInTheDocument();
        expect(getDescription()).toHaveTextContent(defaultProps.description);
      });

      test('returns null', () => {
        const { getDescription } = renderTextInput({ description: '' });

        expect(getDescription()).not.toBeInTheDocument();
      });
    });

    describe('getInput', () => {
      test('returns input', () => {
        const { getInput } = renderTextInput();

        expect(getInput()).toBeInTheDocument();
        expect(getInput()?.value).toBe('');
      });
    });

    describe('getErrorMessage', () => {
      test('returns error message', () => {
        const { getErrorMessage } = renderTextInput({
          state: State.Error,
          errorMessage: error,
        });

        expect(getErrorMessage()).toBeInTheDocument();
        expect(getErrorMessage()).toHaveTextContent(error);
      });

      test('returns null', () => {
        const { getErrorMessage } = renderTextInput();

        expect(getErrorMessage()).not.toBeInTheDocument();
      });
    });

    describe('isDisabled', () => {
      test('is true', () => {
        const { isDisabled } = renderTextInput({ disabled: true });

        expect(isDisabled()).toBe(true);
      });

      test('is false', () => {
        const { isDisabled } = renderTextInput();

        expect(isDisabled()).toBe(false);
      });
    });

    describe('isValid', () => {
      test('is true', () => {
        const { isValid } = renderTextInput({ state: State.Valid });

        expect(isValid()).toBe(true);
      });

      test('is false', () => {
        const { isValid } = renderTextInput();

        expect(isValid()).toBe(false);
      });
    });

    describe('isError', () => {
      test('is true', () => {
        const { isError } = renderTextInput({ state: State.Error });

        expect(isError()).toBe(true);
      });

      test('is false', () => {
        const { isError } = renderTextInput();

        expect(isError()).toBe(false);
      });
    });

    describe('inputValue', () => {
      test('returns value when uncontrolled', () => {
        const { getInput, inputValue } = renderTextInput();

        const input = getInput();
        userEvent.type(input as HTMLInputElement, '123');
        expect(inputValue()).toBe('123');
      });

      test('returns value when controlled', () => {
        const { inputValue } = renderTextInput({ value: '456' });

        expect(inputValue()).toBe('456');
      });
    });
  });
});

//TODO: TEST rerender
