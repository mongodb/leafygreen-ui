import React, { forwardRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useIdAllocator } from '@leafygreen-ui/hooks';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { DrawerContext } from '../DrawerContext';

import { LGIDs } from './Drawer.constants';
import {
  getChildrenContainerStyles,
  getDrawerStyles,
  getHeaderStyles,
} from './Drawer.styles';
import { DrawerProps } from './Drawer.types';

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      children,
      className,
      'data-lgid': dataLgId = LGIDs.root,
      id: idProp,
      open = false,
      setOpen,
      title,
      ...rest
    },
    fwdRef,
  ) => {
    const { darkMode, theme } = useDarkMode();

    const [hasTabs, setHasTabs] = useState(false);

    const id = useIdAllocator({ prefix: 'drawer', id: idProp });
    const titleId = useIdAllocator({ prefix: 'drawer' });

    // Track when element is no longer visible to add shadow below drawer header
    const { ref: interceptRef, inView: isInterceptInView } = useInView();

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <DrawerContext.Provider
          value={{ registerTabs: () => setHasTabs(true) }}
        >
          <div
            aria-hidden={!open}
            aria-labelledby={titleId}
            className={getDrawerStyles({ className, open, theme })}
            data-lgid={dataLgId}
            id={id}
            ref={fwdRef}
            role="dialog"
            {...rest}
          >
            <div
              className={getHeaderStyles({
                hasShadowTop: !isInterceptInView,
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
              <IconButton
                aria-label="Close drawer"
                onClick={() => setOpen?.(false)}
              >
                <XIcon />
              </IconButton>
            </div>
            <div className={getChildrenContainerStyles({ hasTabs })}>
              {/* Empty span element used to track if children container has scrolled down */}
              {!hasTabs && <span ref={interceptRef} />}
              {children}
            </div>
          </div>
        </DrawerContext.Provider>
      </LeafyGreenProvider>
    );
  },
);

Drawer.displayName = 'Drawer';
