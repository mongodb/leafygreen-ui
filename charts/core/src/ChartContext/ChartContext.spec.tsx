import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { ChartContext, ChartProvider, useChartContext } from './ChartContext';

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

describe('lg-chart/core/ChartContext', () => {
  describe('ChartProvider', () => {
    test('renders children', async () => {
      const { getByTestId } = render(
        <ChartProvider
          chartOptions={{}}
          updateChartOptions={() => {}}
          addChartSeries={() => {}}
          removeChartSeries={() => {}}
        >
          <div data-testid="div" />
        </ChartProvider>,
      );

      const div = getByTestId('div');
      expect(div).toBeInTheDocument();
    });
  });

  describe('useChartContext', () => {
    test('renders correct props when within provider', () => {
      const { result } = renderHook(useChartContext, {
        wrapper: ChartProviderMock,
      });
      const { chartOptions, updateChartOptions, addChartSeries } =
        result.current;
      expect(chartOptions).toBe(chartOptions);
      expect(updateChartOptions).toBe(updateChartOptions);
      expect(addChartSeries).toBe(addChartSeries);
    });
  });
});
