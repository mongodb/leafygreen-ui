import React, { useState } from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { Toolbar, ToolbarIconButton } from '@leafygreen-ui/toolbar';

import { GRID_AREA } from '../constants';
import { Drawer } from '../Drawer/Drawer';
import { DisplayMode } from '../Drawer/Drawer.types';
import { DrawerStackProvider } from '../DrawerStackContext';
import { DrawerWithToolbarWrapper } from '../DrawerWithToolbarWrapper';
import { EmbeddedDrawerLayout } from '../EmbeddedDrawerLayout';
import { OverlayDrawerLayout } from '../OverlayDrawerLayout';

import { DrawerToolbarLayoutContainerProps } from './DrawerToolbarLayout.types';

// Dummy content for now
const LongContent = () => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: ${spacing[100]}px;
      `}
    >
      <p>
        Ipsam aspernatur sequi quo esse recusandae aperiam distinctio quod
        dignissimos. Nihil totam accusamus. Odio occaecati commodi sapiente
        dolores.
      </p>
      <p>
        Molestiae accusantium porro eum quas praesentium consequuntur deleniti.
        Fuga mollitia incidunt atque. Minima nisi fugit sapiente.
      </p>
      <p>
        Ratione explicabo saepe occaecati. Et esse eveniet accusamus veritatis
        esse quod. Vero aliquid quasi saepe vel harum molestiae rerum.
      </p>
      <p>
        Minima distinctio eligendi sit culpa tempore adipisci. Consequuntur
        consequatur minus quaerat sapiente consectetur esse blanditiis
        provident. Nulla quas esse quasi a error sint pariatur possimus quia.
      </p>
    </div>
  );
};

export const DrawerToolbarLayoutContainer = ({
  children,
  displayMode = DisplayMode.Embedded,
  data,
  onClose,
}: DrawerToolbarLayoutContainerProps) => {
  const [open, setOpen] = useState(false);

  const handleOnClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClose?.(event);
    setOpen(false);
  };

  const LayoutComponent =
    displayMode === DisplayMode.Overlay
      ? OverlayDrawerLayout
      : EmbeddedDrawerLayout;

  const layoutProps = {
    hasToolbar: true,
    isDrawerOpen: displayMode === DisplayMode.Embedded ? open : false,
  };

  return (
    <DrawerStackProvider>
      {/*  This logic will be handled internally inside ToolbarDrawerLayout */}
      <LayoutComponent {...layoutProps}>
        {children}
        <DrawerWithToolbarWrapper displayMode={displayMode} isDrawerOpen={open}>
          {/* Filler for now */}
          <Toolbar
            className={cx(
              css`
                /* TODO: move this to a className */
                grid-area: ${GRID_AREA.toolbar};
              `,
            )}
          >
            <ToolbarIconButton
              glyph="Code"
              label="Code"
              onClick={() => setOpen(true)}
            />
            <ToolbarIconButton
              glyph="Plus"
              label="Plus"
              onClick={() => setOpen(true)}
            />
          </Toolbar>
          <Drawer
            displayMode={displayMode}
            open={open}
            onClose={handleOnClose}
            title="Drawer Title"
            className={css`
              grid-area: ${GRID_AREA.innerDrawer};
            `}
          >
            <LongContent />
            <LongContent />
            <LongContent />
            <LongContent />
            <LongContent />
            <LongContent />
          </Drawer>
        </DrawerWithToolbarWrapper>
        {/*  This logic will be handled internally inside ToolbarDrawerLayout */}
      </LayoutComponent>
    </DrawerStackProvider>
  );
};

DrawerToolbarLayoutContainer.displayName = 'DrawerToolbarLayoutContainer';
