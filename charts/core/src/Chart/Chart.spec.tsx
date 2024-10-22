import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { ChartProvider } from '../ChartContext';

import { Chart } from './Chart';

jest.mock('../ChartContext', () => ({
  ChartProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('./hooks/useChart', () => ({
  useChart: jest.fn(() => ({
    chartOptions: {},
    updateChartOptions: jest.fn(),
    addSeries: jest.fn(),
    removeSeries: jest.fn(),
  })),
}));

jest.mock('@leafygreen-ui/leafygreen-provider', () => ({
  useDarkMode: jest.fn(() => ({ theme: 'light' })),
}));

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
        addSeries: expect.any(Function),
        removeSeries: expect.any(Function),
      }),
      expect.anything(),
    );
  });
});
