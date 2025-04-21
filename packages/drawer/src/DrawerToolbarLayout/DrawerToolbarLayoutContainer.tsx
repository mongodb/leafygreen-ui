import { css, cx } from '@leafygreen-ui/emotion';
import React, { useState } from 'react';
import { DisplayMode } from '../Drawer/Drawer.types';
import { EmbeddedDrawerLayout } from '../EmbeddedDrawerLayout';
import { DrawerToolbarLayoutContainerProps } from './DrawerToolbarLayout.types';

import { Toolbar, ToolbarIconButton } from '@leafygreen-ui/toolbar';
import { drawerTransitionDuration } from '../Drawer/Drawer.styles';
import { Drawer } from '../Drawer/Drawer';

export const DrawerToolbarLayoutContainer = ({
  children,
  displayMode = DisplayMode.Embedded,
  data,
  onClose,
  className,
  open: openProp = false,
}: DrawerToolbarLayoutContainerProps) => {
  // const [open, setOpen] = useState(initialOpen ?? true);
  const [open, setOpen] = useState(openProp);
  console.log({ openProp });

  const handleOnClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClose?.(event);
    setOpen(false);
  };

  return (
    <EmbeddedDrawerLayout
      isDrawerOpen={open}
      hasToolbar
      displayMode={displayMode}
      className={className}
    >
      {children}
      <div
        className={css`
          display: grid;
          grid-template-columns: 48px 432px;
          overflow: hidden;
        `}
      >
        <Toolbar
          className={cx(
            css`
              position: absolute;
              top: 0;
              right: 0;
              height: 100%;
              transition: all ${drawerTransitionDuration}ms linear;
              transform: translateX(0);
            `,
            {
              [css`
                transform: translateX(-432px);
              `]: open,
            },
          )}
        >
          <ToolbarIconButton glyph="Code" label="Code" onClick={() => {}} />
          <ToolbarIconButton glyph="Plus" label="Plus" onClick={() => {}} />
        </Toolbar>
        <Drawer
          displayMode={displayMode}
          open={open}
          onClose={handleOnClose}
          title="Drawer Title"
        />
      </div>
    </EmbeddedDrawerLayout>
  );
};

DrawerToolbarLayoutContainer.displayName = 'DrawerToolbarLayoutContainer';
