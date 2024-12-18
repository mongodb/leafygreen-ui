import { act } from 'react-dom/test-utils';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { type SeriesOption } from '../Chart';

import { useEchart } from './useEchart';

// Mock echarts instance creation with all required methods
const mockEchartsInstance = {
  setOption: jest.fn(),
  dispose: jest.fn(),
  resize: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  dispatchAction: jest.fn(),
  group: null,
};

// Mock implementations
jest.mock('echarts/core', () => ({
  init: jest.fn(() => mockEchartsInstance),
  use: jest.fn(),
  connect: jest.fn(),
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
  DataZoomComponent: jest.fn(),
  DataZoomInsideComponent: jest.fn(),
}));

jest.mock('echarts/renderers', () => ({
  CanvasRenderer: jest.fn(),
}));

// Helper function to wait for hook initialization and state updates
const setupHook = async () => {
  const mockContainer = document.createElement('div');
  let result: ReturnType<
    typeof renderHook<ReturnType<typeof useEchart>, void>
  >['result'];

  await act(async () => {
    const hookResult = renderHook(() =>
      useEchart({ theme: 'dark', container: mockContainer }),
    );
    result = hookResult.result;
    // Wait for all state updates to complete
    await Promise.resolve();
  });

  return { result: result! };
};

describe('@lg-echarts/core/hooks/useChart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return a chart instance with the correct properties', async () => {
    const { result } = await setupHook();

    expect(result.current).toHaveProperty('_echartsInstance');
    expect(result.current).toHaveProperty('ready');
    expect(result.current).toHaveProperty('options');
    expect(result.current).toHaveProperty('updateOptions');
    expect(result.current).toHaveProperty('on');
    expect(result.current).toHaveProperty('off');
    expect(result.current).toHaveProperty('addSeries');
    expect(result.current).toHaveProperty('removeSeries');
    expect(result.current).toHaveProperty('addToGroup');
    expect(result.current).toHaveProperty('removeFromGroup');
    expect(result.current).toHaveProperty('setupZoomSelect');
    expect(result.current).toHaveProperty('error');
  });

  test('should properly update state on addSeries call', async () => {
    const { result } = await setupHook();

    const newSeries: SeriesOption = {
      name: 'test-series',
      data: [[1, 2]],
      type: 'line',
    };

    await act(async () => {
      result.current.addSeries(newSeries);
      await Promise.resolve();
    });

    expect(result.current.options.series).toContainEqual(
      expect.objectContaining(newSeries),
    );
  });

  test('should properly update state on removeSeries call', async () => {
    const { result } = await setupHook();

    const series: SeriesOption = {
      name: 'test-series',
      data: [[1, 2]],
      type: 'line',
    };

    await act(async () => {
      result.current.addSeries(series);
      result.current.removeSeries('test-series');
      await Promise.resolve();
    });

    expect(result.current.options.series).not.toContainEqual(
      expect.objectContaining(series),
    );
  });

  test('should properly update state on updateChartOptions call', async () => {
    const { result } = await setupHook();

    const newOptions = {
      grid: { top: 100 },
    };

    await act(async () => {
      result.current.updateOptions(newOptions);
      await Promise.resolve();
    });

    expect(result.current.options.grid).toEqual(
      expect.objectContaining(newOptions.grid),
    );
  });

  test('should add event handler on call of `on`', async () => {
    const { result } = await setupHook();

    const mockCallback = jest.fn();

    await act(async () => {
      result.current.on('click', mockCallback);
      await Promise.resolve();
    });

    expect(result.current._echartsInstance.on).toHaveBeenCalledWith(
      'click',
      mockCallback,
    );
  });

  test('should remove event handler on call of `off`', async () => {
    const { result } = await setupHook();

    const mockCallback = jest.fn();

    await act(async () => {
      result.current.off('click', mockCallback);
      await Promise.resolve();
    });

    expect(result.current._echartsInstance.off).toHaveBeenCalledWith(
      'click',
      mockCallback,
    );
  });

  test('should add chart to group and connect group on call to `addToGroup`', async () => {
    const { result } = await setupHook();

    await act(async () => {
      result.current.addToGroup('test-group');
      await Promise.resolve();
    });

    expect(result.current._echartsInstance.group).toBe('test-group');
  });

  test('should remove chart from group on call to `removeFromGroup`', async () => {
    const { result } = await setupHook();

    await act(async () => {
      result.current.addToGroup('test-group');
      result.current.removeFromGroup();
      await Promise.resolve();
    });

    expect(result.current._echartsInstance.group).toBeNull();
  });

  test('should setup zoom select on call to `setupZoomSelect`', async () => {
    const { result } = await setupHook();

    // Store the 'rendered' event handler when it's registered
    let renderedHandler: () => void;
    mockEchartsInstance.on.mockImplementation(
      (event: string, handler: () => void) => {
        if (event === 'rendered') {
          renderedHandler = handler;
        }
      },
    );

    await act(async () => {
      result.current.setupZoomSelect({ xAxis: true, yAxis: false });
      await Promise.resolve();
    });

    // Trigger the 'rendered' event handler
    await act(async () => {
      renderedHandler();
      await Promise.resolve();
    });

    expect(result.current._echartsInstance.dispatchAction).toHaveBeenCalledWith(
      {
        type: 'takeGlobalCursor',
        key: 'dataZoomSelect',
        dataZoomSelectActive: true,
      },
    );
  });

  test('should set `ready` to true when chart instance is available', async () => {
    const { result } = await setupHook();
    expect(result.current.ready).toBe(true);
  });
});
