import useEventListener from './useEventListener';

export function useBackdropClick(
  callback: Function,
  refOrRefs: React.RefObject<HTMLElement> | Array<React.RefObject<HTMLElement>>,
  enabled = true,
): void {
  /**
   * We add two event handlers to the document to handle the backdrop click behavior.
   * Intended behavior is to close the menu, and keep focus on the component.
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
    return Array.isArray(refOrRefs)
      ? refOrRefs.some(ref => ref.current?.contains(target as Node))
      : refOrRefs.current?.contains(target as Node) || false;
  }
}