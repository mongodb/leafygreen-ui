import React from 'react';
import { fireEvent, getByLabelText, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { getTestUtils } from '../utils';

import { State, TextArea, TextAreaProps } from '.';

const onChange = jest.fn();

const labelProp = 'Test Area Label';
const errorMessage = 'This is an error message';
const defaultProps = {
  className: 'test-text-area-class',
  description: 'This is the description',
};

function renderTextArea(props = {}) {
  const renderUtils = render(<TextArea label={labelProp} {...props} />);

  const utils = getTestUtils();

  const textArea = utils.getInput();
  const label = utils.getLabel();
  const description = utils.getDescription();

  const rerenderTextArea = (newProps?: Partial<TextAreaProps>) => {
    const allProps = { ...props, ...newProps };
    renderUtils.rerender(<TextArea label={labelProp} {...allProps} />);
  };

  return {
    ...renderUtils,
    ...utils,
    textArea,
    label,
    description,
    rerenderTextArea,
  };
}

describe('packages/text-area', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderTextArea();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
  test(`renders ${labelProp} as the input label and ${defaultProps.description} as the description`, () => {
    const { label, description } = renderTextArea(defaultProps);
    expect(label).toHaveTextContent(labelProp);
    expect(description).toHaveTextContent(defaultProps.description);
  });

  test(`renders ${defaultProps.className} in the classList`, () => {
    const utils = renderTextArea(defaultProps);
    const container = utils.container.firstChild as HTMLDivElement;
    expect(container.classList.contains(defaultProps.className)).toBe(true);
  });

  test('key presses are reflected in component and onChange function is called when value changes', () => {
    const { textArea, getInputValue } = renderTextArea({ onChange });
    expect(getInputValue()).toBe('');

    fireEvent.change(textArea, {
      target: { value: 'a' },
    });

    expect(getInputValue()).toBe('a');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('setting a defaultValue sets a default initial value and can be changed after', () => {
    const { textArea } = renderTextArea({
      defaultValue: 'a fun default value',
    });
    expect((textArea as HTMLTextAreaElement).value).toBe('a fun default value');

    fireEvent.change(textArea, {
      target: { value: 'a' },
    });

    expect((textArea as HTMLTextAreaElement).value).toBe('a');
  });

  describe('when the "state" prop is set to error, and an "errorMessage" is set', () => {
    test('the error message appears in the DOM', () => {
      const { isError, getErrorMessage } = renderTextArea({
        state: State.Error,
        errorMessage,
      });

      expect(isError()).toBe(true);
      expect(getErrorMessage()).toHaveTextContent(errorMessage);
    });
  });

  describe('when the "state" props is set to "none', () => {
    test('error icon is not present', () => {
      const { isError } = renderTextArea();
      expect(isError()).toBe(false);
    });

    test('error message returns null', () => {
      const { getErrorMessage } = renderTextArea();
      expect(getErrorMessage()).not.toBeInTheDocument();
    });
  });

  test('onBlur is invoked when focus leaves the textarea', () => {
    const onBlur = jest.fn();

    renderTextArea({ onBlur, ...defaultProps });

    userEvent.tab(); // focus
    userEvent.tab(); // blur

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  describe('when no label is supplied', () => {
    test('no label tag renders to the DOM', () => {
      const { label } = renderTextArea({ label: '' });

      expect(label).not.toBeInTheDocument();
    });
  });

  describe('when no description is supplied', () => {
    test('no description tag renders to the DOM', () => {
      const { description } = renderTextArea();

      expect(description).not.toBeInTheDocument();
    });
  });

  describe('validation callback', () => {
    const setupValidationTest = () => {
      const handleValidation = jest.fn();
      const { container } = render(
        <TextArea label="test" handleValidation={handleValidation} />,
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

  describe('disabled', () => {
    test('is true', () => {
      const { isDisabled } = renderTextArea({ disabled: true });

      expect(isDisabled()).toBe(true);
    });

    test('is false', () => {
      const { isDisabled } = renderTextArea();

      expect(isDisabled()).toBe(false);
    });
  });

  describe('returns correct value', () => {
    test('when uncontrolled', () => {
      const { textArea, getInputValue } = renderTextArea();

      userEvent.type(textArea, '123');
      expect(getInputValue()).toBe('123');
    });

    test('when controlled', () => {
      const { getInputValue, rerenderTextArea } = renderTextArea({
        value: '456',
      });

      expect(getInputValue()).toBe('456');
      rerenderTextArea({ value: 'I was rerendered' });
      expect(getInputValue()).toBe('I was rerendered');
    });
  });

  /* eslint-disable jest/expect-expect, jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('TextArea throws error when neither aria-labelledby or label is supplied', () => {
      // @ts-expect-error
      <TextArea />;
      <TextArea label="Some label" />;
      <TextArea aria-labelledby="some-id" />;
    });
  });
  /* eslint-enable jest/expect-expect, jest/no-disabled-tests */
});
