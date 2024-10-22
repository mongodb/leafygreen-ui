import React, { PropsWithChildren } from 'react';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { ChartContext } from '../ChartContext';

import { useChartContext } from '.';

const chartOptions = {};
const updateChartOptions = jest.fn();
const addSeries = jest.fn();

const ChartProviderMock = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ChartContext.Provider
      value={{ chartOptions, updateChartOptions, addSeries }}
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

    const { chartOptions, updateChartOptions, addSeries } = result.current;

    expect(chartOptions).toBe(chartOptions);
    expect(updateChartOptions).toBe(updateChartOptions);
    expect(addSeries).toBe(addSeries);
  });

  test('throws error when not within provider', async () => {
    expect(() => renderHook(useChartContext)).toThrow(
      'useChartContext must be used within a ChartProvider',
    );
  });
});
