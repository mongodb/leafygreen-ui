import React from 'react';

import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Toolbar, ToolbarIconButton } from '@leafygreen-ui/toolbar';

import { GRID_AREA } from '../constants';
import { Drawer } from '../Drawer/Drawer';
import { DisplayMode } from '../Drawer/Drawer.types';
import { DrawerStackProvider } from '../DrawerStackContext';
import { DrawerWithToolbarWrapper } from '../DrawerWithToolbarWrapper';
import { EmbeddedDrawerLayout } from '../EmbeddedDrawerLayout';
import { OverlayDrawerLayout } from '../OverlayDrawerLayout';

import {
  DrawerToolbarLayoutContainerProps,
  LayoutData,
} from './DrawerToolbarLayout.types';

import { useDrawerToolbarContext } from '../DrawerToolbarContext';

export const DrawerToolbarLayoutContainer = ({
  children,
  displayMode = DisplayMode.Embedded,
  data,
  onClose,
  darkMode: darkModeProp,
}: DrawerToolbarLayoutContainerProps) => {
  const { darkMode } = useDarkMode(darkModeProp);
  const { openDrawer, closeDrawer, getActiveDrawerContent } =
    useDrawerToolbarContext();
  const isDrawerOpen = !!getActiveDrawerContent();
  const { id, title, content } = getActiveDrawerContent() || {};

  if (!data || data.length === 0) return null;

  const handleOnClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClose?.(event);
    closeDrawer();
  };

  const LayoutComponent =
    displayMode === DisplayMode.Overlay
      ? OverlayDrawerLayout
      : EmbeddedDrawerLayout;

  const layoutProps = {
    hasToolbar: true,
    isDrawerOpen: displayMode === DisplayMode.Embedded ? isDrawerOpen : false,
  };

  const handleIconClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: LayoutData['id'],
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  ) => {
    onClick?.(event);
    openDrawer(id);
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
            isDrawerOpen={isDrawerOpen}
          >
            <Toolbar>
              {data?.map(toolbar => (
                <ToolbarIconButton
                  key={toolbar.glyph}
                  glyph={toolbar.glyph}
                  label={toolbar.label}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleIconClick(e, toolbar.id, toolbar.onClick)
                  }
                  active={toolbar.id === id}
                />
              ))}
            </Toolbar>
            <Drawer
              displayMode={displayMode}
              open={isDrawerOpen}
              onClose={handleOnClose}
              title={title}
            >
              {content}
            </Drawer>
          </DrawerWithToolbarWrapper>
        </LayoutComponent>
      </DrawerStackProvider>
    </LeafyGreenProvider>
  );
};

DrawerToolbarLayoutContainer.displayName = 'DrawerToolbarLayoutContainer';
