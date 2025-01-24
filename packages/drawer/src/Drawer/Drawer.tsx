import React, { forwardRef } from 'react';

import { DrawerProps } from './Drawer.types';

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (props, fwdRef) => {
    return (
      <div ref={fwdRef} {...props}>
        your content here
      </div>
    );
  },
);

Drawer.displayName = 'Drawer';
