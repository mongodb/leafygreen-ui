import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  Position,
  useIdAllocator,
  useIsomorphicLayoutEffect,
  useMergeRefs,
  useResizable,
} from '@leafygreen-ui/hooks';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { usePolymorphic } from '@leafygreen-ui/polymorphic';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { DRAWER_WIDTH, DRAWER_WITH_TOOLBAR_WIDTH } from '../constants';
import { useDrawerLayoutContext } from '../DrawerLayout/DrawerLayoutContext';
import { useDrawerStackContext } from '../DrawerStackContext';
import { getLgIds } from '../utils';

import {
  DRAWER_MAX_PERCENTAGE_WIDTH,
  DRAWER_MAX_WIDTH,
  DRAWER_MIN_WIDTH,
  DRAWER_MIN_WIDTH_WITH_TOOLBAR,
  DRAWER_MAX_WIDTH_WITH_TOOLBAR,
} from './Drawer.constants';
import {
  drawerTransitionDuration,
  getChildrenContainerStyles,
  getDrawerShadowStyles,
  getDrawerStyles,
  getHeaderStyles,
  getInnerContainerStyles,
  getResizerStyles,
  innerChildrenContainerStyles,
} from './Drawer.styles';
import { DisplayMode, DrawerProps } from './Drawer.types';

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
      id: idProp,
      onClose: onCloseProp,
      open: openProp,
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
    } = useDrawerLayoutContext();
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const ref = useRef<HTMLDialogElement | HTMLDivElement>(null);
    const displayMode =
      displayModeProp ?? displayModeContextProp ?? DisplayMode.Overlay;
    const open = openProp ?? isDrawerOpen ?? false;
    const isResizable =
      displayMode === DisplayMode.Embedded && !!resizable && open;
    const onClose = onCloseProp ?? onCloseContextProp;
    const isEmbedded = displayMode === DisplayMode.Embedded;
    const { Component } = usePolymorphic<'dialog' | 'div'>(
      displayMode === DisplayMode.Overlay ? 'dialog' : 'div',
    );

    const initialSize = hasToolbar ? DRAWER_WITH_TOOLBAR_WIDTH : DRAWER_WIDTH;
    const resizableMinWidth = hasToolbar
      ? DRAWER_MIN_WIDTH_WITH_TOOLBAR
      : DRAWER_MIN_WIDTH;
    const resizableMaxWidth = hasToolbar
      ? DRAWER_MAX_WIDTH_WITH_TOOLBAR
      : DRAWER_MAX_WIDTH;

    const lgIds = getLgIds(dataLgId);
    const id = useIdAllocator({ prefix: 'drawer', id: idProp });
    const titleId = useIdAllocator({ prefix: 'drawer' });

    // Track when intercept <span> element is no longer visible to add shadow below drawer header
    const { ref: interceptRef, inView: isInterceptInView } = useInView({
      initialInView: true,
      fallbackInView: true,
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
        setTimeout(() => unregisterDrawer(id), drawerTransitionDuration);
      }
    }, [id, open, registerDrawer, unregisterDrawer]);

    /**
     * Focuses the first focusable element in the drawer when the animation ends. We have to manually handle this because we are hiding the drawer with visibility: hidden, which breaks the default focus behavior of dialog element.
     *
     */
    const handleAnimationEnd = () => {
      const drawerElement = ref.current;

      // Check if the drawerElement is null or is a div, which means it is not a dialog element.
      if (!drawerElement || drawerElement instanceof HTMLDivElement) {
        return;
      }

      if (open) {
        const firstFocusable = drawerElement.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        (firstFocusable as HTMLElement)?.focus();
      }
    };

    // Enables resizable functionality if the drawer is resizable and in embedded mode.
    const { resizableRef, size, getResizerProps } = useResizable<
      HTMLDialogElement | HTMLDivElement
    >({
      enabled: resizable && isEmbedded,
      initialSize: open ? initialSize : 0,
      minSize: resizableMinWidth,
      maxSize: resizableMaxWidth,
      maxViewportPercentages: DRAWER_MAX_PERCENTAGE_WIDTH,
      position: Position.Right,
    });

    // Create merged ref after resizableRef is defined
    const refsToMerge = [fwdRef, ref];

    // Use a conditional to ensure resizableRef is only included when it's needed
    if (isEmbedded && resizable) {
      refsToMerge.push(resizableRef);
    }

    const drawerRef = useMergeRefs(refsToMerge);
    const resizerProps = getResizerProps();

    return (
      <LeafyGreenProvider darkMode={darkMode}>
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
            size: resizable ? size : open ? initialSize : 0,
          })}
          data-lgid={lgIds.root}
          data-testid={lgIds.root}
          id={id}
          ref={drawerRef}
          onAnimationEnd={handleAnimationEnd}
          inert={!open ? 'inert' : undefined}
          {...rest}
        >
          {isResizable && (
            <div
              {...resizerProps}
              className={getResizerStyles({
                resizerClassName: resizerProps?.className,
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
                >
                  <strong>{title}</strong>
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
                <div className={innerChildrenContainerStyles}>
                  {/* Empty span element used to track if children container has scrolled down */}
                  {<span ref={interceptRef} />}
                  {children}
                </div>
              </div>
            </div>
          </div>
        </Component>
      </LeafyGreenProvider>
    );
  },
);

Drawer.displayName = 'Drawer';
