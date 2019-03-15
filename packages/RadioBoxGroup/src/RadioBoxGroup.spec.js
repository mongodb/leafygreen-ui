import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import RadioBox from './RadioBox';
import RadioBoxGroup from './RadioBoxGroup';

afterAll(cleanup);

const className = 'test-radio-box-class';

const { container } = render(
  <RadioBox value="radio-1" className={className} checked={true}>
    Input 1
  </RadioBox>,
);

describe('packages/Radio', () => {
  const radioBoxContainer = container.firstChild;
  const radioBox = radioBoxContainer.firstChild;
  test(`renders "${className}" in RadioBox's classList`, () => {
    expect(radioBoxContainer.classList.contains(className)).toBe(true);
  });

  test('renders as checked, when the checked prop is set', () => {
    expect(radioBox.checked).toBe(true);
    expect(radioBox.getAttribute('aria-checked')).toBe('true');
  });

  test('renders as disabled, when the disabled prop is set', () => {
    render(
      <RadioBox value="option-disabled" disabled={true} checked={false}>
        Input 2
      </RadioBox>,
      { container },
    );
  });
});

describe('when controlled', () => {
  const controlledOnChange = jest.fn();

  render(
    <RadioBoxGroup value="option-1" onChange={controlledOnChange}>
      <RadioBox value="option-1">Option 1</RadioBox>
      <RadioBox value="option-2">Option 2</RadioBox>
    </RadioBoxGroup>,
    { container },
  );

  const radioBoxGroup = container.firstChild;
  const firstRadioBoxLabel = radioBoxGroup.firstChild;
  const firstRadioBoxInput = firstRadioBoxLabel.firstChild;
  const secondRadioBoxInput = radioBoxGroup.children[1].firstChild;

  fireEvent.click(secondRadioBoxInput);

  test(`initial value set by radio box group when prop provided`, () => {
    expect(firstRadioBoxInput.checked).toBe(true);
    expect(firstRadioBoxInput.getAttribute('aria-checked')).toBe('true');
  });

  test('onChange fires once when the label is clicked', () => {
    expect(controlledOnChange.mock.calls.length).toBe(1);
  });

  test('radio input does not become checked when clicked', () => {
    expect(secondRadioBoxInput.checked).toBe(false);
  });
});

describe('when uncontrolled', () => {
  const uncontrolledOnChange = jest.fn();

  render(
    <RadioBoxGroup onChange={uncontrolledOnChange}>
      <RadioBox value="option-1">Option 1</RadioBox>
    </RadioBoxGroup>,
    { container },
  );

  const radioBoxGroup = container.firstChild;
  const radioBoxLabel = radioBoxGroup.firstChild;
  const radioBoxInput = radioBoxLabel.firstChild;

  fireEvent.click(radioBoxLabel);

  test('onChange fires once when the label is clicked', () => {
    expect(uncontrolledOnChange.mock.calls.length).toBe(1);
  });

  test('radio button becomes checked when clicked', () => {
    expect(radioBoxInput.getAttribute('aria-checked')).toBe('true');
    expect(radioBoxInput.checked).toBe(true);
  });
});
