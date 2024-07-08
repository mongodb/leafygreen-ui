import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { getTestUtils } from '../utils/getTestUtils';
import Checkbox from '..';

const className = 'test-classname';
const onChange = jest.fn();
const onClick = jest.fn();

function renderCheckbox(props = {}) {
  const renderUtils = render(
    <Checkbox data-testid="checkbox" label="this is the label" {...props} />,
  );
  const utils = getTestUtils();
  const wrapper = renderUtils.container.firstElementChild;
  const checkbox = utils.getInput();
  const label = utils.getLabel();
  return { ...renderUtils, ...utils, wrapper, checkbox, label };
}

describe('packages/checkbox', () => {
  describe('a11y', () => {
    test('does not have basic accessibility violations', async () => {
      const { container, checkbox } = renderCheckbox();
      const results = await axe(container);
      expect(results).toHaveNoViolations();

      let newResults = null as any;
      act(() => void fireEvent.click(checkbox));
      await act(async () => {
        newResults = await axe(container);
      });
      expect(newResults).toHaveNoViolations();
    });
  });

  test('uses the aria-label prop when supplied', () => {
    const { checkbox } = renderCheckbox({ 'aria-label': 'test string' });
    expect(checkbox.getAttribute('aria-label')).toBe('test string');
  });

  test(`passes \`className\` through to checkbox parent`, () => {
    const { wrapper } = renderCheckbox({ className });
    expect(wrapper?.classList).toContain(className);
  });

  test('renders as unchecked by default', () => {
    const { checkbox, getInputValue } = renderCheckbox();
    expect(getInputValue()).toBe(false);
    expect(checkbox.getAttribute('aria-checked')).toBe('false');
  });

  test('renders as checked when the prop is set', () => {
    const { checkbox, getInputValue } = renderCheckbox({ checked: true });
    expect(getInputValue()).toBe(true);
    expect(checkbox.getAttribute('aria-checked')).toBe('true');
  });

  test('renders with aria-disabled attribute but not disabled attribute when disabled prop is set', () => {
    const { checkbox, isDisabled } = renderCheckbox({ disabled: true });
    expect(isDisabled).toBeTruthy();
    expect(checkbox.getAttribute('disabled')).toBeFalsy();
  });

  test('renders as indeterminate when the prop is set', () => {
    const { checkbox } = renderCheckbox({ indeterminate: true });
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed');
  });

  test('renders as indeterminate when prop is set and checkbox is true', () => {
    const { checkbox, getInputValue, rerender } = renderCheckbox({
      indeterminate: true,
      checked: true,
    });
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed');

    rerender(
      <Checkbox
        label="this is the label"
        checked={true}
        indeterminate={false}
      />,
    );
    expect(checkbox.getAttribute('aria-checked')).toBe('true');
    expect(getInputValue()).toBe(true);
  });

  describe('when controlled', () => {
    test('onClick fires once when the label is clicked', () => {
      const { label } = renderCheckbox({ onClick, checked: false });
      fireEvent.click(label!);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('onChange fires once when the label is clicked', () => {
      const { label } = renderCheckbox({ onChange, checked: false });
      fireEvent.click(label!);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('checkbox does not become checked when clicked', () => {
      const { checkbox, getInputValue } = renderCheckbox({ checked: false });
      fireEvent.click(checkbox);
      expect(getInputValue()).toBe(false);
    });
  });

  describe('when uncontrolled', () => {
    const uncontrolledOnClick = jest.fn();
    const uncontrolledOnChange = jest.fn();

    test('onClick fires once when the label is clicked', () => {
      const { label } = renderCheckbox({ onClick: uncontrolledOnClick });
      fireEvent.click(label!);
      expect(uncontrolledOnClick).toHaveBeenCalledTimes(1);
    });

    test('onChange fires once when the label is clicked', () => {
      const { label } = renderCheckbox({ onChange: uncontrolledOnChange });
      fireEvent.click(label!);
      expect(uncontrolledOnChange).toHaveBeenCalledTimes(1);
    });

    test('checkbox becomes checked when clicked', () => {
      const { checkbox, getInputValue } = renderCheckbox({});
      fireEvent.click(checkbox);
      expect(getInputValue()).toBe(true);
    });
  });
});
