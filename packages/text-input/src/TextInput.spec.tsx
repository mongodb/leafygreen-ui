import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TextInput from './TextInput';
import { typeIs } from '@leafygreen-ui/lib';

afterAll(cleanup);

describe('packages/text-input', () => {
  const className = 'test-checkbox-class';
  const { container } = render(<TextInput className={className} />);
  const controlledContainer = container.firstChild;

  if (!typeIs.element(controlledContainer)) {
    throw new Error('Could not find controlled container component');
  }

  const controlledCheckbox = controlledContainer.children[0];

  if (!typeIs.input(controlledCheckbox)) {
    throw new Error('Could not find checkbox input element');
  }

  test(`renders "${className}" in the Checkbox label's classList`, () => {
    expect(controlledContainer.classList.contains(className)).toBe(true);
  });

  test('Input is optional when prop is set', () => {
    expect(controlledCheckbox.checked).toBe(false);
    expect(controlledCheckbox.getAttribute('aria-checked')).toBe('false');

    render(<TextInput optional={true} />, { container });

    expect(controlledCheckbox.checked).toBe(true);
    expect(controlledCheckbox.getAttribute('aria-checked')).toBe('true');
  });

  test('Input is disabled when disabled prop is set', () => {
    render(<TextInput disabled={true} />, { container });

    expect(controlledCheckbox.disabled).toBe(true);
    expect(controlledCheckbox.getAttribute('aria-disabled')).toBe('true');
  });
});
