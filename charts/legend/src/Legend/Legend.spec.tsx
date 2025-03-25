import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Legend } from './Legend';

const renderLegend = (props = {}) => {
  const renderUtils = render(
    <Legend series={['Series 1', 'Series 2']} {...props} />,
  );

  const selectAllCheckbox = renderUtils.queryByText('Select All');
  const checkboxes = renderUtils.container.querySelectorAll(
    'input[type="checkbox"]',
  );

  return { ...renderUtils, selectAllCheckbox, checkboxes };
};

describe('charts/legend/Legend', () => {
  describe('a11y', () => {
    test('does not have basic accessibility violations', async () => {
      const { container } = renderLegend();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('renders as expected', () => {
    const { checkboxes } = renderLegend();

    expect(checkboxes.length).toBe(3);
    checkboxes.forEach(checkbox => expect(checkbox).toBeInTheDocument());
  });

  test('accepts a ref', () => {
    const ref = createRef<HTMLDivElement>();
    renderLegend({ ref });

    expect(ref.current).toBeDefined();
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  describe('showSelectAll prop', () => {
    test('renders the "Select All" checkbox when true', () => {
      const { selectAllCheckbox } = renderLegend({ showSelectAll: true });
      expect(selectAllCheckbox).toBeTruthy();
    });

    test('does not render the "Select All" checkbox when false', () => {
      const { selectAllCheckbox } = renderLegend({ showSelectAll: false });
      expect(selectAllCheckbox).toBeNull();
    });
  });
});
