import {
  FocusEvent,
  FocusEventHandler,
  MouseEvent,
  MouseEventHandler,
  useMemo,
  useRef,
} from 'react';
import { flushSync } from 'react-dom';
import debounce from 'lodash/debounce';

import { TriggerEvent } from '../Tooltip.types';
import { CALLBACK_DEBOUNCE, DEFAULT_HOVER_DELAY } from '../tooltipConstants';

import type {
  TooltipEventHandlers,
  UseTooltipEventsArgs,
} from './tooltipHandlers.types';

/**
 * Hook to create the appropriate event handlers for a given Tooltip triggerEvent.
 * Spread the returned object onto the tooltip trigger element
 *
 * When `triggerEvent` is `hover`, it will create handlers for mouse enter, mouse leave, focus, and blur events.
 * When `triggerEvent` is `click`, it will create a handler for click events.
 */
export function useTooltipTriggerEventHandlers<Trigger extends TriggerEvent>(
  args: UseTooltipEventsArgs<Trigger>,
): TooltipEventHandlers<Trigger> {
  const { setState, triggerEvent, tooltipRef, isEnabled = true } = args;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useMemo(() => {
    if (triggerEvent === TriggerEvent.Hover) {
      const onMouseEnter: MouseEventHandler = debounce(
        (e: MouseEvent<HTMLElement>) => {
          if (isEnabled) {
            args.onMouseEnter?.(e);
            // Without this the tooltip sometimes opens without a transition. flushSync prevents this state update from automatically batching. Instead updates are made synchronously.
            // https://react.dev/reference/react-dom/flushSync#flushing-updates-for-third-party-integrations
            flushSync(() => {
              timeoutRef.current = setTimeout(() => {
                setState(true);
              }, DEFAULT_HOVER_DELAY);
            });
          }
        },
        CALLBACK_DEBOUNCE,
      );

      const onMouseLeave: MouseEventHandler = debounce(
        (e: MouseEvent<HTMLElement>) => {
          if (isEnabled) {
            args.onMouseLeave?.(e);
            setState(false);
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }
        },
        CALLBACK_DEBOUNCE,
      );

      const onFocus: FocusEventHandler = (e: FocusEvent<HTMLElement>) => {
        if (isEnabled) {
          args.onFocus?.(e);
          setState(true);
        }
      };

      const onBlur: FocusEventHandler = (e: FocusEvent<HTMLElement>) => {
        if (isEnabled) {
          args.onBlur?.(e);
          setState(false);
        }
      };

      return {
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
      } as TooltipEventHandlers<Trigger>;
    } else {
      const onClick = (e: MouseEvent<HTMLElement>) => {
        if (isEnabled) {
          // ensure that we don't close the tooltip when content inside tooltip is clicked
          if (e.target !== tooltipRef?.current) {
            args.onClick?.(e);
            setState(curr => !curr);
          }
        }
      };

      return {
        onClick,
      } as TooltipEventHandlers<Trigger>;
    }
  }, [args, isEnabled, setState, tooltipRef, triggerEvent]);
}
