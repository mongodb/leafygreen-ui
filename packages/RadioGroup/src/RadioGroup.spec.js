import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import RadioGroup from '.';
import RadioButton from '../../RadioButton/src/index';

afterAll(cleanup);

describe('packages/RadioGroup', () => {
  const className = 'test-radiogroup-class';
  const { container } = render(
    <RadioGroup className={className} value="1">
      <RadioButton value="1">Radio Button 1</RadioButton>
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
      <RadioButton value="1">Radio Button 1</RadioButton>
      <RadioButton value="2">Radio Button 2</RadioButton>
    </RadioGroup>,
  );

  const controlledContainer = container.firstChild;
  const firstButton = controlledContainer.children[0];
  const secondButton = controlledContainer.children[1];

  fireEvent.click(secondButton.firstChild);

  test(`initial value set by radio group when prop provided`, () => {
    expect(firstButton.firstChild.checked).toBe(true);
    expect(firstButton.firstChild.getAttribute('aria-checked')).toBe('true');
  });

  test('onChange fires once when the label is clicked', () => {
    expect(controlledOnChange.mock.calls.length).toBe(1);
  });

  test('radio button does not become checked when clicked', () => {
    expect(secondButton.firstChild.checked).toBe(false);
  });
});

describe('when uncontrolled', () => {
  const uncontrolledOnChange = jest.fn();
  const uncontrolledContainer = render(
    <RadioGroup onChange={uncontrolledOnChange}>
      <RadioButton value="option-1">Radio Button 1</RadioButton>
    </RadioGroup>,
  ).container.firstChild;

  const radioGroup = uncontrolledContainer;
  const radioLabel = uncontrolledContainer.children[0];
  const radioButton = radioGroup.firstChild;
  fireEvent.click(radioLabel.firstChild);

  test('onChange fires once when the label is clicked', () => {
    expect(uncontrolledOnChange.mock.calls.length).toBe(1);
  });

  test('radio button becomes checked when clicked', () => {
    expect(radioButton.firstChild.checked).toBe(true);
  });
});
