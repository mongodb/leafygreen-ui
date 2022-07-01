import { HTMLProps } from 'react';

/**
 * Isolates tooltip trigger methods from all props (i.e. `rest`)
 * in order to pass them as a unit into another component.
 * This is useful when you need  tooltips to work with the component
 * and need to spread rest on an element other than the component root.
 *
 * e.x.
 * ```ts
 * cosnt tooltipHandlers = getTooltipTriggerHandlers(rest)
 * <label {...tooltipHandlers}>
 *  <input {...rest} />
 * </label>
 * ```
 */
export function getTooltipTriggerHandlers<T = any>({
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onClick,
}: HTMLProps<T>) {
  return {
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onClick,
  };
}
