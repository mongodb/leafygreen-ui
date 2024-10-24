import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { ChartProvider } from '../ChartContext';

import { Chart } from './Chart';

jest.mock('../ChartContext', () => ({
  ChartProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('./hooks', () => ({
  useChart: jest.fn(() => ({
    chartOptions: {},
    updateChartOptions: jest.fn(),
    addChartSeries: jest.fn(),
    removeChartSeries: jest.fn(),
  })),
}));

jest.mock('@leafygreen-ui/leafygreen-provider', () => ({
  useDarkMode: jest.fn(() => ({ theme: 'light' })),
}));

/**
 * Tests Echarts wrapper component is rendered with the correct props. Visual changes
 * occur on the canvas element, so we can't test those with Jest. Will instead rely on
 * Chromatic tests for rendering logic.
 */
describe('lg-charts/core/Chart', () => {
  it('renders the echart container', () => {
    render(<Chart />);
    expect(screen.getByTestId('echart')).toBeInTheDocument();
  });

  it('passes the correct props to ChartProvider', () => {
    render(<Chart />);
    expect(ChartProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        chartOptions: {},
        updateChartOptions: expect.any(Function),
        addChartSeries: expect.any(Function),
        removeChartSeries: expect.any(Function),
      }),
      expect.anything(),
    );
  });
});
