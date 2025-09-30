import React from 'react';
import { fireEvent, getByLabelText, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { consoleOnce } from '@leafygreen-ui/lib';

import { getTestUtils } from '../testing';

import TextInput from './TextInput';
import { State, TextInputProps } from './TextInput.types';

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

  const utils = getTestUtils();

  const textInput = utils.getInput();
  const label = utils.getLabel();
  const description = utils.getDescription();

  const rerenderTextInput = (newProps?: Partial<TextInputProps>) => {
    const allProps = { ...props, ...newProps };
    renderUtils.rerender(
      <TextInput label={defaultProps.label} {...allProps} />,
    );
  };

  return {
    ...renderUtils,
    ...utils,
    textInput,
    label,
    description,
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
    expect(label).toHaveTextContent(defaultProps.label);
    expect(description).toHaveTextContent(defaultProps.description);
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

  describe('when the "state" is "none"', () => {
    defaultProps.onChange.mockReturnValue('none');
    test('key presses are reflected in component and onChange function is called when value changes', () => {
      const { getInputValue, textInput } = renderTextInput({
        state: State.None,
        ...defaultProps,
      });
      expect(getInputValue()).toBe('');

      fireEvent.change(textInput, {
        target: { value: 'a' },
      });

      expect(getInputValue()).toBe('a');
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
      const { textInput, getInputValue } = renderTextInput();

      userEvent.type(textInput, '123');
      expect(getInputValue()).toBe('123');
    });

    test('when uncontrolled and there is a defaultValue suppolied', () => {
      const { textInput, getInputValue } = renderTextInput({
        defaultValue: '123',
      });

      expect(getInputValue()).toBe('123');

      userEvent.type(textInput, 'update');
      expect(getInputValue()).toBe('123update');
    });

    test('when controlled', () => {
      const { getInputValue, rerenderTextInput } = renderTextInput({
        value: '456',
      });

      expect(getInputValue()).toBe('456');
      rerenderTextInput({ value: 'I was rerendered' });
      expect(getInputValue()).toBe('I was rerendered');
    });
  });

  describe('readOnly', () => {
    test('renders readOnly attribute when readOnly is present', () => {
      const { textInput } = renderTextInput({ readOnly: true });
      expect(textInput).toHaveAttribute('readonly');
    });

    test('does not render readOnly attribute when readOnly is not present', () => {
      const { textInput } = renderTextInput();
      expect(textInput).not.toHaveAttribute('readonly');
    });
  });

  /* eslint-disable jest/no-disabled-tests */
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

    test('TextInput takes a ref for a HTMLInputElement', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<TextInput ref={ref} />);
    });
  });
  /* eslint-enable jest/no-disabled-tests */
});
