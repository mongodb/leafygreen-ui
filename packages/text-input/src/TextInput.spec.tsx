import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';
import { typeIs } from '@leafygreen-ui/lib';

afterAll(cleanup);

describe('packages/text-input', () => {
  const className = 'test-text-input-class';
  const label = 'Test Input Label';
  const description = 'This is the description';
  const onFocus = jest.fn();
  const onBlur = jest.fn();

  const renderedTextInput = render(
    <TextInput
      className={className}
      label={label}
      description={description}
      onFocus={onFocus}
      onBlur={onBlur}
    />,
  );
  const renderedChildren = renderedTextInput.container.firstChild;

  if (!typeIs.element(renderedChildren)) {
    throw new Error('TextInput component failed to render');
  }

  const renderedInputElement = renderedChildren.children[2].children[0];

  if (!typeIs.input(renderedInputElement)) {
    throw new Error('Could not find input element');
  }

  test(`renders "${label}" as the input's label and "${description}" as the description`, () => {
    expect(renderedChildren.innerHTML).toContain(label);
    expect(renderedChildren.innerHTML).toContain(description);
  });

  test('key presses are reflected in component state', () => {
    expect(renderedInputElement.value).toBe('');
    fireEvent.change(renderedInputElement, {
      target: { value: 'a' },
    });
    expect(renderedInputElement.value).toBe('a');
  });

  test('key press is not recorded when field is disabled', () => {
    renderedInputElement.setAttribute('disabled', 'true');
    expect(renderedInputElement.value).toBe('a');
    fireEvent.change(renderedInputElement, {
      target: { value: 'a' },
    });
    expect(renderedInputElement.value).toBe('a');
  });
});
