import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { ChartInstance } from '../Chart/hooks/useChart.types';

import { ChartContext, ChartProvider, useChartContext } from './ChartContext';

const mockChartInstance: ChartInstance = {
  id: 'test-chart',
  ref: jest.fn(),
  enableGroupTooltipSync: false,
  state: undefined,
  isChartHovered: false,
  setTooltipMounted: jest.fn(),
  tooltipPinned: false,
  // EChartsInstance methods
  _getEChartsInstance: jest.fn(),
  _getOptions: jest.fn(),
  addSeries: jest.fn(),
  addToGroup: jest.fn(),
  enableZoom: jest.fn(),
  error: null,
  hideTooltip: jest.fn(),
  off: jest.fn(),
  on: jest.fn(),
  ready: true,
  removeFromGroup: jest.fn(),
  removeSeries: jest.fn(),
  resize: jest.fn(),
  setupZoomSelect: jest.fn(),
  showTooltip: jest.fn(),
  updateOptions: jest.fn(),
};

const ChartProviderMock = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ChartContext.Provider value={{ chart: mockChartInstance }}>
      {children}
    </ChartContext.Provider>
  );
};

describe('lg-chart/core/ChartContext', () => {
  describe('ChartProvider', () => {
    test('renders children', async () => {
      const { getByTestId } = render(
        <ChartProvider chart={mockChartInstance}>
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
      const { chart } = result.current;
      expect(chart).toBe(mockChartInstance);
      expect(chart.id).toBe('test-chart');
      expect(chart.enableGroupTooltipSync).toBe(false);
    });
  });
});
