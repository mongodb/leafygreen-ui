import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';

import { ChartInstance } from '../Chart/hooks/useChart.types';
import { ChartContext } from '../ChartContext/ChartContext';

import { XAxis } from './XAxis';

const createMockChartInstance = (
  overrides: Partial<ChartInstance> = {},
): ChartInstance => ({
  id: 'test-chart',
  ref: jest.fn(),
  state: undefined,
  isChartHovered: false,
  setTooltipMounted: jest.fn(),
  tooltipPinned: false,
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
  ...overrides,
});

const createWrapper = (chartInstance: ChartInstance) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>) => (
    <ChartContext.Provider value={{ chart: chartInstance }}>
      {children}
    </ChartContext.Provider>
  );
  Wrapper.displayName = 'ChartContextWrapper';
  return Wrapper;
};

const getAxisLabelOptions = (mockChart: ChartInstance) =>
  (mockChart.updateOptions as jest.Mock).mock.calls[0][0].xAxis.axisLabel;

describe('@lg-charts/core/XAxis', () => {
  test('centers every label by default', () => {
    const mockChart = createMockChartInstance();

    render(<XAxis type="time" />, { wrapper: createWrapper(mockChart) });

    expect(getAxisLabelOptions(mockChart)).toMatchObject({ align: 'center' });
    expect(getAxisLabelOptions(mockChart)).not.toHaveProperty('alignMaxLabel');
  });

  test('aligns and always shows the edge labels when alignEdgeLabels is set', () => {
    const mockChart = createMockChartInstance();

    render(<XAxis type="time" alignEdgeLabels />, {
      wrapper: createWrapper(mockChart),
    });

    expect(getAxisLabelOptions(mockChart)).toMatchObject({
      align: 'center',
      alignMinLabel: 'left',
      alignMaxLabel: 'right',
      showMinLabel: true,
      showMaxLabel: true,
    });
  });
});
