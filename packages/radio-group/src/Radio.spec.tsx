import React from 'react';
import { render } from '@testing-library/react';
import Radio from './Radio';

const className = 'radio-test-class';

function renderRadio(props = {}) {
  const utils = render(
    <Radio {...props} data-testid="radio-test-id" value="option-1" />,
  );
  const radio = utils.getByTestId('radio-test-id');
  return { ...utils, radio };
}

describe('packages/radio', () => {
  test(`renders "${className}" in the labels's class list`, () => {
    const { radio } = renderRadio({ className });
    const label = radio.parentElement;
    expect(label).not.toBeNull();
    expect(label!.classList.contains(className)).toBe(true);
  });

  test(`renders disabled radio when disabled prop is set`, () => {
    const { radio } = renderRadio({ disabled: true });

    expect((radio as HTMLInputElement).disabled).toBe(true);
    expect(radio.getAttribute('aria-disabled')).toBe('true');
  });

  test(`radio is checked when value is set`, () => {
    const { radio } = renderRadio({ checked: true });

    expect((radio as HTMLInputElement).checked).toBe(true);
    expect(radio.getAttribute('aria-checked')).toBe('true');
  });
});
