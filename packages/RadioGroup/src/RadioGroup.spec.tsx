import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import RadioGroup from './RadioGroup';
import Radio from './Radio';

afterAll(cleanup);

function isElement(el: Node | null): el is HTMLElement {
  return el != null && el.nodeType === Node.ELEMENT_NODE;
}

function isInput(el: Node | null): el is HTMLInputElement {
  return isElement(el) && el.tagName.toLowerCase() === 'input';
}

describe('packages/RadioGroup', () => {
  const className = 'test-radiogroup-class';
  const { container } = render(
    <RadioGroup className={className} value="1">
      <Radio value="1">Radio Button 1</Radio>
    </RadioGroup>,
  );

  const controlledContainer = container.firstChild;

  if (!isElement(controlledContainer)) {
    throw new Error('Could not find controlled container component');
  }

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

  if (!isElement(controlledContainer)) {
    throw new Error('Could not find controlled container component');
  }

  const firstInput = controlledContainer.children[0].firstChild;
  const secondInput = controlledContainer.children[1].firstChild;

  if (!isInput(firstInput)) {
    throw new Error('Could not find the first radio input element');
  }

  if (!isInput(secondInput)) {
    throw new Error('Could not find the second radio input element');
  }

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

  if (!isElement(uncontrolledContainer)) {
    throw new Error('Could not find uncontrolled container component');
  }

  const radioLabel = uncontrolledContainer.firstChild;

  if (!isElement(radioLabel)) {
    throw new Error('Could not find the label element');
  }

  const radio = radioLabel.firstChild;

  if (!isInput(radio)) {
    throw new Error('Could not find the radio input element');
  }

  fireEvent.click(radioLabel);

  test('onChange fires once when the label is clicked', () => {
    expect(uncontrolledOnChange.mock.calls.length).toBe(1);
  });

  test('radio button becomes checked when clicked', () => {
    expect(radio.checked).toBe(true);
  });
});
