import { fireEvent, waitFor } from '@testing-library/react';

import { act } from '../RTLOverrides';

/**
 * Fires the `transitionEnd` event on the provided element,
 * triggering any event handlers attached to this CSS transition events.
 *
 * Ensures `onEntered`, `onExited` handlers are fired when
 * using `react-transition-group`
 */
export async function waitForTransition(
  element?: HTMLElement | Parameters<typeof fireEvent.transitionEnd>[0] | null,
  options?: Parameters<typeof fireEvent.transitionEnd>[1],
) {
  if (element) {
    await waitFor(() => {
      act(() => fireEvent.transitionEnd(element, options));
    });
  }
}
