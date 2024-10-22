import React, { PropsWithChildren } from 'react';
import { waitFor } from '@testing-library/react';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { ChartContext } from '../ChartContext';

import { useChartContext } from '.';

const chartOptions = {};
const updateChartOptions = jest.fn();
const addChartSeries = jest.fn();

const ChartProviderMock = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ChartContext.Provider
      value={{ chartOptions, updateChartOptions, addChartSeries }}
    >
      {children}
    </ChartContext.Provider>
  );
};

describe('lg-chart/core/ChartContext/useChartContext', () => {
  test('renders correct props when within provider', () => {
    const { result } = renderHook(useChartContext, {
      wrapper: ChartProviderMock,
    });
    const { chartOptions, updateChartOptions, addChartSeries } = result.current;
    expect(chartOptions).toBe(chartOptions);
    expect(updateChartOptions).toBe(updateChartOptions);
    expect(addChartSeries).toBe(addChartSeries);
  });

  test('throws error when not within provider', async () => {
    await waitFor(() => {
      expect(() => renderHook(useChartContext)).toThrow(
        'useChartContext must be used within a ChartProvider',
      );
    });
  });
});
