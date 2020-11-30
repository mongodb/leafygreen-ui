import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
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
  test(`renders ${labelProp} as the input label and ${defaultProps.description} as the description`, () => {
    const { label, description } = renderTextArea(defaultProps);
    expect(label?.innerHTML).toContain(labelProp);
    expect(description?.innerHTML).toContain(defaultProps.description);
  });

  test(`renders ${defaultProps.className} in the classList`, () => {
    const utils = renderTextArea(defaultProps);
    const container = utils.container.firstChild as HTMLDivElement
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

  /* eslint-disable jest/expect-expect, jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('TextArea throws error when neither aria-labelledby or label is supplied', () => {
      // @ts-expect-error
      <TextArea />;
    });
  });
  /* eslint-enable jest/expect-expect, jest/no-disabled-tests */
});
