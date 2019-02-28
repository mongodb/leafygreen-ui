import React from 'react';
import { render, cleanup } from 'react-testing-library';
import RadioGroup from './RadioGroup'
import RadioButton from './RadioButton'

afterAll(cleanup);

describe('packages/RadioButton', () => {
  const className = 'radio-button-test-class';
  const { container } = render(
    <RadioGroup value="option-2">
      <RadioButton disabled value="option-1" className={className}>
        Radio Button 1
      </RadioButton>
      <RadioButton value="option-2">Radio Button 2</RadioButton>
    </RadioGroup>,
  );

  const controlledContainer = container.firstChild;
  const radioLabel1 = controlledContainer.firstChild;
  const radioInput1 = radioLabel1.firstChild;
  const radioLabel2 = controlledContainer.children[1];
  const radioInput2 = radioLabel2.firstChild;

  test(`renders "${className}" in the input's class list`, () => {
    expect(radioInput1.classList.contains(className)).toBe(true);
  });

  test(`renders disabled radio button when disabled prop is set`, () => {
    expect(radioInput1.disabled).toBe(true);
    expect(radioInput1.getAttribute('aria-disabled')).toBe('true');
  });

  test(`radio button is checked when value is set`, () => {
    expect(radioInput2.checked).toBe(true);
    expect(radioInput2.getAttribute('aria-checked')).toBe('true');
  });
});
