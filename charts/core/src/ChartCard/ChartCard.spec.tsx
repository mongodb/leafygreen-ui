import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { ChartCard } from './ChartCard';
import { ChartCardProps } from './ChartCard.types';

const defaultContentText = 'shenanigans';

const defaultProps = {
  title: 'test',
  headerContent: <div>{defaultContentText}</div>,
  children: 'Chartchartchartchartchart',
};

const renderChartCard = (props?: Partial<ChartCardProps>) =>
  render(<ChartCard {...defaultProps} {...props} />);

const clickToggleButton = () => {
  userEvent.click(screen.getByLabelText('Toggle button'));
};

describe('@lg-charts/core/src/ChartCard/ChartCard', () => {
  test('does not have basic accessibility issues', async () => {
    const { container } = renderChartCard();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should display title value', () => {
    renderChartCard();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  test('render component passed to headerContent', () => {
    renderChartCard();
    expect(screen.getByText(defaultContentText)).toBeInTheDocument();
  });

  test('should call onToggleButtonClick when button is clicked', () => {
    const onToggleButtonClick = jest.fn();
    renderChartCard({ onToggleButtonClick });
    clickToggleButton();
    expect(onToggleButtonClick).toHaveBeenCalledTimes(1);
  });

  test('content is visible by default', () => {
    renderChartCard();
    expect(screen.getByText(defaultProps.children)).toBeVisible();
  });

  test('content is not visible to accessible devices after click', () => {
    renderChartCard();
    clickToggleButton();
    expect(
      screen.getByTestId('lg-charts-core-chart_card-children'),
    ).toHaveAttribute('aria-hidden', 'true');
  });
});
