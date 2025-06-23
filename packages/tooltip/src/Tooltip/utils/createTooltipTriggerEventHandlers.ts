import {
  FocusEvent,
  FocusEventHandler,
  MouseEvent,
  MouseEventHandler,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { flushSync } from 'react-dom';
import debounce from 'lodash/debounce';

import { TriggerEvent } from '../Tooltip.types';

export interface CreateTooltipEventsBaseArgs {
  /**
   *  The `useState` dispatch method to toggle the tooltip state
   */
  setState: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Whether the tooltip event handlers should be enabled
   */
  isEnabled?: boolean;
}

export interface CreateTooltipEventsArgsHover {
  /**
   * Whether the tooltip will open/close on `hover` or `click` events.
   * Note: must match the value passed onto `tooltip`
   */
  triggerEvent: typeof TriggerEvent.Hover;

  /**
   * A ref to the Tooltip element.
   * Optional when the trigger event is `hover`
   */
  tooltipRef?: RefObject<HTMLElement>;

  /** Additional side effects to run on this event */
  onMouseEnter?: MouseEventHandler<HTMLElement>;

  /** Additional side effects to run on this event */
  onMouseLeave?: MouseEventHandler<HTMLElement>;

  /** Additional side effects to run on this event */
  onFocus?: FocusEventHandler<HTMLElement>;

  /** Additional side effects to run on this event */
  onBlur?: FocusEventHandler<HTMLElement>;
}

export interface CreateTooltipEventsArgsClick {
  /**
   * Whether the tooltip will open/close on `hover` or `click` events.
   * Note: must match the value passed onto `tooltip`
   */
  triggerEvent: typeof TriggerEvent.Click;

  /**
   * A ref to the Tooltip element.
   * Optional when the trigger event is `hover`
   */
  tooltipRef: RefObject<HTMLElement>;

  /**
   * Additional side effects to run on this event
   */
  onClick?: MouseEventHandler<HTMLElement>;
}

export interface TooltipHoverEvents {
  onMouseEnter: MouseEventHandler<HTMLElement>;
  onMouseLeave: MouseEventHandler<HTMLElement>;
  onFocus: FocusEventHandler<HTMLElement>;
  onBlur: FocusEventHandler<HTMLElement>;
}
export interface TooltipClickEvents {
  onClick: MouseEventHandler<HTMLElement>;
}

/**
 * Creates the appropriate event handlers
 * for a given Tooltip triggerEvent.
 *
 * Spread the returned object onto the tooltip trigger element
 */
export function createTooltipTriggerEventHandlers(
  args: CreateTooltipEventsBaseArgs & CreateTooltipEventsArgsHover,
): TooltipHoverEvents;
export function createTooltipTriggerEventHandlers(
  args: CreateTooltipEventsBaseArgs & CreateTooltipEventsArgsClick,
): TooltipClickEvents;
export function createTooltipTriggerEventHandlers(
  args: CreateTooltipEventsBaseArgs &
    (CreateTooltipEventsArgsHover | CreateTooltipEventsArgsClick),
): TooltipHoverEvents | TooltipClickEvents {
  const { setState, triggerEvent, tooltipRef, isEnabled = true } = args;

  switch (triggerEvent) {
    case TriggerEvent.Hover:
      return {
        onMouseEnter: debounce((e: MouseEvent<HTMLElement>) => {
          if (isEnabled) {
            args.onMouseEnter?.(e);
            // Without this the tooltip sometimes opens without a transition. flushSync prevents this state update from automatically batching. Instead updates are made synchronously.
            // https://react.dev/reference/react-dom/flushSync#flushing-updates-for-third-party-integrations
            flushSync(() => {
              setState(true);
            });
          }
        }, 35),
        onMouseLeave: debounce((e: MouseEvent<HTMLElement>) => {
          if (isEnabled) {
            args.onMouseLeave?.(e);
            setState(false);
          }
        }, 35),
        onFocus: (e: FocusEvent<HTMLElement>) => {
          if (isEnabled) {
            args.onFocus?.(e);
            setState(true);
          }
        },
        onBlur: (e: FocusEvent<HTMLElement>) => {
          if (isEnabled) {
            args.onBlur?.(e);
            setState(false);
          }
        },
      };
    case TriggerEvent.Click:
    default:
      return {
        onClick: (e: MouseEvent<HTMLElement>) => {
          if (isEnabled) {
            // ensure that we don't close the tooltip when content inside tooltip is clicked
            if (e.target !== tooltipRef?.current) {
              args.onClick?.(e);
              setState(curr => !curr);
            }
          }
        },
      };
  }
}

export function useTooltipTriggerEventHandlers(
  args: CreateTooltipEventsBaseArgs &
    (CreateTooltipEventsArgsHover | CreateTooltipEventsArgsClick),
): {
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
  onClick?: MouseEventHandler<HTMLElement>;
} {
  const { setState, triggerEvent, tooltipRef, isEnabled = true } = args;
  const isHoverTrigger = triggerEvent === TriggerEvent.Hover;
  const isClickTrigger = triggerEvent === TriggerEvent.Click;

  // Ensure we have a stable way
  // of checking if the tooltip is enabled from within the callbacks
  // without creating a new callback on each render
  const isEnabledRef = useRef(isEnabled);
  useEffect(() => {
    isEnabledRef.current = isEnabled;
  }, [isEnabled]);
  const getIsEnabled = useCallback(() => isEnabledRef.current, []);

  return {
    onMouseEnter: useMemo(
      () =>
        isHoverTrigger
          ? debounce((e: MouseEvent<HTMLElement>) => {
              if (getIsEnabled()) {
                args.onMouseEnter?.(e);
                // Without this the tooltip sometimes opens without a transition. flushSync prevents this state update from automatically batching. Instead updates are made synchronously.
                // https://react.dev/reference/react-dom/flushSync#flushing-updates-for-third-party-integrations
                flushSync(() => {
                  setState(true);
                });
              }
            }, 35)
          : undefined,
      [args, getIsEnabled, isHoverTrigger, setState],
    ),
    onMouseLeave: useMemo(
      () =>
        isHoverTrigger
          ? debounce((e: MouseEvent<HTMLElement>) => {
              if (getIsEnabled()) {
                args.onMouseLeave?.(e);
                setState(false);
              }
            }, 35)
          : undefined,
      [args, getIsEnabled, isHoverTrigger, setState],
    ),
    onFocus: useMemo(
      () =>
        isHoverTrigger
          ? (e: FocusEvent<HTMLElement>) => {
              if (getIsEnabled()) {
                args.onFocus?.(e);
                setState(true);
              }
            }
          : undefined,
      [args, getIsEnabled, isHoverTrigger, setState],
    ),
    onBlur: useMemo(
      () =>
        isHoverTrigger
          ? (e: FocusEvent<HTMLElement>) => {
              if (getIsEnabled()) {
                args.onBlur?.(e);
                setState(false);
              }
            }
          : undefined,
      [args, getIsEnabled, isHoverTrigger, setState],
    ),
    onClick: useMemo(
      () =>
        isClickTrigger
          ? (e: MouseEvent<HTMLElement>) => {
              if (getIsEnabled()) {
                // ensure that we don't close the tooltip when content inside tooltip is clicked
                if (e.target !== tooltipRef?.current) {
                  args.onClick?.(e);
                  setState(curr => !curr);
                }
              }
            }
          : undefined,
      [args, isClickTrigger, getIsEnabled, setState, tooltipRef],
    ),
  };
}
