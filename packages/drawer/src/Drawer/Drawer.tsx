import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

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
import { usePolymorphic } from '@leafygreen-ui/polymorphic';
import { Position, useResizable } from '@leafygreen-ui/resizable';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { TRANSITION_DURATION } from '../constants';
import { useDrawerLayoutContext } from '../DrawerLayout';
import { useDrawerStackContext } from '../DrawerStackContext';
import { getLgIds } from '../utils';

import {
  getChildrenContainerStyles,
  getDrawerShadowStyles,
  getDrawerStyles,
  getHeaderStyles,
  getInnerContainerStyles,
  getResizerStyles,
  getScrollContainerStyles,
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
      id: idProp,
      onClose: onCloseProp,
      open: openProp,
      scrollable = true,
      title,
      size: sizeProp,
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

    // const [initialSize, setInitialSize] = useState(0);

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

    // const initialSizeEmbedded =
    //   drawerWidth === 0
    //     ? initialSize
    //     : hasToolbar
    //     ? drawerWidth - 48
    //     : drawerWidth;

    // console.log('🐙', { initialSizeEmbedded });

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

    // Enables resizable functionality if the drawer is resizable, embedded and open.
    const {
      resizableRef,
      size: drawerSize,
      setSize,
      getResizerProps,
      isResizing,
    } = useResizable<HTMLDialogElement | HTMLDivElement>({
      enabled: isResizableEnabled,
      initialSize: previousWidth !== 0 ? previousWidth : initialSize,
      minSize: resizableMinWidth,
      maxSize: resizableMaxWidth,
      position: Position.Right,
    });

    useEffect(() => {
      console.log('🥊drawer render', {
        drawerWidth,
        open,
        hasToolbar,
        initialSize,
      });
      if (open && isEmbedded && drawerWidth !== 0) {
        console.log('😡');
        const prevWidth = hasToolbar ? drawerWidth + 48 : drawerWidth - 48;
        setPreviousWidth(prevWidth);
      }
    }, []);

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
          onAnimationEnd={handleAnimationEnd}
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
                {scrollable ? (
                  <div className={getScrollContainerStyles({ scrollable })}>
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
