import { act } from 'react-dom/test-utils';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { useChart } from './useChart';

// Mock the useEchart hook
jest.mock('../../Echart', () => ({
  useEchart: jest.fn(() => ({
    ready: false,
    addToGroup: jest.fn(),
    setupZoomSelect: jest.fn(),
    on: jest.fn(),
  })),
}));

describe('@lg-echarts/core/hooks/useChart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('call `onChartReady` when EchartInstance is ready', async () => {
    const onChartReady = jest.fn();
    const { useEchart } = require('../../Echart');

    // Initially not ready
    (useEchart as jest.Mock).mockReturnValue({
      ready: false,
      addToGroup: jest.fn(),
      setupZoomSelect: jest.fn(),
      on: jest.fn(),
    });

    const { rerender } = renderHook(() =>
      useChart({ theme: 'dark', onChartReady }),
    );

    expect(onChartReady).not.toHaveBeenCalled();

    // Update to ready state
    (useEchart as jest.Mock).mockReturnValue({
      ready: true,
      addToGroup: jest.fn(),
      setupZoomSelect: jest.fn(),
      on: jest.fn(),
    });

    rerender();

    expect(onChartReady).toHaveBeenCalledTimes(1);
  });

  test('should correctly configure zoom select', async () => {
    const { useEchart } = require('../../Echart');
    const setupZoomSelect = jest.fn();

    (useEchart as jest.Mock).mockReturnValue({
      ready: true,
      addToGroup: jest.fn(),
      setupZoomSelect,
      on: jest.fn(),
    });

    const zoomSelect = {
      xAxis: true,
      yAxis: false,
    };

    renderHook(() => useChart({ theme: 'dark', zoomSelect }));

    expect(setupZoomSelect).toHaveBeenCalledWith({
      xAxis: true,
      yAxis: false,
    });
  });

  test('should call `onZoomSelect` on the zoomselect event', async () => {
    const onZoomSelect = jest.fn();
    const { useEchart } = require('../../Echart');
    const on = jest.fn();

    (useEchart as jest.Mock).mockReturnValue({
      ready: true,
      addToGroup: jest.fn(),
      setupZoomSelect: jest.fn(),
      on,
    });

    renderHook(() => useChart({ theme: 'dark', onZoomSelect }));

    expect(on).toHaveBeenCalledWith('zoomselect', expect.any(Function));

    // Simulate zoom select event
    const zoomEventResponse = { start: 0, end: 100 };
    const zoomSelectHandler = on.mock.calls[0][1];
    act(() => {
      zoomSelectHandler(zoomEventResponse);
    });

    expect(onZoomSelect).toHaveBeenCalledWith(zoomEventResponse);
  });

  test('should return the chart instance', () => {
    const { useEchart } = require('../../Echart');
    const mockEchartInstance = {
      ready: true,
      addToGroup: jest.fn(),
      setupZoomSelect: jest.fn(),
      on: jest.fn(),
    };

    (useEchart as jest.Mock).mockReturnValue(mockEchartInstance);

    const { result } = renderHook(() => useChart({ theme: 'dark' }));

    expect(result.current).toEqual({
      ...mockEchartInstance,
      ref: expect.any(Object),
    });
  });
});
