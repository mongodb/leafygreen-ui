import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TextInput from './TextInput';
import { typeIs } from '@leafygreen-ui/lib';

afterAll(cleanup);

describe('packages/text-input', () => {
  const className = 'test-text-input-class';
  const { container } = render(<TextInput className={className} />);
  const controlledContainer = container.firstChild;

  if (!typeIs.element(controlledContainer)) {
    throw new Error('Could not find controlled container component');
  }

  const controlledTextInput = controlledContainer.children[0];

  if (!typeIs.input(controlledTextInput)) {
    throw new Error('Could not find text input element');
  }

  test(`renders "${className}" in the TextInput's classList`, () => {
    expect(controlledContainer.classList.contains(className)).toBe(true);
  });

  test('Input is optional when prop is set', () => {
    expect(controlledTextInput.required).toBe(true);

    render(<TextInput optional={true} />, { container });

    expect(controlledTextInput.required).toBe(false);
  });

  test('Input is disabled when disabled prop is set', () => {
    render(<TextInput disabled={true} />, { container });

    expect(controlledTextInput.disabled).toBe(true);
    expect(controlledTextInput.getAttribute('aria-disabled')).toBe('true');
  });
});
