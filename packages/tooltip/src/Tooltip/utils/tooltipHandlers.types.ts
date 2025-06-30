import { FocusEventHandler, MouseEventHandler, RefObject } from 'react';

import type { TriggerEvent } from '../Tooltip.types';

export interface UseTooltipEventsBaseArgs {
  /**
   *  The `useState` dispatch method to toggle the tooltip state
   */
  setState: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Whether the tooltip event handlers should be enabled
   */
  isEnabled?: boolean;
}

export interface UseTooltipEventsArgsHover {
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

export interface UseTooltipEventsArgsClick {
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

export type UseTooltipEventsArgs<Trigger extends TriggerEvent> =
  UseTooltipEventsBaseArgs &
    (Trigger extends 'hover'
      ? UseTooltipEventsArgsHover
      : Trigger extends 'click'
      ? UseTooltipEventsArgsClick
      : never);

export interface TooltipHoverEvents {
  onMouseEnter: MouseEventHandler<HTMLElement>;
  onMouseLeave: MouseEventHandler<HTMLElement>;
  onFocus: FocusEventHandler<HTMLElement>;
  onBlur: FocusEventHandler<HTMLElement>;
  onClick: undefined;
}
export interface TooltipClickEvents {
  onClick: MouseEventHandler<HTMLElement>;
  onMouseEnter: undefined;
  onMouseLeave: undefined;
  onFocus: undefined;
  onBlur: undefined;
}

export type TooltipEventHandlers<Trigger extends TriggerEvent> =
  Trigger extends 'hover'
    ? TooltipHoverEvents
    : Trigger extends 'click'
    ? TooltipClickEvents
    : never;
