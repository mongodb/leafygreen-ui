import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ChartHeader } from './ChartHeader';

const defaultIconTestId = 'title-icon';
const defaultContentTestId = 'header-content';

const defaultProps = {
  title: 'test',
  titleIcon: <span data-testid={defaultIconTestId}>Icon</span>,
  headerContent: <div data-testid={defaultContentTestId}></div>,
};

const renderChartHeader = () => render(<ChartHeader {...defaultProps} />);

describe('@lg-charts/core/src/ChartHeader/ChartHeader', () => {
  test('does not have basic accessibility issues', async () => {
    const { container } = renderChartHeader();
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  test('should display title value', () => {
    renderChartHeader();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  test('render component passed to titleIcon', () => {
    renderChartHeader();
    expect(screen.getByTestId(defaultIconTestId)).toBeInTheDocument();
  });

  test('render component passed to headerContent', () => {
    renderChartHeader();
    expect(screen.getByTestId(defaultContentTestId)).toBeInTheDocument();
  });
});
