import React from 'react';
import { act,fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import Toggle from '..';

const className = 'test-className';

function renderToggle(props = {}) {
  const utils = render(
    <>
      <label id="label" htmlFor="toggle">
        test
      </label>
      <Toggle
        aria-labelledby="label"
        id="toggle"
        data-testid="toggle-test-id"
        {...props}
      />
    </>,
  );
  const toggle = utils.getByRole('switch') as HTMLButtonElement;

  return { ...utils, toggle };
}

describe('packages/Toggle', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderToggle();

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      let newResults = null as any;
      act(() => void fireEvent.click(screen.getByRole('switch')));
      await act(async () => {
        newResults = await axe(container);
      });
      expect(newResults).toHaveNoViolations();
    });
  });

  test('toggle is not checked by default', () => {
    const { toggle } = renderToggle();
    expect(toggle.getAttribute('aria-checked')).toBe('false');
  });

  test('toggle is checked when checked prop is set', () => {
    const { toggle } = renderToggle({ checked: true });

    expect(toggle.getAttribute('aria-checked')).toBe('true');
  });

  test('toggle is disabled when disabled prop is set', () => {
    const { toggle } = renderToggle({ disabled: true });

    expect(toggle.disabled).toBe(true);
    expect(toggle.getAttribute('aria-disabled')).toBe('true');
  });

  test(`renders "${className}" in the component's markup`, () => {
    const { toggle } = renderToggle({
      className,
    });

    expect(toggle.closest(`.${className}`)).toBeVisible();
  });

  describe('when controlled', () => {
    const controlledOnClick = jest.fn();
    const controlledOnChange = jest.fn();

    test('onClick fires once when the toggle is clicked', () => {
      const { toggle } = renderToggle({
        checked: false,
        onClick: controlledOnClick,
      });

      fireEvent.click(toggle);
      expect(controlledOnClick.mock.calls.length).toBe(1);
    });

    test('onChange fires once when the toggle is clicked', () => {
      const { toggle } = renderToggle({
        checked: false,
        onChange: controlledOnChange,
      });

      fireEvent.click(toggle);
      expect(controlledOnChange.mock.calls.length).toBe(1);
    });

    test('checkbox does not become checked when clicked', () => {
      const { toggle } = renderToggle({ checked: false });

      fireEvent.click(toggle);
      expect(toggle.getAttribute('aria-checked')).toBe('false');
    });
  });

  describe('when uncontrolled', () => {
    const uncontrolledOnClick = jest.fn();
    const uncontrolledOnChange = jest.fn();

    test('onClick fires once when the toggle is clicked', () => {
      const { toggle } = renderToggle({ onClick: uncontrolledOnClick });

      fireEvent.click(toggle);
      expect(uncontrolledOnClick.mock.calls.length).toBe(1);
    });

    test('onChange fires once when the toggle is clicked', () => {
      const { toggle } = renderToggle({ onChange: uncontrolledOnChange });

      fireEvent.click(toggle);
      expect(uncontrolledOnChange.mock.calls.length).toBe(1);
    });

    test('checkbox becomes checked when clicked', () => {
      const { toggle } = renderToggle();

      fireEvent.click(toggle);
      expect(toggle.getAttribute('aria-checked')).toBe('true');
    });
  });
});
