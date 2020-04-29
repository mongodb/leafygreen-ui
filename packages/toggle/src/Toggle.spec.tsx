import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Toggle from '.';

const className = 'test-toggle-class';

function renderToggle(props = {}) {
  const utils = render(<Toggle data-testid="toggle-test-id" {...props} />);
  const toggle = utils.getByTestId('toggle-test-id');
  const label = utils.container.querySelector('label');
  return { ...utils, toggle, label };
}

describe('packages/Toggle', () => {
  test(`renders "${className}" in the container label's classList`, () => {
    const { label } = renderToggle({ className });
    expect(label?.classList.contains(className)).toBe(true);
  });

  test('toggle is not checked by default', () => {
    const { toggle } = renderToggle();
    expect((toggle as HTMLInputElement).checked).toBe(false);
    expect(toggle.getAttribute('aria-checked')).toBe('false');
  });

  test('toggle is checked when checked prop is set', () => {
    const { toggle } = renderToggle({ checked: true });
    expect((toggle as HTMLInputElement).checked).toBe(true);
    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });

  test('toggle is disabled when disabled prop is set', () => {
    const { toggle } = renderToggle({ disabled: true });
    expect((toggle as HTMLInputElement).disabled).toBe(true);
    expect(toggle.getAttribute('aria-disabled')).toBe('true');
  });

  describe('when controlled', () => {
    const controlledOnClick = jest.fn();
    const controlledOnChange = jest.fn();

    test('onClick fires once when the label is clicked', () => {
      const { label } = renderToggle({
        checked: false,
        onClick: controlledOnClick,
      });
      fireEvent.click(label!);
      expect(controlledOnClick.mock.calls.length).toBe(1);
    });

    test('onChange fires once when the label is clicked', () => {
      const { label } = renderToggle({
        checked: false,
        onChange: controlledOnChange,
      });
      fireEvent.click(label!);
      expect(controlledOnChange.mock.calls.length).toBe(1);
    });

    test('checkbox does not become checked when clicked', () => {
      const { label, toggle } = renderToggle({ checked: false });
      fireEvent.click(label!);
      expect((toggle as HTMLInputElement).checked).toBe(false);
    });
  });

  describe('when uncontrolled', () => {
    const uncontrolledOnClick = jest.fn();
    const uncontrolledOnChange = jest.fn();

    test('onClick fires once when the label is clicked', () => {
      const { label } = renderToggle({ onClick: uncontrolledOnClick });
      fireEvent.click(label!);
      expect(uncontrolledOnClick.mock.calls.length).toBe(1);
    });

    test('onChange fires once when the label is clicked', () => {
      const { label } = renderToggle({ onChange: uncontrolledOnChange });
      fireEvent.click(label!);
      expect(uncontrolledOnChange.mock.calls.length).toBe(1);
    });

    test('checkbox becomes checked when clicked', () => {
      const { label, toggle } = renderToggle();
      fireEvent.click(label!);
      expect((toggle as HTMLInputElement).checked).toBe(true);
    });
  });
});
