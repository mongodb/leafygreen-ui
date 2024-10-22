import { renderHook } from '@leafygreen-ui/testing-lib';

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

  test.todo('should properly update state on addChartSeries call');

  test.todo('should properly update chartInstanceRef on addChartSeries call');

  test.todo('should properly update state on removeChartSeries call');

  test.todo(
    'should properly update chartInstanceRef on removeChartSeries call',
  );

  test.todo('should properly update state on updateChartOptions call');

  test.todo(
    'should properly update chartInstanceRef on updateChartOptions call',
  );
});
