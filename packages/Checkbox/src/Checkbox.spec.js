import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Checkbox from '.';

afterAll(cleanup);

describe('packages/Checkbox', () => {
  const className = 'test-checkbox-class';
  const { container } = render(
    <Checkbox className={className} checked={false} />,
  );
  const controlledContainer = container.firstChild;
  const controlledCheckbox = controlledContainer.children[0];

  // General DOM rendering tests
  test(`renders "${className}" in the Checkbox label's classList`, () => {
    expect(controlledContainer.classList.contains(className)).toBe(true);
  });

  test('Checkbox is checked when checked prop is set', () => {
    expect(controlledCheckbox.checked).toBe(false);
    
    render(<Checkbox className={className} checked={true} />, { container });
    
    expect(controlledCheckbox.checked).toBe(true);
    expect(controlledCheckbox.getAttribute('aria-checked')).toBe('true');
  });

  test('Checkbox is disabled when disabled prop is set', () => {
    render(<Checkbox className={className} disabled={true} checked={false} />, { container });

    expect(controlledCheckbox.disabled).toBe(true);
    expect(controlledCheckbox.getAttribute('aria-disabled')).toBe('true');
  });
  
  // Test controlled checkbox events and checked state
  const controlledOnClick = jest.fn();
  const controlledOnChange = jest.fn();
  render(<Checkbox className={className} onClick={controlledOnClick} onChange={controlledOnChange} checked={false} />, { container });
  fireEvent.click(controlledContainer);

  test('when controlled, onClick fires once when the label is clicked', () => {
    expect(controlledOnClick.mock.calls.length).toBe(1);
  });

  test('when controlled, onChange fires once when the label is clicked', () => {
    expect(controlledOnChange.mock.calls.length).toBe(1);
  });

  test('when controlled, checkbox does not become checked when clicked', () => {
    expect(controlledCheckbox.checked).toBe(false);
  })

  // Test uncontrolled checkbox events and checked state
  const uncontrolledOnClick = jest.fn();
  const uncontrolledOnChange = jest.fn();
  const uncontrolledContainer = render(<Checkbox onClick={uncontrolledOnClick} onChange={uncontrolledOnChange} />).container.firstChild
  const uncontrolledCheckbox = uncontrolledContainer.children[0];

  fireEvent.click(uncontrolledContainer.firstChild);

  test('when uncontrolled, onClick fires once when the label is clicked', () => {
    expect(uncontrolledOnClick.mock.calls.length).toBe(1);
  });

  test('when uncontrolled, onChange fires once when the label is clicked', () => {
    expect(uncontrolledOnChange.mock.calls.length).toBe(1);
  });

  test('when uncontrolled, checkbox becomes checked when clicked', () => {
    expect(uncontrolledCheckbox.checked).toBe(true);
  })
});
