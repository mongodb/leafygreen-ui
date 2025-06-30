import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { TriggerEvent } from '../Tooltip.types';
import { CALLBACK_DEBOUNCE, DEFAULT_HOVER_DELAY } from '../tooltipConstants';

import { CreateTooltipEventsArgs } from './tooltipHandlers.types';
import { useTooltipTriggerEventHandlers } from './useTooltipTriggerEventHandlers';

const mockMouseEvent = {
  target: document.createElement('div'),
} as unknown as React.MouseEvent<HTMLElement>;

describe('packages/tooltip/useTooltipTriggerEventHandlers', () => {
  // Common test setup
  const setState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const tooltipRef = { current: document.createElement('div') };

  test('returns hover event handlers for hover trigger event', () => {
    const hoverArgs: CreateTooltipEventsArgs<typeof TriggerEvent.Hover> = {
      setState,
      triggerEvent: TriggerEvent.Hover,
    };

    const { result } = renderHook(() =>
      useTooltipTriggerEventHandlers(hoverArgs),
    );

    expect(result.current).toHaveProperty('onMouseEnter');
    expect(result.current).toHaveProperty('onMouseLeave');
    expect(result.current).toHaveProperty('onFocus');
    expect(result.current).toHaveProperty('onBlur');
    expect(result.current.onClick).toBeUndefined();
  });

  test('returns click event handler for click trigger event', () => {
    const clickArgs: CreateTooltipEventsArgs<typeof TriggerEvent.Click> = {
      setState,
      triggerEvent: TriggerEvent.Click,
      tooltipRef,
    };

    const { result } = renderHook(() =>
      useTooltipTriggerEventHandlers(clickArgs),
    );

    expect(result.current).toHaveProperty('onClick');
    expect(result.current.onMouseEnter).toBeUndefined();
    expect(result.current.onMouseLeave).toBeUndefined();
    expect(result.current.onFocus).toBeUndefined();
    expect(result.current.onBlur).toBeUndefined();
  });

  test('updates isEnabled ref when isEnabled changes', () => {
    let isEnabled = true;
    const hoverArgs: CreateTooltipEventsArgs<typeof TriggerEvent.Hover> = {
      setState,
      triggerEvent: TriggerEvent.Hover,
      isEnabled,
    };

    const { result, rerender } = renderHook(
      args => useTooltipTriggerEventHandlers(args),
      {
        initialProps: hoverArgs,
      },
    );

    // Initial render with isEnabled=true

    result.current.onMouseEnter(mockMouseEvent);
    jest.advanceTimersByTime(CALLBACK_DEBOUNCE + DEFAULT_HOVER_DELAY);
    expect(setState).toHaveBeenCalledWith(true);

    // Update props with isEnabled=false
    setState.mockClear();
    isEnabled = false;
    const updatedArgs = { ...hoverArgs, isEnabled };
    rerender(updatedArgs);

    // After rerender with isEnabled=false, handlers should be disabled
    result.current.onMouseEnter(mockMouseEvent);
    jest.advanceTimersByTime(CALLBACK_DEBOUNCE + DEFAULT_HOVER_DELAY);
    expect(setState).not.toHaveBeenCalled();
  });

  test('memoizes handlers to prevent unnecessary re-renders', () => {
    const hoverArgs: CreateTooltipEventsArgs<typeof TriggerEvent.Hover> = {
      setState,
      triggerEvent: TriggerEvent.Hover,
    };

    const { result, rerender } = renderHook(
      args => useTooltipTriggerEventHandlers(args),
      {
        initialProps: hoverArgs,
      },
    );
    const initialHandlers = result.current;

    // Rerender with the same props
    rerender(hoverArgs);

    // Handlers should be the same objects (memoized)
    expect(result.current).toBe(initialHandlers);
  });

  test('only changes identity when args change', () => {
    const hoverArgs: CreateTooltipEventsArgs<typeof TriggerEvent.Hover> = {
      setState,
      triggerEvent: TriggerEvent.Hover,
    };

    const { result, rerender } = renderHook(
      args => useTooltipTriggerEventHandlers(args),
      {
        initialProps: hoverArgs,
      },
    );
    const initialHandlers = result.current;

    // Rerender with the same props
    rerender({ ...hoverArgs, delay: 0 });

    // Handlers should be the same objects (memoized)
    expect(result.current).not.toBe(initialHandlers);
  });
});
