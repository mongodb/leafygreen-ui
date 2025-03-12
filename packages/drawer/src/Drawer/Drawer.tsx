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

import { DrawerContext } from '../DrawerContext';
import { useDrawerStackContext } from '../DrawerStackContext';
import { DEFAULT_LGID_ROOT, getLgIds } from '../utils';

import {
  drawerTransitionDuration,
  getChildrenContainerStyles,
  getDrawerStyles,
  getHeaderStyles,
  getInnerChildrenContainerStyles,
  getInnerContainerStyles,
} from './Drawer.styles';
import { DisplayMode, DrawerProps } from './Drawer.types';

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      children,
      className,
      'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
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

    const ref = useRef<HTMLDialogElement | HTMLDivElement>(null);
    const drawerRef = useMergeRefs([fwdRef, ref]);

    const [hasTabs, setHasTabs] = useState(false);

    const lgIds = getLgIds(dataLgId);
    const id = useIdAllocator({ prefix: 'drawer', id: idProp });
    const titleId = useIdAllocator({ prefix: 'drawer' });

    // Track when intercept <span> element is no longer visible to add shadow below drawer header
    const { ref: interceptRef, inView: isInterceptInView } = useInView({
      initialInView: true,
      fallbackInView: true,
    });

    const showCloseButton = !!onClose;
    const zIndex = getDrawerIndex(id);

    useIsomorphicLayoutEffect(() => {
      const drawerElement = ref.current;

      if (!drawerElement || drawerElement instanceof HTMLDivElement) {
        return;
      }

      if (open) {
        drawerElement.show();
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

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <DrawerContext.Provider
          value={{ registerTabs: () => setHasTabs(true) }}
        >
          <Component
            aria-hidden={!open}
            aria-labelledby={titleId}
            className={getDrawerStyles({
              className,
              displayMode,
              open,
              theme,
              zIndex,
            })}
            data-lgid={lgIds.root}
            id={id}
            ref={drawerRef}
            {...rest}
          >
            <div
              className={getInnerContainerStyles({
                displayMode,
                theme,
              })}
            >
              <div
                className={getHeaderStyles({
                  hasTabs,
                  theme,
                })}
              >
                <Body
                  as={typeof title === 'string' ? 'h2' : 'div'}
                  baseFontSize={BaseFontSize.Body2}
                  id={titleId}
                  weight="medium"
                >
                  {title}
                </Body>
                {showCloseButton && (
                  <IconButton
                    aria-label="Close drawer"
                    data-lgid={lgIds.closeButton}
                    onClick={onClose}
                  >
                    <XIcon />
                  </IconButton>
                )}
              </div>
              <div
                className={getChildrenContainerStyles({
                  hasShadowTop: !hasTabs && !isInterceptInView,
                  theme,
                })}
              >
                <div className={getInnerChildrenContainerStyles({ hasTabs })}>
                  {/* Empty span element used to track if children container has scrolled down */}
                  {!hasTabs && <span ref={interceptRef} />}
                  {children}
                </div>
              </div>
            </div>
          </Component>
        </DrawerContext.Provider>
      </LeafyGreenProvider>
    );
  },
);

Drawer.displayName = 'Drawer';
