import React from 'react';
import { fireEvent, getByLabelText, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { consoleOnce } from '@leafygreen-ui/lib';

import { getLGTextInputUtils } from '../utils';

import TextInput from './TextInput';
import { State, TextInputProps } from './TextInput.types';

const error = 'This is the error message';
const validEmail = 'test.email@mongodb.com';
const invalidEmail = 'invalid.email';
const defaultProps = {
  className: 'test-text-input-class',
  label: 'Test Input Label',
  description: 'This is the description',
  placeholder: 'This is some placeholder text',
  onChange: jest.fn(),
  onBlur: jest.fn(),
};

function renderTextInput(props = {}) {
  const renderUtils = render(
    <TextInput label={defaultProps.label} {...props} />,
  );

  const {
    elements: { getDescription, getErrorMessage, getInput, getLabel },
    utils: { isDisabled, isError, isValid, inputValue, isOptional },
  } = getLGTextInputUtils();

  const textInput = getInput();
  const label = getLabel();
  const description = getDescription();

  const rerenderTextInput = (newProps?: Partial<TextInputProps>) => {
    const allProps = { ...props, ...newProps };
    renderUtils.rerender(
      <TextInput label={defaultProps.label} {...allProps} />,
    );
  };

  return {
    ...renderUtils,
    textInput,
    label,
    description,
    getErrorMessage,
    isDisabled,
    isError,
    isValid,
    isOptional,
    inputValue,
    rerenderTextInput,
  };
}

describe('packages/text-input', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderTextInput();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
  test(`renders ${defaultProps.label} as the input label and ${defaultProps.description} as the description`, () => {
    const { label, description } = renderTextInput(defaultProps);
    expect(label?.innerHTML).toContain(defaultProps.label);
    expect(description?.innerHTML).toContain(defaultProps.description);
  });

  test(`renders ${defaultProps.placeholder} as placeholder text`, () => {
    const { getByPlaceholderText } = renderTextInput(defaultProps);
    expect(getByPlaceholderText(defaultProps.placeholder)).toBeVisible();
  });

  test(`renders ${defaultProps.className} in the classList`, () => {
    const { container } = renderTextInput(defaultProps);
    expect(
      (container?.firstChild as HTMLElement)?.classList.contains(
        defaultProps.className,
      ),
    ).toBe(true);
  });

  describe('optional', () => {
    test('renders when the prop is set to true', () => {
      const { isOptional } = renderTextInput({
        optional: true,
        ...defaultProps,
      });
      expect(isOptional()).toBe(true);
    });

    test('does not renders by default', () => {
      const { isOptional } = renderTextInput({ ...defaultProps });
      expect(isOptional()).toBe(false);
    });
  });

  test('renders type as "text" by default', () => {
    const { textInput } = renderTextInput();
    expect(textInput.getAttribute('type')).toBe('text');
  });

  test('renders type as "password" when the prop is set', () => {
    const spy = jest.spyOn(consoleOnce, 'warn').mockImplementation(() => {});
    const { textInput } = renderTextInput({ type: 'password' });
    expect(textInput.getAttribute('type')).toBe('password');
    spy.mockClear();
  });

  test('does not render "optional" text when the prop is set to false', () => {
    const { container } = renderTextInput({ optional: false, ...defaultProps });
    expect(container.innerHTML).not.toContain('Optional');
  });

  describe('when the "state" is "valid"', () => {
    test('displays checkmark icon when input is valid', () => {
      const { container, inputValue, isValid } = renderTextInput({
        value: validEmail,
        state: State.Valid,
        optional: true,
        ...defaultProps,
      });

      expect(inputValue()).toBe(validEmail);
      expect(isValid()).toBe(true);
      expect(container.innerHTML).not.toContain('Optional');
    });

    test('displays checkmark icon when input is valid even when input is disabled', () => {
      const { container, inputValue } = renderTextInput({
        value: validEmail,
        state: State.Valid,
        disabled: true,
        ...defaultProps,
      });

      expect(inputValue()).toBe(validEmail);
      expect(container.innerHTML).not.toContain('Optional');
    });
  });

  describe('disabled', () => {
    test('is true', () => {
      const { isDisabled } = renderTextInput({ disabled: true });

      expect(isDisabled()).toBe(true);
    });

    test('is false', () => {
      const { isDisabled } = renderTextInput();

      expect(isDisabled()).toBe(false);
    });
  });

  describe('when the "state" is "error"', () => {
    test('displays warning icon when input is invalid', () => {
      const { container, inputValue, isError } = renderTextInput({
        value: invalidEmail,
        state: State.Error,
        optional: true,
        ...defaultProps,
      });

      expect(inputValue()).toBe(invalidEmail);
      expect(isError()).toBe(true);
      expect(container.innerHTML).not.toContain('Optional');
    });

    test('renders empty error message container', () => {
      const { getErrorMessage } = renderTextInput({
        value: invalidEmail,
        state: State.Error,
        optional: true,
        ...defaultProps,
      });
      expect(getErrorMessage()).toHaveTextContent('');
    });

    test('displays error message when input is invalid', () => {
      const { getErrorMessage } = renderTextInput({
        value: invalidEmail,
        state: State.Error,
        optional: true,
        errorMessage: error,
        ...defaultProps,
      });
      expect(getErrorMessage()).toHaveTextContent(error);
    });
  });

  describe('when the "state" is "none"', () => {
    defaultProps.onChange.mockReturnValue('none');

    test('valid/error icons are not present', () => {
      const { isValid, isError } = renderTextInput({
        state: State.None,
        ...defaultProps,
      });
      expect(isValid()).toBe(false);
      expect(isError()).toBe(false);
    });

    test('key presses are reflected in component and onChange function is called when value changes', () => {
      const { inputValue, textInput } = renderTextInput({
        state: State.None,
        ...defaultProps,
      });
      expect(inputValue()).toBe('');

      fireEvent.change(textInput, {
        target: { value: 'a' },
      });

      expect(inputValue()).toBe('a');
      expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
      expect(defaultProps.onChange).toHaveReturnedWith('none');
    });

    test('onBlur is invoked when focus leaves the input', () => {
      renderTextInput(defaultProps);

      userEvent.tab(); // focus
      userEvent.tab(); // blur

      expect(defaultProps.onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('when no label is supplied', () => {
    test('no label tag renders to the DOM', () => {
      const { label } = renderTextInput({ label: '' });

      expect(label).not.toBeInTheDocument();
    });
  });

  describe('when no description is supplied', () => {
    test('no description tag renders to the DOM', () => {
      const { description } = renderTextInput({ description: '' });

      expect(description).not.toBeInTheDocument();
    });
  });

  describe('validation callback', () => {
    const setupValidationTest = () => {
      const handleValidation = jest.fn();
      const { container } = render(
        <TextInput label="test" handleValidation={handleValidation} />,
      );
      const inputElement = getByLabelText(container, 'test');
      return { handleValidation, inputElement };
    };

    test('is not called on focus', () => {
      const { handleValidation } = setupValidationTest();
      userEvent.tab(); // focus
      expect(handleValidation).not.toHaveBeenCalled();
    });

    test('is not called on keypress before initial blur', () => {
      const { handleValidation, inputElement } = setupValidationTest();
      userEvent.tab(); // focus
      userEvent.type(inputElement, `test`);
      expect(handleValidation).not.toHaveBeenCalled();
    });

    test('is called on blur', () => {
      const { handleValidation } = setupValidationTest();
      userEvent.tab(); // focus
      userEvent.tab(); // blur
      expect(handleValidation).toHaveBeenCalledTimes(1);
    });

    test('is called on subsequent keypresses', () => {
      const { handleValidation, inputElement } = setupValidationTest();
      userEvent.tab(); // focus
      userEvent.tab(); // blur
      userEvent.tab(); // focus
      userEvent.type(inputElement, `test`);
      expect(handleValidation).toHaveBeenCalledTimes(5); // blur + keypress * 4
    });
  });

  describe('returns correct value', () => {
    test('when uncontrolled', () => {
      const { textInput, inputValue } = renderTextInput();

      userEvent.type(textInput, '123');
      expect(inputValue()).toBe('123');
    });

    test('when controlled', () => {
      const { inputValue, rerenderTextInput } = renderTextInput({
        value: '456',
      });

      expect(inputValue()).toBe('456');
      rerenderTextInput({ value: 'I was rerendered' });
      expect(inputValue()).toBe('I was rerendered');
    });
  });

  /* eslint-disable jest/expect-expect, jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('TextInput throws error when no label is supplied', () => {
      // @ts-expect-error
      <TextInput />;
      <TextInput aria-label="some label" />;
      <TextInput aria-labelledby="some-id" />;
      <TextInput label="some-id" />;
    });

    test('TextInput throws an error when `type` is "search" and no label is supplied', () => {
      // @ts-expect-error
      <TextInput type="search" />;
      <TextInput type="search" aria-label="some label" />;
      <TextInput type="search" label="some label" />;
      <TextInput type="search" aria-labelledby="some label" />;
    });
  });
  /* eslint-enable jest/expect-expect, jest/no-disabled-tests */
});
