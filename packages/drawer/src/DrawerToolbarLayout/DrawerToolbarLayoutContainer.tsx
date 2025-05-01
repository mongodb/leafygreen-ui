import React, { useState } from 'react';

import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { spacing } from '@leafygreen-ui/tokens';
import { Toolbar, ToolbarIconButton } from '@leafygreen-ui/toolbar';
import { Body } from '@leafygreen-ui/typography';

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
      <Body>
        Ipsam aspernatur sequi quo esse recusandae aperiam distinctio quod
        dignissimos. Nihil totam accusamus. Odio occaecati commodi sapiente
        dolores.
      </Body>
      <Body>
        Molestiae accusantium porro eum quas praesentium consequuntur deleniti.
        Fuga mollitia incidunt atque. Minima nisi fugit sapiente.
      </Body>
      <Body>
        Ratione explicabo saepe occaecati. Et esse eveniet accusamus veritatis
        esse quod. Vero aliquid quasi saepe vel harum molestiae rerum.
      </Body>
      <Body>
        Minima distinctio eligendi sit culpa tempore adipisci. Consequuntur
        consequatur minus quaerat sapiente consectetur esse blanditiis
        provident. Nulla quas esse quasi a error sint pariatur possimus quia.
      </Body>
    </div>
  );
};

export const DrawerToolbarLayoutContainer = ({
  children,
  displayMode = DisplayMode.Embedded,
  data,
  onClose,
  darkMode: darkModeProp,
}: DrawerToolbarLayoutContainerProps) => {
  const { darkMode } = useDarkMode(darkModeProp);
  const [open, setOpen] = useState(false);

  const handleOnClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClose?.(event);
    setOpen(false);

    // TODO: add call to context to update the drawer content
  };

  const LayoutComponent =
    displayMode === DisplayMode.Overlay
      ? OverlayDrawerLayout
      : EmbeddedDrawerLayout;

  const layoutProps = {
    hasToolbar: true,
    isDrawerOpen: displayMode === DisplayMode.Embedded ? open : false,
  };

  const handleIconClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  ) => {
    onClick?.(event);
    setOpen(true);
  };

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <DrawerStackProvider>
        <LayoutComponent {...layoutProps}>
          <div
            className={css`
              grid-area: ${GRID_AREA.content};
              overflow: scroll;
              height: inherit;
            `}
          >
            {children}
          </div>
          <DrawerWithToolbarWrapper
            displayMode={displayMode}
            isDrawerOpen={open}
          >
            <Toolbar>
              {data?.map(toolbar => (
                <ToolbarIconButton
                  key={toolbar.glyph}
                  glyph={toolbar.glyph}
                  label={toolbar.label}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleIconClick(e, toolbar.onClick)
                  }
                />
              ))}
            </Toolbar>
            <Drawer
              displayMode={displayMode}
              open={open}
              onClose={handleOnClose}
              title="Drawer Title"
            >
              {/* TODO: get content from context */}
              {/* Filler for now */}
              <LongContent />
              <LongContent />
              <LongContent />
              <LongContent />
              <LongContent />
              <LongContent />
              {/* Filler for now */}
            </Drawer>
          </DrawerWithToolbarWrapper>
        </LayoutComponent>
      </DrawerStackProvider>
    </LeafyGreenProvider>
  );
};

DrawerToolbarLayoutContainer.displayName = 'DrawerToolbarLayoutContainer';
