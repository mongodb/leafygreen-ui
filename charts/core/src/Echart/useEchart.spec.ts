import { act } from 'react-dom/test-utils';

import { renderHook, RenderHookResult } from '@leafygreen-ui/testing-lib';

import { type SeriesOption } from '../Chart';

import { EChartsInstance } from './Echart.types';
import { useEchart } from './useEchart';

// Mock echarts instance creation with all required methods
const mockEchartsInstance = {
  dispatchAction: jest.fn(),
  dispose: jest.fn(),
  getDom: jest.fn(),
  getOption: jest.fn(),
  group: null,
  isDisposed: jest.fn(),
  off: jest.fn(),
  on: jest.fn(),
  resize: jest.fn(),
  setOption: jest.fn(),
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
  let result: RenderHookResult<any, EChartsInstance>['result'];

  await act(async () => {
    const hookResult = renderHook<any, EChartsInstance>(() =>
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

    expect(result.current).toHaveProperty('addSeries');
    expect(result.current).toHaveProperty('addToGroup');
    expect(result.current).toHaveProperty('enableZoom');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('hideTooltip');
    expect(result.current).toHaveProperty('off');
    expect(result.current).toHaveProperty('on');
    expect(result.current).toHaveProperty('ready');
    expect(result.current).toHaveProperty('removeFromGroup');
    expect(result.current).toHaveProperty('removeSeries');
    expect(result.current).toHaveProperty('resize');
    expect(result.current).toHaveProperty('setupZoomSelect');
    expect(result.current).toHaveProperty('updateOptions');
  });

  test('should properly update options state on addSeries call', async () => {
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

    expect(result.current._getOptions().series).toContainEqual(
      expect.objectContaining(newSeries),
    );
  });

  test('should properly update options state on removeSeries call', async () => {
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

    expect(result.current._getOptions().series).not.toContainEqual(
      expect.objectContaining(series),
    );
  });

  test('should properly update options state on updateOptions call', async () => {
    const { result } = await setupHook();

    const newOptions = {
      grid: {
        top: 100,
      },
    };

    await act(async () => {
      result.current.updateOptions(newOptions);
      await Promise.resolve();
    });

    expect(result.current._getOptions().grid).toEqual(
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

    expect(result?.current?._getEChartsInstance()?.on).toHaveBeenCalledWith(
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

    expect(result?.current?._getEChartsInstance()?.off).toHaveBeenCalledWith(
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

    expect(result?.current?._getEChartsInstance()?.group).toBe('test-group');
  });

  test('should remove chart from group on call to `removeFromGroup`', async () => {
    const { result } = await setupHook();

    await act(async () => {
      result.current.addToGroup('test-group');
      result.current.removeFromGroup();
      await Promise.resolve();
    });

    expect(result?.current?._getEChartsInstance()?.group).toBe('');
  });

  test('should set `ready` to true when chart instance is available', async () => {
    const { result } = await setupHook();
    expect(result.current.ready).toBe(true);
  });
});
