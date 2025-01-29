import React, { forwardRef } from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { getDrawerStyles, getHeaderStyles } from './Drawer.styles';
import { DrawerProps } from './Drawer.types';

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    { children, className, id: idProp, open = false, setOpen, title, ...rest },
    fwdRef,
  ) => {
    const { theme } = useDarkMode();

    const id = useIdAllocator({ prefix: 'drawer', id: idProp });
    const titleId = useIdAllocator({ prefix: 'drawer' });

    return (
      <div
        aria-hidden={!open}
        aria-labelledby={titleId}
        className={getDrawerStyles({ className, open, theme })}
        id={id}
        ref={fwdRef}
        role="dialog"
        {...rest}
      >
        <div className={getHeaderStyles(theme)}>
          <Body
            as={typeof title === 'string' ? 'p' : 'div'}
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
        {children}
      </div>
    );
  },
);

Drawer.displayName = 'Drawer';
