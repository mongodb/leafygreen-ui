import React from 'react';
import {
  render,
  fireEvent,
  screen,
  getByLabelText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import TextArea, { State } from './TextArea';

const onChange = jest.fn();

const labelProp = 'Test Area Label';
const errorMessage = 'This is an error message';
const defaultProps = {
  className: 'test-text-area-class',
  description: 'This is the description',
};

function renderTextArea(props = {}) {
  const utils = render(
    <TextArea data-testid="text-area" label={labelProp} {...props} />,
  );

  const textArea = utils.getByTestId('text-area');
  const label = utils.container.querySelector('label');
  const description = utils.container.querySelector('p');
  return { ...utils, textArea, label, description };
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
    expect(label?.innerHTML).toContain(labelProp);
    expect(description?.innerHTML).toContain(defaultProps.description);
  });

  test(`renders ${defaultProps.className} in the classList`, () => {
    const utils = renderTextArea(defaultProps);
    const container = utils.container.firstChild as HTMLDivElement;
    expect(container.classList.contains(defaultProps.className)).toBe(true);
  });

  test('key presses are reflected in component and onChange function is called when value changes', () => {
    const { textArea } = renderTextArea({ onChange });
    expect((textArea as HTMLTextAreaElement).value).toBe('');

    fireEvent.change(textArea, {
      target: { value: 'a' },
    });

    expect((textArea as HTMLTextAreaElement).value).toBe('a');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  describe('when the "state" prop is set to error, and an "errorMessage" is set', () => {
    test('the error message appears in the DOM', () => {
      const { container } = renderTextArea({
        state: State.Error,
        errorMessage,
      });

      expect(container.innerHTML.includes(errorMessage)).toBe(true);
    });
  });

  describe('when no label is supplied', () => {
    test('no label tag renders to the DOM', () => {
      renderTextArea();

      expect(screen.queryByRole('label')).not.toBeInTheDocument();
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

  /* eslint-disable jest/expect-expect, jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('TextArea throws error when neither aria-labelledby or label is supplied', () => {
      // @ts-expect-error
      <TextArea />;
    });
  });
  /* eslint-enable jest/expect-expect, jest/no-disabled-tests */
});
