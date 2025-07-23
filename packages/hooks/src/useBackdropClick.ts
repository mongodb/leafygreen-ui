import { consoleOnce } from '@leafygreen-ui/lib';

import useEventListener from './useEventListener';

interface UseBackdropClickOptions {
  /**
   * Whether the callback is enabled.
   * It's recommended to set this to `false` when not in use,
   * and toggle to `true` when the main elements (menu, tooltip, etc) are visible
   *
   * @default true
   */
  enabled: boolean;

  /**
   * Allows the event to bubble up to other elements.
   * When false, this ensures that only the `callback` is fired
   * when the backdrop is clicked,
   * (i.e. no other click event handlers are fired),
   * and that the clicked element does not receive focus.
   *
   * To allow the event to propagate, set this to `true`,
   * and ensure that you are correctly detecting whether the click target should receive focus,
   * or whether focus should return to the popover trigger.
   *
   * @default false
   */
  allowPropagation?: boolean;
}

/**
 * Fires a callback when any element(s)
 * _except_ those passed in as `foreground` is clicked.
 *
 * Note: Disable this hook (with the `enabled` arg)
 * if the `foreground` element(s) are not in view (e.g. menu, tooltip, etc.).
 */
export function useBackdropClick(
  /**
   * Function called when any element
   * _other than_ those provided is clicked.
   *
   * Callback is fired on the `click` event's capture phase,
   * (i.e. before a click handler on the target element is fired)
   */
  callback: Function,

  /**
   * The primary element(s) that are excluded from backdrop click
   */
  foreground:
    | React.RefObject<HTMLElement>
    | Array<React.RefObject<HTMLElement>>,

  /** Additional options for the hook. See {@link UseBackdropClickOptions} */
  options: boolean | UseBackdropClickOptions = {
    enabled: true,
    allowPropagation: false,
  },
): void {
  /**
   * We add two event handlers to the document to handle the backdrop click behavior.
   * Intended behavior is to fire the callback (usually closing a menu, tooltip, etc.),
   * and keep focus on the component.
   *
   * No other click event handlers should fire on backdrop click
   *
   * 1. Mousedown event fires
   * 2. We prevent `mousedown`'s default behavior, to prevent focus from being applied to the body (or other target)
   * 3. Click event fires
   * 4. We handle this event on _capture_, and stop propagation before the `click` event propagates all the way to any other element.
   *  This ensures that even if we click on a button, that handler is not fired
   * 5. Then we call the callback (typically fires `closeMenu`, setting `isOpen = false`, and rerender the component)
   */

  // TODO: Remove this in a major version
  // https://jira.mongodb.org/browse/LG-5012
  // To avoid a breaking change, we allow the `options` argument to be a boolean
  // If it is a boolean, we assume that it is the `enabled` option
  const { enabled, allowPropagation } =
    typeof options === 'boolean'
      ? { enabled: options, allowPropagation: false }
      : options;

  if (typeof options === 'boolean') {
    consoleOnce.warn(
      "useBackdropClick: The 'enabled' boolean argument is deprecated. Please use the 'options' object argument instead.",
    );
  }

  useEventListener(
    'mousedown',
    mousedown => {
      if (!doesComponentContainEventTarget(mousedown)) {
        if (!allowPropagation) {
          mousedown.preventDefault(); // Prevent focus from being applied to body
          mousedown.stopPropagation(); // Stop any other mousedown events from firing
        }
      }
    },
    {
      enabled,
    },
  );

  useEventListener(
    'click',
    click => {
      if (!doesComponentContainEventTarget(click)) {
        if (!allowPropagation) {
          click.stopPropagation(); // Stop any other click events from firing
        }
        callback(click);
      }
    },
    {
      options: { capture: true },
      enabled,
    },
  );

  /**
   * Returns whether the event target within the component
   */
  function doesComponentContainEventTarget({ target }: MouseEvent): boolean {
    return Array.isArray(foreground)
      ? foreground.some(ref => ref.current?.contains(target as Node))
      : foreground.current?.contains(target as Node) || false;
  }
}
