import { RefObject } from 'react';

import { queryFirstFocusableElement } from '../../../lib/src/queryFocusableElements';
import { DRAWER_TOOLBAR_WIDTH, DRAWER_WIDTHS } from '../constants';
import {
  DRAWER_MAX_WIDTH,
  DRAWER_MAX_WIDTH_WITH_TOOLBAR,
  DRAWER_MIN_WIDTH,
  DRAWER_MIN_WIDTH_WITH_TOOLBAR,
} from '../constants';

import { DisplayMode, DrawerProps, Size } from './Drawer.types';

/**
 * Returns the width of the drawer based on the size.
 * @param size - The size of the drawer.
 * @returns An object containing the default width and width with toolbar.
 */
export const getDrawerWidth = ({ size }: { size: Size }) => {
  return {
    default: DRAWER_WIDTHS[size],
    withToolbar: DRAWER_WIDTHS[size] - DRAWER_TOOLBAR_WIDTH,
  };
};

/**
 * Resolves the drawer props based on the component and context props.
 * @returns An object containing the resolved displayMode, open state, and onClose function.
 */
export const useResolvedDrawerProps = ({
  componentDisplayMode,
  contextDisplayMode,
  componentOpen,
  contextOpen,
  componentOnClose,
  contextOnClose,
  componentSize,
  contextSize,
  componentInitialFocus,
  contextInitialFocus,
}: {
  componentDisplayMode?: DisplayMode;
  contextDisplayMode?: DisplayMode;
  componentOpen?: boolean;
  contextOpen?: boolean;
  componentOnClose?: React.MouseEventHandler<HTMLButtonElement>;
  contextOnClose?: React.MouseEventHandler<HTMLButtonElement>;
  componentSize?: Size;
  contextSize?: Size;
  componentInitialFocus?: DrawerProps['initialFocus'];
  contextInitialFocus?: DrawerProps['initialFocus'];
}) => {
  const displayMode =
    componentDisplayMode ?? contextDisplayMode ?? DisplayMode.Overlay;
  const open = componentOpen ?? contextOpen ?? false;
  const onClose = componentOnClose ?? contextOnClose ?? undefined;
  const size = componentSize ?? contextSize ?? Size.Default;
  const initialFocus = componentInitialFocus ?? contextInitialFocus ?? 'auto';

  return { displayMode, open, onClose, size, initialFocus };
};

/**
 * Returns the resolved drawer sizes based on whether a toolbar is present.
 * @returns
 */
export const getResolvedDrawerSizes = (size: Size, hasToolbar?: boolean) => {
  const drawerWidths = getDrawerWidth({ size });
  const initialSize = hasToolbar
    ? drawerWidths.withToolbar
    : drawerWidths.default;
  const resizableMinWidth = hasToolbar
    ? DRAWER_MIN_WIDTH_WITH_TOOLBAR
    : DRAWER_MIN_WIDTH;
  const resizableMaxWidth = hasToolbar
    ? DRAWER_MAX_WIDTH_WITH_TOOLBAR
    : DRAWER_MAX_WIDTH;

  return { initialSize, resizableMinWidth, resizableMaxWidth };
};

/**
 * Focuses an explicit drawer child element.
 * @param drawerElement - The drawer element.
 * @param initialFocus - The initial focus element.
 */
const focusExplicitElement = (
  drawerElement: HTMLDialogElement | HTMLDivElement,
  initialFocus: 'auto' | string | RefObject<HTMLElement>,
) => {
  let targetElement: HTMLElement | null = null;

  if (typeof initialFocus === 'string') {
    targetElement = drawerElement.querySelector(initialFocus);
  } else if ('current' in initialFocus) {
    targetElement = initialFocus.current;
  }

  if (targetElement) {
    targetElement.focus();
  }
};

/**
 * Handles the auto focus behavior for embedded drawers. Mimics the native focus behavior of the dialog element.
 * If an auto focus element is found, focus it.
 * If no auto focus element is found, focus the first focusable element in the drawer.
 * @param drawerElement - The drawer element.
 */
const handleAutoFocus = (drawerElement: HTMLDivElement) => {
  const autoFocusElement = drawerElement.querySelector(
    '[autofocus]',
  ) as HTMLElement;

  if (autoFocusElement) {
    // Auto focus element found, focus it
    autoFocusElement.focus();
  } else {
    // Find and focus the first focusable element in the drawer
    const firstFocusableElement = queryFirstFocusableElement(drawerElement);
    firstFocusableElement?.focus();
  }
};

/**
 * Restores the previously focused element when closing an embedded drawer.
 *
 * If the active focus is not in the drawer, this means the user has navigated away from the drawer and we should not restore focus.
 * E.g., the user has clicked on a toolbar item which toggles the drawer closed and the focus should remain on the toolbar item.
 *
 * @param drawerElement - The drawer element.
 * @param previouslyFocusedRef - A ref to store the previously focused element.
 */
const restoreEmbeddedPreviousFocus = (
  drawerElement: HTMLDivElement,
  previouslyFocusedRef: React.MutableRefObject<HTMLElement | null>,
) => {
  if (!drawerElement?.contains(document.activeElement)) {
    previouslyFocusedRef.current = null;
    return;
  }

  // Restore focus when closing (only if we had handled focus during this session)
  if (previouslyFocusedRef.current) {
    // Check if the previously focused element is still in the DOM
    if (document.contains(previouslyFocusedRef.current)) {
      previouslyFocusedRef.current.focus();
    } else {
      // If the previously focused element is no longer in the DOM, focus the body
      // This mimics the behavior of the native HTML Dialog element
      document.body.focus();
    }
    previouslyFocusedRef.current = null; // Clear the ref
  }
};

/**
 * Sets the initial focus for embedded drawers. Mimics the native focus behavior of the dialog element and if the initialFocus is not 'auto', we focus the appropriate element.
 * @param open - Whether the drawer is open.
 * @param drawerElement - The drawer element.
 * @param initialFocus - The initial focus element.
 * @param previouslyFocusedRef - A ref to store the previously focused element.
 * @param hasHandledFocusRef - A ref to track whether focus has been handled.
 */
export const setEmbeddedDrawerFocus = (
  open: boolean,
  drawerElement: HTMLDivElement,
  initialFocus: 'auto' | string | RefObject<HTMLElement>,
  previouslyFocusedRef: React.MutableRefObject<HTMLElement | null>,
  hasHandledFocusRef: React.MutableRefObject<boolean>,
) => {
  if (open && !hasHandledFocusRef.current) {
    // Set the hasHandledFocusRef to true so that we know we have handled focus for this session.
    hasHandledFocusRef.current = true;
    // Store the currently focused element when opening
    previouslyFocusedRef.current = document.activeElement as HTMLElement;

    if (initialFocus !== 'auto') {
      focusExplicitElement(drawerElement, initialFocus);
      return;
    }

    // If no auto focus element is found, focus the first focusable element in the drawer
    handleAutoFocus(drawerElement);
  } else if (!open && hasHandledFocusRef.current) {
    // If the drawer is closed and we have handled focus(hasHandledFocusRef.current is true), we need to reset the hasHandledFocusRef to false so that the next time the drawer is opened, we can handle focus again.
    hasHandledFocusRef.current = false;
    // Restore the previously focused element when closing
    restoreEmbeddedPreviousFocus(drawerElement, previouslyFocusedRef);
  }
};

/**
 * Sets the initial focus for overlay drawers if initialFocus is not 'auto'.
 * @param dialogElement - The dialog element.
 * @param initialFocus - The initial focus element.
 */
export const setOverlayDrawerFocus = (
  dialogElement: HTMLDialogElement,
  initialFocus: 'auto' | string | RefObject<HTMLElement>,
) => {
  if (initialFocus !== 'auto') {
    focusExplicitElement(dialogElement, initialFocus);
  }
};
