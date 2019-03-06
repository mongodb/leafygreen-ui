import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import RichRadioInput from './RichRadioInput';
import RichRadioGroup from './RichRadioGroup';

afterAll(cleanup);

describe('packages/Radio', () => {
  const className = 'test-rich-radio-input-class';
  const { container } = render(
    <RichRadioInput value="rich-radio-1" className={className} checked={true}>
      Rich Radio Input 1
    </RichRadioInput>,
  );

  const richRadioContainer = container.firstChild;
  const richRadioInput = richRadioContainer.firstChild;

  test(`renders "${className}" in RichRadioInput's classList`, () => {
    expect(richRadioContainer.classList.contains(className)).toBe(true);
  });

  test('renders as checked, when the checked prop is set', () => {
    expect(richRadioInput.checked).toBe(true);
    expect(richRadioInput.getAttribute('aria-checked')).toBe('true');
  });

  test('renders as disabled, when the disabled prop is set', () => {
    render(
      <RichRadioInput value="option-disabled" disabled={true}>
        Rich Radio Input 3
      </RichRadioInput>,
    );
  });
});

describe('when controlled', () => {
  const controlledOnChange = jest.fn();

  const { container } = render(
    <RichRadioGroup
      value="option-1"
      variant="green"
      onChange={controlledOnChange}
    >
      <RichRadioInput value="option-1">Option 1</RichRadioInput>
      <RichRadioInput value="option-2">Option 2</RichRadioInput>
    </RichRadioGroup>,
  );

  const richRadioGroup = container.firstChild;
  const firstRichRadioInputContainer = richRadioGroup.firstChild;
  const firstRichRadioInput = firstRichRadioInputContainer.firstChild;
  const secondRichRadioInput = richRadioGroup.children[1].firstChild;

  fireEvent.click(secondRichRadioInput);

  test(`initial value set by rich radio group when prop provided`, () => {
    expect(firstRichRadioInput.checked).toBe(true);
    expect(firstRichRadioInput.getAttribute('aria-checked')).toBe('true');
  });

  test('onChange fires once when the label is clicked', () => {
    expect(controlledOnChange.mock.calls.length).toBe(1);
  });

  test('radio input does not become checked when clicked', () => {
    expect(secondRichRadioInput.checked).toBe(false);
  });
});

describe('when uncontrolled', () => {
  const uncontrolledOnChange = jest.fn();

  const { container } = render(
    <RichRadioGroup variant="green" onChange={uncontrolledOnChange}>
      <RichRadioInput value="option-1">Option 1</RichRadioInput>
      <RichRadioInput disabled value="option-2">Option 2</RichRadioInput>
    </RichRadioGroup>,
  );

  const richRadioGroup = container.firstChild;
  const firstRichRadioInputContainer = richRadioGroup.firstChild;
  const firstRichRadioInput = firstRichRadioInputContainer.firstChild;
  const secondRichRadioInput = richRadioGroup.children[1].firstChild;

  fireEvent.click(firstRichRadioInputContainer);

  test('onChange fires once when the label is clicked', () => {
    expect(uncontrolledOnChange.mock.calls.length).toBe(1);
  });

  test('radio button becomes checked when clicked', () => {
    expect(firstRichRadioInput.checked).toBe(true);
    expect(firstRichRadioInput.getAttribute('aria-checked')).toBe('true');
  });
});
