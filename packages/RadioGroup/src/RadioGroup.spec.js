import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import RadioGroup from './RadioGroup';
import Radio from './Radio';

afterAll(cleanup);

describe('packages/RadioGroup', () => {
  const className = 'test-radiogroup-class';
  const { container } = render(
    <RadioGroup className={className} value="1">
      <Radio value="1">Radio Button 1</Radio>
    </RadioGroup>,
  );

  const controlledContainer = container.firstChild;
  test(`renders "${className}" in the container labels classList`, () => {
    expect(controlledContainer.classList.contains(className)).toBe(true);
  });
});

describe('when controlled', () => {
  const controlledOnChange = jest.fn();

  const { container } = render(
    <RadioGroup value="1" onChange={controlledOnChange}>
      <Radio value="1">Radio Button 1</Radio>
      <Radio value="2">Radio Button 2</Radio>
    </RadioGroup>,
  );

  const controlledContainer = container.firstChild;
  const firstInput = controlledContainer.children[0].firstChild;
  const secondInput = controlledContainer.children[1].firstChild;

  fireEvent.click(secondInput);

  test(`initial value set by radio group when prop provided`, () => {
    expect(firstInput.checked).toBe(true);
    expect(firstInput.getAttribute('aria-checked')).toBe('true');
  });

  test('onChange fires once when the label is clicked', () => {
    expect(controlledOnChange.mock.calls.length).toBe(1);
  });

  test('radio button does not become checked when clicked', () => {
    expect(secondInput.checked).toBe(false);
  });
});

describe('when uncontrolled', () => {
  const uncontrolledOnChange = jest.fn();
  const uncontrolledContainer = render(
    <RadioGroup onChange={uncontrolledOnChange}>
      <Radio value="option-1">Radio Button 1</Radio>
    </RadioGroup>,
  ).container.firstChild;

  const radioLabel = uncontrolledContainer.firstChild;
  const radio = radioLabel.firstChild;

  fireEvent.click(radioLabel);

  test('onChange fires once when the label is clicked', () => {
    expect(uncontrolledOnChange.mock.calls.length).toBe(1);
  });

  test('radio button becomes checked when clicked', () => {
    expect(radio.checked).toBe(true);
  });
});
