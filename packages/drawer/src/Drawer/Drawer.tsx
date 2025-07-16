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
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { useDrawerStackContext } from '../DrawerStackContext';
import { getLgIds } from '../utils';

import {
  drawerTransitionDuration,
  getChildrenContainerStyles,
  getDrawerShadowStyles,
  getDrawerStyles,
  getHeaderStyles,
  getInnerContainerStyles,
  innerChildrenContainerStyles,
} from './Drawer.styles';
import { DisplayMode, DrawerProps } from './Drawer.types';
import { useResizable } from '../utils/useResizable/useResizable';
import { PANEL_WIDTH, PANEL_WITH_TOOLBAR_WIDTH } from '../constants';

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      children,
      className,
      'data-lgid': dataLgId,
      displayMode = DisplayMode.Overlay,
      id: idProp,
      onClose,
      open = false,
      title,
      ...rest
    },
    fwdRef,
  ) => {
    const { darkMode, theme } = useDarkMode();
    const { Component } = usePolymorphic<'dialog' | 'div'>(
      displayMode === DisplayMode.Overlay ? 'dialog' : 'div',
    );
    const { getDrawerIndex, registerDrawer, unregisterDrawer } =
      useDrawerStackContext();
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const ref = useRef<HTMLDialogElement | HTMLDivElement>(null);
    const drawerRef = useMergeRefs([fwdRef, ref, resizableRef]);

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

    useEffect(() => {
      if (open) {
        registerDrawer(id);
      } else {
        setTimeout(() => unregisterDrawer(id), drawerTransitionDuration);
      }
    }, [open]);

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

    // console.log('🧰', {
    //   isEnabled: open && displayMode === DisplayMode.Embedded,
    //   open,
    //   displayMode,
    // });

    const { resizableRef, size, setSize, getResizerProps } = useResizable({
      enabled: open && displayMode === DisplayMode.Embedded,
      initialSize: open ? { width: PANEL_WITH_TOOLBAR_WIDTH } : { width: 0 },
      minSize: { width: 120 },
      maxSize: { width: 120 },
      maxViewportPercentages: { width: 60 },
    });

    console.log('🐳', { size });

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
          })}
          data-lgid={lgIds.root}
          data-testid={lgIds.root}
          id={id}
          ref={drawerRef}
          onAnimationEnd={handleAnimationEnd}
          inert={!open ? 'inert' : undefined}
          // style={{
          //   '--drawerWidth': size.width ? `${size.width}px` : '0px',
          // }}
          {...rest}
        >
          {displayMode === DisplayMode.Embedded && (
            <div
              {...getResizerProps('left')}
              style={{
                position: 'absolute',
                height: '100%',
                width: '2px',
                backgroundColor: 'red',
                zIndex: 1100,
                left: 0,
                cursor: 'col-resize',
              }}
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
