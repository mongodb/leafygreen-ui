import React from 'react';
import { render, cleanup } from 'react-testing-library';
import RadioButton from './RadioButton';

afterAll(cleanup);

describe('packages/RadioButton', () => {
  const className = 'radio-button-test-class';
  const { container } = render(
    <RadioButton disabled value="option-1" className={className}>
      Radio Button 1
    </RadioButton>,
  );

  const radioButton = container.firstChild;
  const input = radioButton.firstChild;

  test(`renders "${className}" in the labels's class list`, () => {
    expect(radioButton.classList.contains(className)).toBe(true);
  });

  test(`renders disabled radio button when disabled prop is set`, () => {
    expect(input.disabled).toBe(true);
    expect(input.getAttribute('aria-disabled')).toBe('true');
  });

  test(`radio button is checked when value is set`, () => {
    render(
      <RadioButton value="option-two" checked={true}>
        Radio Button 2
      </RadioButton>,
      { container },
    );
    expect(input.checked).toBe(true);
    expect(input.getAttribute('aria-checked')).toBe('true');
  });
});
