import {
  FocusEvent,
  FocusEventHandler,
  MouseEvent,
  MouseEventHandler,
  useMemo,
} from 'react';
import { flushSync } from 'react-dom';
import debounce from 'lodash/debounce';

import { TriggerEvent } from '../Tooltip.types';

import type {
  CreateTooltipEventsArgs,
  TooltipEventHandlers,
} from './tooltipHandlers.types';

export const CALLBACK_DEBOUNCE = 35; // ms

/**
 * Creates the appropriate event handlers
 * for a given Tooltip triggerEvent.
 *
 * Spread the returned object onto the tooltip trigger element
 */
export function createTooltipTriggerEventHandlers<Trigger extends TriggerEvent>(
  args: CreateTooltipEventsArgs<Trigger>,
): TooltipEventHandlers<Trigger> {
  const { setState, triggerEvent, tooltipRef, isEnabled = true } = args;

  // switch (triggerEvent) {
  if (triggerEvent === TriggerEvent.Hover) {
    const onMouseEnter: MouseEventHandler = debounce(
      (e: MouseEvent<HTMLElement>) => {
        if (isEnabled) {
          args.onMouseEnter?.(e);
          // Without this the tooltip sometimes opens without a transition. flushSync prevents this state update from automatically batching. Instead updates are made synchronously.
          // https://react.dev/reference/react-dom/flushSync#flushing-updates-for-third-party-integrations
          flushSync(() => {
            setState(true);
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
}

export function useTooltipTriggerEventHandlers<Trigger extends TriggerEvent>(
  args: CreateTooltipEventsArgs<Trigger>,
): TooltipEventHandlers<Trigger> {
  const callbacks: TooltipEventHandlers<Trigger> = useMemo(() => {
    return createTooltipTriggerEventHandlers({ ...args });
  }, [args]);

  return callbacks;
}
