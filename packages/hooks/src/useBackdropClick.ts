import useEventListener from './useEventListener';

/**
 * Fires a callback when any element(s)
 * _except_ those passed in as `foreground` is clicked.
 *
 * Note: Disable this hook (with the `enabled` arg)
 * if the `foreground` element(s) are not in view (e.g. menu, tooltip, etc.).
 */
export function useBackdropClick(
  /**
   * Function called when any element other than those provided is clicked
   */
  callback: Function,

  /**
   * The primary element(s) that are excluded from backdrop click
   */
  foreground:
    | React.RefObject<HTMLElement>
    | Array<React.RefObject<HTMLElement>>,

  /**
   * Whether the callback is enabled.
   * It's recommended to set this to `false` when not in use,
   * and toggle to `true` when the main elements (menu, tooltip, etc) are visible
   */
  enabled = true,
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

  useEventListener(
    'mousedown',
    (mousedown: MouseEvent) => {
      if (!doesComponentContainEventTarget(mousedown)) {
        mousedown.preventDefault(); // Prevent focus from being applied to body
        mousedown.stopPropagation(); // Stop any other mousedown events from firing
      }
    },
    {
      enabled,
    },
  );

  useEventListener(
    'click',
    (click: MouseEvent) => {
      if (!doesComponentContainEventTarget(click)) {
        click.stopPropagation(); // Stop any other click events from firing
        callback();
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
