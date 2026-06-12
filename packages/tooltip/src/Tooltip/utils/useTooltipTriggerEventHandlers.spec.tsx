import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { TriggerEvent } from '../Tooltip.types';
import { CALLBACK_DEBOUNCE, DEFAULT_HOVER_DELAY } from '../tooltipConstants';

import { UseTooltipEventsArgs } from './tooltipHandlers.types';
import { useTooltipTriggerEventHandlers } from './useTooltipTriggerEventHandlers';

const mockMouseEvent = {
  target: document.createElement('div'),
} as unknown as React.MouseEvent<HTMLElement>;

const mockFocusEvent = {
  target: document.createElement('div'),
} as unknown as React.FocusEvent<HTMLElement>;

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
    const hoverArgs: UseTooltipEventsArgs<typeof TriggerEvent.Hover> = {
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
    const clickArgs: UseTooltipEventsArgs<typeof TriggerEvent.Click> = {
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
    const hoverArgs: UseTooltipEventsArgs<typeof TriggerEvent.Hover> = {
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
    const hoverArgs: UseTooltipEventsArgs<typeof TriggerEvent.Hover> = {
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

  describe('usingKeyboard', () => {
    test('onFocus opens tooltip when usingKeyboard is true (default)', () => {
      const onFocus = jest.fn();
      const hoverArgs: UseTooltipEventsArgs<typeof TriggerEvent.Hover> = {
        setState,
        triggerEvent: TriggerEvent.Hover,
        onFocus,
      };

      const { result } = renderHook(() =>
        useTooltipTriggerEventHandlers(hoverArgs),
      );

      result.current.onFocus(mockFocusEvent);

      expect(onFocus).toHaveBeenCalled();
      expect(setState).toHaveBeenCalledWith(true);
    });

    test('onFocus does not open tooltip after mouse usage', () => {
      const onFocus = jest.fn();
      const hoverArgs: UseTooltipEventsArgs<typeof TriggerEvent.Hover> = {
        setState,
        triggerEvent: TriggerEvent.Hover,
        onFocus,
      };

      const { result } = renderHook(
        () => useTooltipTriggerEventHandlers(hoverArgs),
        {
          wrapper: ({ children }: React.PropsWithChildren<unknown>) => (
            <LeafyGreenProvider>{children}</LeafyGreenProvider>
          ),
        },
      );

      // Mouse usage sets usingKeyboard to false
      act(() => {
        document.dispatchEvent(new MouseEvent('mousedown'));
      });

      result.current.onFocus(mockFocusEvent);

      // Consumer's onFocus handler still fires, but the tooltip does not open
      expect(onFocus).toHaveBeenCalled();
      expect(setState).not.toHaveBeenCalled();

      // Blur still closes the tooltip
      result.current.onBlur(mockFocusEvent);
      expect(setState).toHaveBeenCalledWith(false);
    });
  });

  test('only changes identity when args change', () => {
    const hoverArgs: UseTooltipEventsArgs<typeof TriggerEvent.Hover> = {
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
    rerender({ ...hoverArgs });

    jest.advanceTimersByTime(CALLBACK_DEBOUNCE + DEFAULT_HOVER_DELAY);

    // Handlers should not be the same objects
    expect(result.current).not.toBe(initialHandlers);
  });
});
