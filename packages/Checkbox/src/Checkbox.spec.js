import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Checkbox from '.';

afterAll(cleanup);

describe('packages/Checkbox', () => {
  const onClick = jest.fn();
  const className = 'test-checkbox-class';
  const { container } = render(
    <Checkbox className={className} checked={false} />,
  );
  const renderedContainer = container.firstChild;
  const renderedCheckbox = renderedContainer.children[0];

  test(`renders "${className}" in the Checkbox label's classList`, () => {
    expect(renderedContainer.classList.contains(className)).toBe(true);
  });

  test('Checkbox is checked when checked prop is set', () => {
    render(<Checkbox className={className} checked={true} />, { container });
    expect(renderedCheckbox.checked).toBe(true);
    expect(renderedCheckbox.getAttribute('aria-checked')).toBe('true');
  });

  test('Checkbox is disabled when disabled prop is set', () => {
    render(<Checkbox className={className} disabled={true} />, { container });
    expect(renderedCheckbox.disabled).toBe(true);
    expect(renderedCheckbox.getAttribute('aria-disabled')).toBe('true');
  });

  test('onClick fires once when the label is clicked', () => {
    render(<Checkbox className={className} onClick={onClick} />, { container });
    fireEvent.click(renderedContainer);
    expect(onClick.mock.calls.length).toBe(1);
  });
});
