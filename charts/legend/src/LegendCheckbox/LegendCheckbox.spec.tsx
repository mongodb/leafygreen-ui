import React, { createRef } from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { getTestUtils } from '@leafygreen-ui/checkbox';

import { LegendCheckbox } from './LegendCheckbox';

const renderLegendCheckbox = (props = {}) => {
  const renderUtils = render(<LegendCheckbox label="Test Label" {...props} />);
  const testUtils = getTestUtils();

  const checkbox = testUtils.getInput();
  const label = testUtils.getLabel();

  return { ...renderUtils, ...testUtils, checkbox, label };
};

describe('charts/legend/LegendCheckbox', () => {
  describe('a11y', () => {
    test('does not have basic accessibility violations', async () => {
      const { container, checkbox } = renderLegendCheckbox();
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

  test('renders as expected', () => {
    const { checkbox, label, getInputValue } = renderLegendCheckbox();
    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(getInputValue()).toBeFalsy();
  });

  test('accepts a ref', () => {
    const ref = createRef<HTMLInputElement>();
    renderLegendCheckbox({ ref });
    render(<LegendCheckbox label="Test Label" ref={ref} />);

    expect(ref.current).toBeDefined();
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
