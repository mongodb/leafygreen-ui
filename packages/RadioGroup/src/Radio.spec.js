import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Radio from './Radio';

afterAll(cleanup);

describe('packages/Radio', () => {
  const className = 'radio-test-class';
  const { container } = render(
    <Radio disabled value="option-1" className={className}>
      Radio 1
    </Radio>,
  );

  const radio = container.firstChild;
  const input = radio.firstChild;

  test(`renders "${className}" in the labels's class list`, () => {
    expect(radio.classList.contains(className)).toBe(true);
  });

  test(`renders disabled radio when disabled prop is set`, () => {
    expect(input.disabled).toBe(true);
    expect(input.getAttribute('aria-disabled')).toBe('true');
  });

  test(`radio is checked when value is set`, () => {
    render(
      <Radio value="option-two" checked={true}>
        Radio 2
      </Radio>,
      { container },
    );

    expect(input.checked).toBe(true);
    expect(input.getAttribute('aria-checked')).toBe('true');
  });
});
