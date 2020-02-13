import React from 'react';
import { render, cleanup, fireEvent, getByTitle } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TextInput from './TextInput';
import { typeIs } from '@leafygreen-ui/lib';

afterAll(cleanup);

describe('packages/text-input', () => {
  const className = 'test-text-input-class';
  const label = 'Test Input Label';
  const description = 'This is the description';
  const state = 'none';
  const onChange = jest.fn();
  onChange.mockReturnValueOnce('none');
  onChange.mockReturnValueOnce('error');
  onChange.mockReturnValueOnce('valid');
  onChange.mockReturnValue('none');

  const renderedTextInputEnabled = render(
    <TextInput
      className={className}
      label={label}
      description={description}
      onChange={onChange}
      state={state}
    />,
  );

  const renderedChildren = renderedTextInputEnabled.container.firstChild;

  if (!typeIs.element(renderedChildren)) {
    throw new Error('TextInput component failed to render');
  }

  const renderedInputElement =
    renderedChildren.children[0].children[1].children[0];

  if (!typeIs.input(renderedInputElement)) {
    throw new Error('Could not find input element');
  }

  test(`renders "${label}" as the input's label and "${description}" as the description`, () => {
    expect(renderedChildren.innerHTML).toContain(label);
    expect(renderedChildren.innerHTML).toContain(description);
  });

  test('key presses are reflected in component state and onChange function is called when value changes', () => {
    expect(renderedInputElement.value).toBe('');
    fireEvent.change(renderedInputElement, {
      target: { value: 'a' },
    });
    expect(renderedInputElement.value).toBe('a');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('state updates when onChange is called', () => {
    const checkmarkIcon = getByTitle(renderedChildren, 'Checkmark Icon');
    const warningIcon = getByTitle(renderedChildren, 'Warning Icon');
    expect(checkmarkIcon).not.toBeVisible();
    expect(warningIcon).not.toBeVisible();
    fireEvent.change(renderedInputElement, {
      target: { value: 'test.email@mongodb.com' },
    });
    expect(checkmarkIcon).toBeVisible();
    expect(warningIcon).not.toBeVisible();
    fireEvent.change(renderedInputElement, {
      target: { value: 'invalid.email' },
    });
    expect(checkmarkIcon).not.toBeVisible();
    expect(warningIcon).toBeVisible();
  });
});
