import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  getByTitle,
  getByText,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TextInput, { State } from './TextInput';
import { typeIs } from '@leafygreen-ui/lib';

afterAll(cleanup);

describe('packages/text-input', () => {
  const className = 'test-text-input-class';
  const label = 'Test Input Label';
  const description = 'This is the description';
  const error = 'This is the error message';
  const validEmail = 'test.email@mongodb.com';
  const invalidEmail = 'invalid.email';
  const onChange = jest.fn();
  onChange.mockReturnValue('none');

  const renderedTextInput = render(
    <TextInput
      className={className}
      label={label}
      description={description}
      onChange={onChange}
      state={State.None}
      optional={true}
    />,
  );

  const renderedChildren = renderedTextInput.container.firstChild;

  if (!typeIs.element(renderedChildren)) {
    throw new Error('TextInput component failed to render');
  }

  const renderedInputElement =
    renderedChildren.children[0].children[1].children[0];

  if (!typeIs.input(renderedInputElement)) {
    throw new Error('Could not find input element');
  }

  const optionalText = getByText(renderedChildren, 'Optional').parentElement;

  test(`renders "${label}" as the input's label and "${description}" as the description`, () => {
    expect(renderedChildren.innerHTML).toContain(label);
    expect(renderedChildren.innerHTML).toContain(description);
  });

  test(`check that "optional" text is visible`, () => {
    expect(optionalText).toBeVisible();
  });

  test('key presses are reflected in component state and onChange function is called when value changes', () => {
    expect(renderedInputElement.value).toBe('');
    fireEvent.change(renderedInputElement, {
      target: { value: 'a' },
    });
    expect(renderedInputElement.value).toBe('a');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveReturnedWith('none');
  });

  test('checkmark icon shows when input is valid', async () => {
    render(
      <TextInput
        className={className}
        label={label}
        description={description}
        state={State.Valid}
        value={validEmail}
        optional={true}
      />,
      {
        container: renderedTextInput.container,
      },
    );

    expect(renderedInputElement.value).toBe(validEmail);
    const checkmarkIcon = getByTitle(renderedChildren, 'Checkmark Icon')
      .parentElement;

    if (!typeIs.element(checkmarkIcon)) {
      throw new Error('Could not find checkmark icon element');
    }
  });

  test('warning icon and error message show when input is invalid', async () => {
    render(
      <TextInput
        className={className}
        label={label}
        description={description}
        state={State.Error}
        value={invalidEmail}
        errorMessage={error}
        optional={true}
      />,
      {
        container: renderedTextInput.container,
      },
    );

    expect(renderedInputElement.value).toBe(invalidEmail);
    const warningIcon = getByTitle(renderedChildren, 'Warning Icon')
      .parentElement;

    if (!typeIs.element(warningIcon)) {
      throw new Error('Could not find warning icon element');
    }
    expect(renderedChildren.innerHTML).toContain(error);
  });
});
