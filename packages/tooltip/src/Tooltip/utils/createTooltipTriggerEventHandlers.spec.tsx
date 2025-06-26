import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { TriggerEvent } from '../Tooltip.types';
import { CALLBACK_DEBOUNCE, DEFAULT_HOVER_DELAY } from '../tooltipConstants';

import {
  createTooltipTriggerEventHandlers,
  useTooltipTriggerEventHandlers,
} from './createTooltipTriggerEventHandlers';
import { CreateTooltipEventsArgs } from './tooltipHandlers.types';

const mockMouseEvent = {
  target: document.createElement('div'),
} as unknown as React.MouseEvent<HTMLElement>;

const mockFocusEvent = {
  target: document.createElement('div'),
} as unknown as React.FocusEvent<HTMLElement>;

const mockClickEvent = {
  target: document.createElement('div'),
} as unknown as React.MouseEvent<HTMLElement>;

describe('packages/tooltip/createTooltipTriggerEventHandlers', () => {
  // Common test setup
  const setState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('createTooltipTriggerEventHandlers', () => {
    describe('with hover trigger event', () => {
      // Test handlers for additional side effects
      const onMouseEnterMock = jest.fn();
      const onMouseLeaveMock = jest.fn();
      const onFocusMock = jest.fn();
      const onBlurMock = jest.fn();

      // Base args for hover event tests
      const hoverArgs: CreateTooltipEventsArgs<typeof TriggerEvent.Hover> = {
        setState,
        triggerEvent: TriggerEvent.Hover,
        onMouseEnter: onMouseEnterMock,
        onMouseLeave: onMouseLeaveMock,
        onFocus: onFocusMock,
        onBlur: onBlurMock,
      };

      test('returns hover event handlers', () => {
        const handlers = createTooltipTriggerEventHandlers(hoverArgs);

        expect(handlers).toHaveProperty('onMouseEnter');
        expect(handlers).toHaveProperty('onMouseLeave');
        expect(handlers).toHaveProperty('onFocus');
        expect(handlers).toHaveProperty('onBlur');
        expect(handlers.onClick).toBeUndefined();
      });

      test('sets tooltip state to true on mouse enter', () => {
        const handlers = createTooltipTriggerEventHandlers(hoverArgs);

        handlers.onMouseEnter(mockMouseEvent);

        // Since the handler uses debounce, we need to fast-forward timers
        jest.advanceTimersByTime(CALLBACK_DEBOUNCE + DEFAULT_HOVER_DELAY);

        expect(onMouseEnterMock).toHaveBeenCalledWith(mockMouseEvent);
        expect(setState).toHaveBeenCalledWith(true);
      });

      test('sets tooltip state to false on mouse leave', () => {
        const handlers = createTooltipTriggerEventHandlers(hoverArgs);
        handlers.onMouseLeave(mockMouseEvent);

        // Fast-forward timers for debounce
        jest.advanceTimersByTime(CALLBACK_DEBOUNCE);

        expect(onMouseLeaveMock).toHaveBeenCalledWith(mockMouseEvent);
        expect(setState).toHaveBeenCalledWith(false);
      });

      test('sets tooltip state to true on focus', () => {
        const handlers = createTooltipTriggerEventHandlers(hoverArgs);

        handlers.onFocus(mockFocusEvent);

        expect(onFocusMock).toHaveBeenCalledWith(mockFocusEvent);
        expect(setState).toHaveBeenCalledWith(true);
      });

      test('sets tooltip state to false on blur', () => {
        const handlers = createTooltipTriggerEventHandlers(hoverArgs);

        handlers.onBlur(mockFocusEvent);

        expect(onBlurMock).toHaveBeenCalledWith(mockFocusEvent);
        expect(setState).toHaveBeenCalledWith(false);
      });

      test('does not trigger handlers when isEnabled is false', () => {
        const disabledArgs = { ...hoverArgs, isEnabled: false };
        const handlers = createTooltipTriggerEventHandlers(disabledArgs);

        handlers.onMouseEnter!(mockMouseEvent);
        handlers.onMouseLeave!(mockMouseEvent);
        handlers.onFocus!(mockFocusEvent);
        handlers.onBlur!(mockFocusEvent);

        jest.advanceTimersByTime(CALLBACK_DEBOUNCE);

        expect(onMouseEnterMock).not.toHaveBeenCalled();
        expect(onMouseLeaveMock).not.toHaveBeenCalled();
        expect(onFocusMock).not.toHaveBeenCalled();
        expect(onBlurMock).not.toHaveBeenCalled();
        expect(setState).not.toHaveBeenCalled();
      });
    });

    describe('with click trigger event', () => {
      // Mock for tooltip ref
      const tooltipRef = { current: document.createElement('div') };
      // Mock for onClick callback
      const onClickMock = jest.fn();

      // Base args for click event tests
      const clickArgs: CreateTooltipEventsArgs<typeof TriggerEvent.Click> = {
        setState,
        triggerEvent: TriggerEvent.Click,
        tooltipRef,
        onClick: onClickMock,
      };

      test('returns click event handler', () => {
        const handlers = createTooltipTriggerEventHandlers(clickArgs);

        expect(handlers).toHaveProperty('onClick');
        expect(handlers.onMouseEnter).toBeUndefined();
        expect(handlers.onMouseLeave).toBeUndefined();
        expect(handlers.onFocus).toBeUndefined();
        expect(handlers.onBlur).toBeUndefined();
      });

      test('toggles tooltip state on click', () => {
        const handlers = createTooltipTriggerEventHandlers(clickArgs);
        const currentState = false;
        setState.mockImplementationOnce(callback => {
          if (typeof callback === 'function') {
            expect(callback(currentState)).toBe(!currentState);
          }
        });

        handlers.onClick(mockClickEvent);

        expect(onClickMock).toHaveBeenCalledWith(mockClickEvent);
        expect(setState).toHaveBeenCalled();
      });

      test('does not trigger handler when isEnabled is false', () => {
        const disabledArgs = { ...clickArgs, isEnabled: false };
        const handlers = createTooltipTriggerEventHandlers(disabledArgs);

        handlers.onClick!(mockClickEvent);

        expect(onClickMock).not.toHaveBeenCalled();
        expect(setState).not.toHaveBeenCalled();
      });
    });
  });

  describe('useTooltipTriggerEventHandlers', () => {
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
      jest.advanceTimersByTime(CALLBACK_DEBOUNCE);
      expect(setState).not.toHaveBeenCalled();
    });

    test('memoizes handlers to prevent unnecessary re-renders', () => {
      const hoverArgs: CreateTooltipEventsArgs<typeof TriggerEvent.Hover> = {
        setState,
        triggerEvent: TriggerEvent.Hover,
      };

      const { result, rerender } = renderHook(() =>
        useTooltipTriggerEventHandlers(hoverArgs),
      );
      const initialHandlers = result.current;

      // Rerender with the same props
      rerender(() => useTooltipTriggerEventHandlers(hoverArgs));

      // Handlers should be the same objects (memoized)
      expect(result.current).toBe(initialHandlers);
    });
  });
});
