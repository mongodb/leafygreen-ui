import React from 'react';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { getTestUtils } from '../utils';
import Toggle from '..';

const className = 'test-className';

function renderToggle(props = {}) {
  const renderUtils = render(
    <>
      <label id="label" htmlFor="toggle">
        test
      </label>
      <Toggle aria-labelledby="label" id="toggle" {...props} />
    </>,
  );

  const utils = getTestUtils();
  const toggle = utils.getInput();

  return { ...renderUtils, ...utils, toggle };
}

describe('packages/Toggle', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container, toggle } = renderToggle();

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      let newResults = null as any;
      userEvent.click(toggle);
      await act(async () => {
        newResults = await axe(container);
      });
      expect(newResults).toHaveNoViolations();
    });
  });

  test('toggle is not checked by default', () => {
    const { getInputValue } = renderToggle();
    expect(getInputValue()).toBe(false);
  });

  test('toggle is checked when checked prop is set', () => {
    const { getInputValue } = renderToggle({ checked: true });

    expect(getInputValue()).toBe(true);
  });

  test(`renders "${className}" in the component's markup`, () => {
    const { getInput } = renderToggle({
      className,
    });

    expect(getInput().closest(`.${className}`)).toBeVisible();
  });

  describe('disabled', () => {
    test('is true', () => {
      const { isDisabled } = renderToggle({ disabled: true });

      expect(isDisabled()).toBe(true);
    });

    test('is false', () => {
      const { isDisabled } = renderToggle();

      expect(isDisabled()).toBe(false);
    });
  });

  describe('when controlled', () => {
    const controlledOnClick = jest.fn();
    const controlledOnChange = jest.fn();

    test('onClick fires once when the toggle is clicked', () => {
      const { toggle } = renderToggle({
        checked: false,
        onClick: controlledOnClick,
      });

      userEvent.click(toggle);
      expect(controlledOnClick.mock.calls.length).toBe(1);
    });

    test('onChange fires once when the toggle is clicked', () => {
      const { toggle } = renderToggle({
        checked: false,
        onChange: controlledOnChange,
      });

      userEvent.click(toggle);
      expect(controlledOnChange.mock.calls.length).toBe(1);
    });

    test('checkbox does not become checked when clicked', () => {
      const { toggle, getInputValue } = renderToggle({ checked: false });

      userEvent.click(toggle);
      expect(getInputValue()).toBe(false);
    });
  });

  describe('when uncontrolled', () => {
    const uncontrolledOnClick = jest.fn();
    const uncontrolledOnChange = jest.fn();

    test('onClick fires once when the toggle is clicked', () => {
      const { toggle } = renderToggle({ onClick: uncontrolledOnClick });

      userEvent.click(toggle);
      expect(uncontrolledOnClick.mock.calls.length).toBe(1);
    });

    test('onChange fires once when the toggle is clicked', () => {
      const { toggle } = renderToggle({ onChange: uncontrolledOnChange });

      userEvent.click(toggle);
      expect(uncontrolledOnChange.mock.calls.length).toBe(1);
    });

    test('checkbox becomes checked when clicked', () => {
      const { toggle, getInputValue } = renderToggle();

      userEvent.click(toggle);
      expect(getInputValue()).toBe(true);
    });
  });
});
