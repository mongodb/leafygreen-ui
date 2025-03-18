import useEventListener from './useEventListener';

/**
 * Fires a callback when any element(s)
 * _except_ those passed in as `foreground` is clicked.
 *
 * Establishes a click event listener on the document,
 * firing during the [capture phase](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#capture)
 * to ensure this check is performed before the event reaches the target.
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
  useEventListener(
    'click',
    (click: MouseEvent) => {
      const isClickInComponent = doesComponentContainEventTarget(click);

      if (!isClickInComponent) {
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
