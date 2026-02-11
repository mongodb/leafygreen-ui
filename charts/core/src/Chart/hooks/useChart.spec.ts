import { act } from 'react-dom/test-utils';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { useChart } from './useChart';

const EChartEventsMock = {
  ZoomSelect: 'zoomselect',
};

// Mock the useEchart hook
jest.mock('../../Echart', () => ({
  useEchart: jest.fn(() => ({
    ready: false,
    addToGroup: jest.fn(),
    removeFromGroup: jest.fn(),
    setupZoomSelect: jest.fn(),
    on: jest.fn(),
  })),
  EChartEvents: EChartEventsMock,
}));

// Mock useTooltipVisibility
jest.mock('./useTooltipVisibility', () => ({
  useTooltipVisibility: jest.fn(() => ({
    isChartHovered: false,
    setTooltipMounted: jest.fn(),
    tooltipPinned: false,
    unpinTooltip: jest.fn(),
  })),
}));

// Mock useChartGroupStableContext
jest.mock('../../ChartGroupContext', () => ({
  useChartGroupStableContext: jest.fn(() => undefined),
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
      removeFromGroup: jest.fn(),
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
      removeFromGroup: jest.fn(),
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
      removeFromGroup: jest.fn(),
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
      removeFromGroup: jest.fn(),
      setupZoomSelect: jest.fn(),
      on,
    });

    renderHook(() => useChart({ theme: 'dark', onZoomSelect }));

    expect(on).toHaveBeenCalledWith(
      EChartEventsMock.ZoomSelect,
      expect.any(Function),
    );

    // Simulate zoom select event
    const zoomEventResponse = { start: 0, end: 100 };
    const zoomSelectHandler = on.mock.calls.find(
      ([action, _]) => action === EChartEventsMock.ZoomSelect,
    )[1];
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
      removeFromGroup: jest.fn(),
      setupZoomSelect: jest.fn(),
      on: jest.fn(),
    };

    (useEchart as jest.Mock).mockReturnValue(mockEchartInstance);

    const { result } = renderHook(() =>
      useChart({
        chartId: 'test-chart-id',
        theme: 'dark',
      }),
    );

    expect(result.current).toEqual({
      ...mockEchartInstance,
      id: 'test-chart-id',
      isChartHovered: false,
      ref: expect.any(Function),
      setTooltipMounted: expect.any(Function),
      state: undefined,
      tooltipPinned: false,
    });
  });

  test('should call `addToGroup` when `groupId` is present', async () => {
    const { useEchart } = require('../../Echart');
    const { useChartGroupStableContext } = require('../../ChartGroupContext');
    const addToGroup = jest.fn();
    const groupId = 'test-group';

    (useEchart as jest.Mock).mockReturnValue({
      ready: true,
      addToGroup,
      removeFromGroup: jest.fn(),
      setupZoomSelect: jest.fn(),
      on: jest.fn(),
    });

    (useChartGroupStableContext as jest.Mock).mockReturnValue({
      groupId,
      enableTooltipSync: true,
      setIsSomeChartHovered: jest.fn(),
    });

    renderHook(() => useChart({ theme: 'dark' }));

    expect(addToGroup).toHaveBeenCalledWith(groupId);
  });

  test('should call `removeFromGroup` on unmount if `groupId` is present', async () => {
    const { useEchart } = require('../../Echart');
    const { useChartGroupStableContext } = require('../../ChartGroupContext');
    const removeFromGroup = jest.fn();
    const groupId = 'test-group';

    (useEchart as jest.Mock).mockReturnValue({
      ready: true,
      addToGroup: jest.fn(),
      removeFromGroup,
      setupZoomSelect: jest.fn(),
      on: jest.fn(),
    });

    (useChartGroupStableContext as jest.Mock).mockReturnValue({
      groupId,
      enableTooltipSync: true,
      setIsSomeChartHovered: jest.fn(),
    });

    const { unmount } = renderHook(() => useChart({ theme: 'dark' }));

    unmount();

    expect(removeFromGroup).toHaveBeenCalled();
  });
});
