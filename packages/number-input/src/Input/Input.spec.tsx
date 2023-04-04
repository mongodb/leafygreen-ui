import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from '.';

const defaultProps = {
  placeholder: 'This is some placeholder text',
  onChange: jest.fn(),
  onBlur: jest.fn(),
};

function renderInput(props = {}) {
  const utils = render(<Input data-testid="number-input" {...props} />);
  const input = utils.getByTestId('number-input');
  return {
    ...utils,
    input,
  };
}

// These are the same test from `NumberInput.spec.tsx`
describe('packages/number-input/input', () => {
  describe('Input', () => {
    test('render input type as "number"', async () => {
      const { input } = renderInput();
      expect(input.getAttribute('type')).toBe('number');
    });

    test('value change triggers onChange callback', () => {
      const { input } = renderInput({
        ...defaultProps,
      });

      expect((input as HTMLInputElement).value).toBe('');

      fireEvent.change(input, {
        target: { value: '1' },
      });

      expect((input as HTMLInputElement).value).toBe('1');
      expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    });

    test('blur triggers onBlur callback', () => {
      const { input } = renderInput({
        ...defaultProps,
      });

      userEvent.tab(); // focus
      expect(input).toHaveFocus();
      userEvent.tab(); // blur

      expect(defaultProps.onBlur).toHaveBeenCalledTimes(1);
    });

    test('value changes when "up" arrow is clicked', () => {
      const { container, input } = renderInput({
        ...defaultProps,
      });

      const upArrow = container.querySelector(
        'button[aria-label="increment number"]',
      );

      userEvent.click(upArrow as HTMLButtonElement);
      expect((input as HTMLInputElement).value).toBe('1');
    });

    test('value changes when "down" arrow is clicked', () => {
      const { container, input } = renderInput({
        ...defaultProps,
      });

      const upArrow = container.querySelector(
        'button[aria-label="decrement number"]',
      );

      userEvent.click(upArrow as HTMLButtonElement);
      expect((input as HTMLInputElement).value).toBe('-1');
    });

    test(`renders placeholder text`, () => {
      const { getByPlaceholderText } = renderInput({
        ...defaultProps,
      });
      expect(getByPlaceholderText(defaultProps.placeholder)).toBeVisible();
    });

    test(`is disabled when disabled is passed`, () => {
      const { input } = renderInput({
        ...defaultProps,
        disabled: true,
      });
      expect(input.hasAttribute('readonly')).toBeTruthy();
      expect(input.getAttribute('aria-disabled')).toBe('true');
    });
  });
});
