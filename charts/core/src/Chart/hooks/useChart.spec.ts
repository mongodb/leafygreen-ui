import { act } from 'react-dom/test-utils';

import { renderHook, waitForState } from '@leafygreen-ui/testing-lib';

import { SeriesOption } from '../Chart.types';

import { useChart } from './useChart';

jest.mock('echarts/core', () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    dispose: jest.fn(),
    resize: jest.fn(),
  })),
  use: jest.fn(),
}));

jest.mock('echarts/charts', () => ({
  LineChart: jest.fn(),
}));

jest.mock('echarts/components', () => ({
  TitleComponent: jest.fn(),
  TooltipComponent: jest.fn(),
  GridComponent: jest.fn(),
  LegendComponent: jest.fn(),
  ToolboxComponent: jest.fn(),
}));

jest.mock('echarts/renderers', () => ({
  CanvasRenderer: jest.fn(),
}));

describe('@lg-echarts/core/hooks/useChart', () => {
  test('should return an object with the correct properties', () => {
    const { result } = renderHook(() => useChart({}));
    expect(result.current).toEqual(
      expect.objectContaining({
        chartRef: expect.any(Object),
        chartInstanceRef: expect.any(Object),
        chartOptions: expect.any(Object),
        addChartSeries: expect.any(Function),
        removeChartSeries: expect.any(Function),
        updateChartOptions: expect.any(Function),
      }),
    );
  });

  test('should properly update state on addChartSeries call', async () => {
    const { result } = renderHook(() => useChart({}));
    const series: SeriesOption = {
      name: 'test',
      data: [1, 2, 3],
    };
    act(() => {
      result.current.addChartSeries(series);
    });
    await waitForState(() => {
      expect(result.current.chartOptions.series).toEqual([series]);
    });
  });

  test('should properly update state on removeChartSeries call', async () => {
    const { result } = renderHook(() => useChart({}));
    const series: SeriesOption = {
      name: 'test',
      data: [1, 2, 3],
    };
    act(() => {
      result.current.addChartSeries(series);
    });
    act(() => {
      result.current.removeChartSeries('test');
    });
    await waitForState(() => {
      expect(result.current.chartOptions.series).toEqual([]);
    });
  });

  test('should properly update state on updateChartOptions call', async () => {
    const { result } = renderHook(() => useChart({}));
    const options = {
      title: {
        text: 'test',
      },
    };
    act(() => {
      result.current.updateChartOptions(options);
    });
    await waitForState(() => {
      expect(result.current.chartOptions.title).toEqual(options.title);
    });
  });
});
