import React from 'react';
import {
  fireEvent,
  getByLabelText,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { consoleOnce } from '@leafygreen-ui/lib';

import TextInput from './TextInput';
import { SizeVariant, State } from './TextInput.types';

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
  const utils = render(
    <TextInput
      data-testid="text-input"
      label={defaultProps.label}
      {...props}
    />,
  );
  const textInput = utils.getByTestId('text-input');
  const label = utils.container.querySelector('label');
  const description = utils.container.querySelector('p');
  return { ...utils, textInput, label, description };
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

  test('renders "optional" text when the prop is set to true', () => {
    const { getByText } = renderTextInput({ optional: true, ...defaultProps });
    expect(getByText('Optional')).toBeVisible();
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
      const { container, textInput } = renderTextInput({
        value: validEmail,
        state: State.Valid,
        optional: true,
        ...defaultProps,
      });

      expect((textInput as HTMLInputElement).value).toBe(validEmail);
      expect(container.innerHTML).not.toContain('Optional');
    });

    test('displays checkmark icon when input is valid even when input is disabled', () => {
      const { container, textInput } = renderTextInput({
        value: validEmail,
        state: State.Valid,
        disabled: true,
        ...defaultProps,
      });

      expect((textInput as HTMLInputElement).value).toBe(validEmail);
      expect(container.innerHTML).not.toContain('Optional');
    });
  });

  describe('when the "state" is "error"', () => {
    test('displays warning icon when input is invalid', () => {
      const { container, textInput } = renderTextInput({
        value: invalidEmail,
        state: State.Error,
        optional: true,
        ...defaultProps,
      });

      expect((textInput as HTMLInputElement).value).toBe(invalidEmail);
      expect(container.innerHTML).not.toContain('Optional');
    });

    test('displays warning icon even when input is disabled', () => {
      const { container, textInput } = renderTextInput({
        value: invalidEmail,
        state: State.Error,
        disabled: true,
        ...defaultProps,
      });

      expect((textInput as HTMLInputElement).value).toBe(invalidEmail);
      expect(container.innerHTML).not.toContain('Optional');
    });

    test('displays error message when input is invalid', () => {
      const { container } = renderTextInput({
        value: invalidEmail,
        state: State.Error,
        optional: true,
        errorMessage: error,
        ...defaultProps,
      });
      expect(container.innerHTML).toContain(error);
    });
  });

  describe('when the "state" is "none"', () => {
    defaultProps.onChange.mockReturnValue('none');

    test('valid/error icons are not present', () => {
      const { container } = renderTextInput({
        state: State.None,
        ...defaultProps,
      });
      expect(container.innerHTML).not.toContain('Checkmark Icon');
      expect(container.innerHTML).not.toContain('Warning Icon');
    });

    test('key presses are reflected in component and onChange function is called when value changes', () => {
      const { textInput } = renderTextInput({
        state: State.None,
        ...defaultProps,
      });
      expect((textInput as HTMLInputElement).value).toBe('');

      fireEvent.change(textInput, {
        target: { value: 'a' },
      });

      expect((textInput as HTMLInputElement).value).toBe('a');
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
      renderTextInput();

      expect(screen.queryByRole('label')).not.toBeInTheDocument();
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

  describe('when the "sizeVariant" is "large"', () => {
    // TODO: This type of check should be done with a visual regression test
    // As written this test does not pass even if the font-size is inherited correctly
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('check if font-size is 18px', () => {
      const { label } = renderTextInput({
        value: validEmail,
        sizeVariant: SizeVariant.Large,
        optional: true,
        ...defaultProps,
      });

      expect(label).toHaveStyle({
        fontSize: '18px',
      });
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
