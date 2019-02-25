import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import RadioGroup from '.';
import RadioButton from '../../RadioButton/src/index';

afterAll(cleanup);

describe('packages/RadioGroup', () => {
  const className = 'test-radiogroup-class';
  const { container } = render(
    <RadioGroup className={className} value="1">
      <RadioButton value="1">HEY</RadioButton>
    </RadioGroup>,
  );

  const controlledContainer = container.firstChild;
  const controlledRadioGroup = controlledContainer.children[0];

  test(`renders "${className}" in the container labels classList`, () => {
    expect(controlledContainer.classList.contains(className)).toBe(true);
  });

  // test, value supplied but doesn't exist within provided buttons
  // expect(controlledRadioGroup.children.map(child => child.checked))
  // React.Children(RadioGroup.children, (child) => {
  //     expect(child.checked).toBe(false)
  // })
});

describe('when controlled', () => {
  const controlledOnChange = jest.fn();

  const { container } = render(
    <RadioGroup 
        value="1"
        onChange={() => console.log('testing')}>
      <RadioButton value="1">HEY</RadioButton>
    </RadioGroup>,
  );

  const controlledContainer = container.firstChild;
  const controlledRadioGroup = controlledContainer.children[0];
  fireEvent.change(controlledRadioGroup)

  test(`controlled component: initial value set by radio group when prop provided`, () => {
    expect(controlledRadioGroup.firstChild.checked).toBe(true);
    expect(controlledRadioGroup.firstChild.getAttribute('aria-checked')).toBe(
      'true',
    );
  });

  test('onChange fires once when the label is clicked', () => {
      console.log(controlledRadioGroup)
      expect(controlledOnChange.mock.calls.length).toBe(1)
  })
});
