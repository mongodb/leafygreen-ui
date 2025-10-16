import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { VisuallyHidden } from '@leafygreen-ui/a11y';
import {
  useIdAllocator,
  useIsomorphicLayoutEffect,
  useMergeRefs,
} from '@leafygreen-ui/hooks';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { queryFirstFocusableElement } from '@leafygreen-ui/lib';
import { usePolymorphic } from '@leafygreen-ui/polymorphic';
import { Position, useResizable } from '@leafygreen-ui/resizable';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { DRAWER_TOOLBAR_WIDTH, TRANSITION_DURATION } from '../constants';
import { useDrawerLayoutContext } from '../DrawerLayout';
import { useDrawerStackContext } from '../DrawerStackContext';
import { getLgIds } from '../utils';

import {
  getChildrenContainerStyles,
  getDrawerShadowStyles,
  getDrawerStyles,
  getHeaderStyles,
  getInnerChildrenContainerStyles,
  getInnerContainerStyles,
  getResizerStyles,
  titleStyles,
} from './Drawer.styles';
import { DisplayMode, DrawerProps } from './Drawer.types';
import { getResolvedDrawerSizes, useResolvedDrawerProps } from './Drawer.utils';

/**
 * A drawer is a panel that slides in from the right side of the screen (not customizable). Because the user can use the Drawer without navigating away from the current page, tasks can be completed more efficiently while not changing page context.
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      children,
      className,
      'data-lgid': dataLgId,
      displayMode: displayModeProp,
      hasPadding = true,
      id: idProp,
      onClose: onCloseProp,
      open: openProp,
      scrollable = true,
      size: sizeProp,
      title,
      ...rest
    },
    fwdRef,
  ) => {
    const { darkMode, theme } = useDarkMode();
    const { getDrawerIndex, registerDrawer, unregisterDrawer } =
      useDrawerStackContext();
    const {
      isDrawerOpen,
      resizable,
      displayMode: displayModeContextProp,
      onClose: onCloseContextProp,
      hasToolbar,
      setIsDrawerResizing,
      setDrawerWidth,
      drawerWidth,
      size: sizeContextProp,
    } = useDrawerLayoutContext();
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const ref = useRef<HTMLDialogElement | HTMLDivElement>(null);
    const [previousWidth, setPreviousWidth] = useState(0);

    // Returns the resolved displayMode, open state, and onClose function based on the component and context props.
    const { displayMode, open, onClose, size } = useResolvedDrawerProps({
      componentDisplayMode: displayModeProp,
      contextDisplayMode: displayModeContextProp,
      componentOpen: openProp,
      contextOpen: isDrawerOpen,
      componentOnClose: onCloseProp,
      contextOnClose: onCloseContextProp,
      componentSize: sizeProp,
      contextSize: sizeContextProp,
    });

    // Returns the resolved drawer sizes based on whether a toolbar is present.
    const { initialSize, resizableMinWidth, resizableMaxWidth } =
      getResolvedDrawerSizes(size, hasToolbar);

    const isEmbedded = displayMode === DisplayMode.Embedded;
    const isOverlay = displayMode === DisplayMode.Overlay;
    const isResizableEnabled = isEmbedded && !!resizable && open;
    const { Component } = usePolymorphic<'dialog' | 'div'>(
      isOverlay ? 'dialog' : 'div',
    );

    const lgIds = getLgIds(dataLgId);
    const id = useIdAllocator({ prefix: 'drawer', id: idProp });
    const titleId = useIdAllocator({ prefix: 'drawer' });

    // Track when intercept <span> element is no longer visible to add shadow below drawer header
    const { ref: interceptRef, inView: isInterceptInView } = useInView({
      initialInView: true,
      fallbackInView: true,
      skip: !scrollable,
    });

    const showCloseButton = !!onClose;
    // This will use the default value of 0 if not wrapped in a DrawerStackProvider. If using a Drawer + Toolbar, the DrawerStackProvider will not be necessary.
    const drawerIndex = getDrawerIndex(id);

    useIsomorphicLayoutEffect(() => {
      const drawerElement = ref.current;

      if (!drawerElement || drawerElement instanceof HTMLDivElement) {
        return;
      }

      if (open) {
        drawerElement.show();
        setShouldAnimate(true);
      } else {
        drawerElement.close();
      }
    }, [ref, open]);

    useEffect(() => {
      if (open) {
        registerDrawer(id);
      } else {
        setTimeout(() => unregisterDrawer(id), TRANSITION_DURATION);
      }
    }, [id, open, registerDrawer, unregisterDrawer]);

    const previouslyFocusedRef = useRef<HTMLElement | null>(null);
    const hasHandledFocusRef = useRef<boolean>(false);

    /**
     * Focuses the first focusable element in the drawer when the drawer is opened.
     * Also handles restoring focus when the drawer is closed.
     *
     * This is only necessary for embedded drawers. Overlay drawers use the native focus behavior of the dialog element.
     */
    useIsomorphicLayoutEffect(() => {
      if (isOverlay) return;

      if (open && !hasHandledFocusRef.current) {
        // Store the currently focused element when opening (only once per open session)
        previouslyFocusedRef.current = document.activeElement as HTMLElement;
        hasHandledFocusRef.current = true;

        if (ref.current === null) {
          return;
        }

        // Find and focus the first focusable element in the drawer
        const firstFocusableElement = queryFirstFocusableElement(ref.current);
        firstFocusableElement?.focus();
      } else if (!open && hasHandledFocusRef.current) {
        // Check if the current focus is not in the drawer
        // This means the user has navigated away from the drawer, like the toolbar, and we should not restore focus.
        if (!ref.current?.contains(document.activeElement)) {
          hasHandledFocusRef.current = false;
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
        hasHandledFocusRef.current = false; // Reset for next open session
      }
    }, [isDrawerOpen, isOverlay, open]);

    /**
     * Enables resizable functionality if the drawer is resizable, embedded and open.
     */
    const {
      resizableRef,
      size: drawerSize,
      getResizerProps,
      isResizing,
    } = useResizable<HTMLDialogElement | HTMLDivElement>({
      enabled: isResizableEnabled,
      initialSize: previousWidth !== 0 ? previousWidth : initialSize,
      minSize: resizableMinWidth,
      maxSize: resizableMaxWidth,
      position: Position.Right,
    });

    /**
     * On initial render, if the drawer is embedded and there was a previous width, that means that the previous drawer was open and may have been resized. This takes that previous width and uses it as the initial size.
     */
    useEffect(() => {
      if (open && isEmbedded && resizable && drawerWidth !== 0) {
        const prevWidth = hasToolbar
          ? drawerWidth + DRAWER_TOOLBAR_WIDTH
          : drawerWidth - DRAWER_TOOLBAR_WIDTH;
        setPreviousWidth(prevWidth);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Resets the previous width to 0 when the drawer is closed.
     */
    useEffect(() => {
      if (!open) setPreviousWidth(0);
    }, [open]);

    // In an embedded drawer, the parent grid container controls the drawer width with grid-template-columns, so we pass the width to the context where it is read by the parent grid container.
    useEffect(() => {
      if (!isEmbedded) return;

      if (open) {
        // If the drawer is not resizable, we manually set the drawer width to the size prop when the drawer is open or closed.
        const size = resizable ? drawerSize : initialSize;
        setDrawerWidth(size);
        if (resizable) setIsDrawerResizing(isResizing);
      } else {
        // If the drawer is closed, we set the drawer width to 0.
        setDrawerWidth(0);
        if (resizable) setIsDrawerResizing(false);
      }
    }, [
      isEmbedded,
      drawerSize,
      isResizing,
      open,
      resizable,
      setDrawerWidth,
      setIsDrawerResizing,
      initialSize,
    ]);

    const resizerProps = getResizerProps();
    const drawerRef = useMergeRefs([fwdRef, ref, resizableRef]);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        {/* Live region for announcing drawer state changes to screen readers */}
        {open && (
          <VisuallyHidden aria-live="polite" aria-atomic="true">
            {`${title} drawer`}
          </VisuallyHidden>
        )}
        <Component
          aria-hidden={!open}
          aria-labelledby={titleId}
          className={getDrawerStyles({
            theme,
            open,
            shouldAnimate,
            className,
            displayMode,
            zIndex: 1000 + drawerIndex,
            hasToolbar,
            size,
          })}
          data-lgid={lgIds.root}
          data-testid={lgIds.root}
          id={id}
          ref={drawerRef}
          inert={!open ? 'inert' : undefined}
          {...rest}
        >
          {isResizableEnabled && (
            <div
              {...resizerProps}
              className={getResizerStyles({
                resizerClassName: resizerProps?.className,
                hasToolbar,
              })}
            />
          )}
          <div className={getDrawerShadowStyles({ theme, displayMode })}>
            <div
              className={getInnerContainerStyles({
                theme,
                open,
              })}
            >
              <div
                className={getHeaderStyles({
                  theme,
                })}
              >
                <Body
                  as={typeof title === 'string' ? 'h2' : 'div'}
                  baseFontSize={BaseFontSize.Body2}
                  id={titleId}
                  className={titleStyles}
                >
                  {title}
                </Body>

                {showCloseButton && (
                  <IconButton
                    aria-label="Close drawer"
                    data-lgid={lgIds.closeButton}
                    data-testid={lgIds.closeButton}
                    onClick={onClose}
                  >
                    <XIcon />
                  </IconButton>
                )}
              </div>
              <div
                className={getChildrenContainerStyles({
                  hasShadowTop: !isInterceptInView,
                  theme,
                })}
              >
                {hasPadding || scrollable ? (
                  <div
                    className={getInnerChildrenContainerStyles({
                      hasPadding,
                      scrollable,
                    })}
                    data-lgid={lgIds.scrollContainer}
                    data-testid={lgIds.scrollContainer}
                  >
                    {/* Empty span element used to track if children container has scrolled down */}
                    <span ref={interceptRef} />
                    {children}
                  </div>
                ) : (
                  children
                )}
              </div>
            </div>
          </div>
        </Component>
      </LeafyGreenProvider>
    );
  },
);

Drawer.displayName = 'Drawer';
