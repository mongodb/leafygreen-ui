import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TextInput, { State } from './TextInput';

const error = 'This is the error message';
const validEmail = 'test.email@mongodb.com';
const invalidEmail = 'invalid.email';
const defaultProps = {
  className: 'test-text-input-class',
  label: 'Test Input Label',
  description: 'This is the description',
  placeholder: 'This is some placeholder text',
  onChange: jest.fn(),
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
    const { textInput } = renderTextInput({ type: 'password' });
    expect(textInput.getAttribute('type')).toBe('password');
  });

  test('does not render "optional" text when the prop is set to false ', () => {
    const { container } = renderTextInput({ optional: false, ...defaultProps });
    expect(container.innerHTML).not.toContain('Optional');
  });

  describe('when the "state" is "valid"', () => {
    test('displays checkmark icon when input is valid', () => {
      const { container, textInput, getByTitle } = renderTextInput({
        value: validEmail,
        state: State.Valid,
        optional: true,
        ...defaultProps,
      });

      expect((textInput as HTMLInputElement).value).toBe(validEmail);
      expect(container.innerHTML).not.toContain('Optional');
      expect(getByTitle('Checkmark Icon')).toBeInTheDocument();
    });
  });

  describe('when the "state" is "error"', () => {
    test('displays warning icon when input is invalid', () => {
      const { container, textInput, getByTitle } = renderTextInput({
        value: invalidEmail,
        state: State.Error,
        optional: true,
        ...defaultProps,
      });

      expect((textInput as HTMLInputElement).value).toBe(invalidEmail);
      expect(container.innerHTML).not.toContain('Optional');
      expect(getByTitle('Warning Icon')).toBeInTheDocument();
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
  });

  describe('when no label is supplied', () => {
    test('no label tag renders to the DOM', () => {
      renderTextInput();

      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });
  });

  /* eslint-disable jest/expect-expect, jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('TextInput throws error when neither aria-labelledby or label is supplied', () => {
      // @ts-expect-error
      <TextInput />;
    });
  });
  /* eslint-enable jest/expect-expect, jest/no-disabled-tests */
});
