// @ts-ignore
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED as ReactInternals } from 'react';
import { act, renderHook } from '@testing-library/react';

import { EChartEvents, EChartEventsType, EChartsInstance } from '../../Echart';

import { useTooltipVisibility } from './useTooltipVisibility';

describe('@lg-echarts/core/hooks/useTooltipVisibility', () => {
  // a function to simulate unbatched action dispatching in React 17
  async function actUnbatched(fn: () => void) {
    await act(async () => {
      ReactInternals.ReactCurrentActQueue.isBatchingLegacy = false;
      fn();
      ReactInternals.ReactCurrentActQueue.isBatchingLegacy = true;
    });
  }

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  test('should pin the tooltip when the click event is triggered (in unbatched environment like React 17)', async () => {
    // mock the echart instance
    const echart: jest.Mocked<EChartsInstance> = {
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

    // a click event listener will be registered on the echart instance
    // which will toggle the tooltip pinning
    let capturedPinTooltipFn: ((params: any) => void) | undefined;
    echart.on.mockImplementation(
      (event: EChartEventsType, handler: (params: any) => void) => {
        if (event === EChartEvents.Click) {
          capturedPinTooltipFn = handler;
        }
      },
    );

    // To mimic the behavior of React 17, we need to use the `legacyRoot: true` option.
    const renderedHook = renderHook(
      () =>
        useTooltipVisibility({
          chartId: 'test-chart',
          container: null,
          echart,
        }),
      { legacyRoot: true },
    );

    // Set tooltip as mounted
    act(() => {
      renderedHook.result.current.setTooltipMounted(true);
    });

    // Verify click handler was registered on the echart instance
    expect(capturedPinTooltipFn).toBeDefined();

    // simulate a click event on the echart instance to pin the tooltip
    // do it unbatched to simulate the real behavior of React 17 in Atlas UI
    await actUnbatched(() => {
      capturedPinTooltipFn!({ offsetX: 10, offsetY: 10 });
    });

    // Wait for setTimeout actions to complete
    jest.runAllTimers();

    // Verify that the tooltip is pinned and is showing at the correct position
    expect(renderedHook.result.current.tooltipPinned).toBe(true);
    expect(echart.showTooltip).toHaveBeenCalledWith(10, 10);
  });
});
