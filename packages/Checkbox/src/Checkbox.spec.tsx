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

  function isElement(el: Node | null): el is HTMLElement {
    return el != null && el.nodeType === Node.ELEMENT_NODE;
  }

  function isInput(el: Node | null): el is HTMLInputElement {
    return isElement(el) && el.tagName.toLowerCase() === 'input';
  }

  if (!isElement(controlledContainer)) {
    throw new Error('Could not find controlled container component');
  }

  const controlledCheckbox = controlledContainer.children[0];

  if (!isInput(controlledCheckbox)) {
    throw new Error('Could not find checkbox input element');
  }

  test(`renders "${className}" in the Checkbox label's classList`, () => {
    expect(controlledContainer.classList.contains(className)).toBe(true);
  });

  test('Checkbox is checked when checked prop is set', () => {
    expect(controlledCheckbox.checked).toBe(false);
    expect(controlledCheckbox.getAttribute('aria-checked')).toBe('false');

    render(<Checkbox checked={true} />, { container });

    expect(controlledCheckbox.checked).toBe(true);
    expect(controlledCheckbox.getAttribute('aria-checked')).toBe('true');
  });

  test('Checkbox is disabled when disabled prop is set', () => {
    render(<Checkbox disabled={true} checked={false} />, { container });

    expect(controlledCheckbox.disabled).toBe(true);
    expect(controlledCheckbox.getAttribute('aria-disabled')).toBe('true');
  });

  // Test controlled checkbox events and checked state
  describe('when controlled', () => {
    const controlledOnClick = jest.fn();
    const controlledOnChange = jest.fn();
    render(
      <Checkbox
        className={className}
        onClick={controlledOnClick}
        onChange={controlledOnChange}
        checked={false}
      />,
      { container },
    );
    fireEvent.click(controlledContainer);

    test('onClick fires once when the label is clicked', () => {
      expect(controlledOnClick.mock.calls.length).toBe(1);
    });

    test('onChange fires once when the label is clicked', () => {
      expect(controlledOnChange.mock.calls.length).toBe(1);
    });

    test('checkbox does not become checked when clicked', () => {
      expect(controlledCheckbox.checked).toBe(false);
    });
  });

  describe('when uncontrolled', () => {
    const uncontrolledOnClick = jest.fn();
    const uncontrolledOnChange = jest.fn();
    const uncontrolledContainer = render(
      <Checkbox
        onClick={uncontrolledOnClick}
        onChange={uncontrolledOnChange}
      />,
    ).container.firstChild;

    if (!isElement(uncontrolledContainer)) {
      throw new Error('Could not find uncontrolled container component');
    }

    const uncontrolledCheckbox = uncontrolledContainer.children[0];

    if (!isInput(uncontrolledCheckbox)) {
      throw new Error('Could not find checkbox input element');
    }

    fireEvent.click(uncontrolledCheckbox);

    test('onClick fires once when the label is clicked', () => {
      expect(uncontrolledOnClick.mock.calls.length).toBe(1);
    });

    test('onChange fires once when the label is clicked', () => {
      expect(uncontrolledOnChange.mock.calls.length).toBe(1);
    });

    test('checkbox becomes checked when clicked', () => {
      expect(uncontrolledCheckbox.checked).toBe(true);
    });
  });
});
