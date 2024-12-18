import React from 'react';
import { render, screen } from '@testing-library/react';

import { ChartProvider } from '../ChartContext';

import { Chart } from './Chart';
import { useChart } from './hooks';

jest.mock('../ChartContext', () => ({
  ChartProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

const mockChartInstance = {
  chartOptions: {},
  updateChartOptions: jest.fn(),
  addChartSeries: jest.fn(),
  removeChartSeries: jest.fn(),
};

jest.mock('./hooks', () => ({
  useChart: jest.fn(() => mockChartInstance),
}));

/**
 * Tests Echarts wrapper component is rendered with the correct props. Visual changes
 * occur on the canvas element, so we can't test those with Jest. Will instead rely on
 * Chromatic tests for rendering logic.
 */
describe('lg-charts/core/Chart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the echart container', () => {
    render(<Chart />);
    expect(
      screen.getByTestId('lg-charts-core-chart-echart'),
    ).toBeInTheDocument();
  });

  test('passes the chart instance to ChartProvider', () => {
    render(<Chart />);

    // Verify useChart was called
    expect(useChart).toHaveBeenCalled();

    // Verify ChartProvider was called with the correct chart instance
    expect(ChartProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        chart: mockChartInstance,
      }),
      expect.any(Object),
    );
  });
});
