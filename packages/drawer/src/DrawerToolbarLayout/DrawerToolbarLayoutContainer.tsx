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
import { useDrawerToolbarContext } from '../DrawerToolbarContext';
import { DrawerWithToolbarWrapper } from '../DrawerWithToolbarWrapper';
import { EmbeddedDrawerLayout } from '../EmbeddedDrawerLayout';
import { OverlayDrawerLayout } from '../OverlayDrawerLayout';
import { DEFAULT_LGID_ROOT, getLgIds } from '../utils';

import {
  DrawerToolbarLayoutContainerProps,
  LayoutData,
} from './DrawerToolbarLayout.types';

export const DrawerToolbarLayoutContainer = ({
  children,
  data,
  onClose,
  displayMode = DisplayMode.Embedded,
  'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
  darkMode: darkModeProp,
}: DrawerToolbarLayoutContainerProps) => {
  const { darkMode } = useDarkMode(darkModeProp);
  const { openDrawer, closeDrawer, getActiveDrawerContent, isDrawerOpen } =
    useDrawerToolbarContext();
  const { id, title, content } = getActiveDrawerContent() || {};
  const lgIds = getLgIds(dataLgId);
  const hasData = data && data.length > 0;

  const handleOnClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClose?.(event);
    closeDrawer();
  };

  // If the display mode is overlay, we want to use the OverlayDrawerLayout, else we want to use the EmbeddedDrawerLayout
  const LayoutComponent =
    displayMode === DisplayMode.Overlay
      ? OverlayDrawerLayout
      : EmbeddedDrawerLayout;

  // We want to pass the isDrawerOpen prop to the LayoutComponent only if the display mode is embedded
  const layoutProps = {
    hasToolbar: true,
    isDrawerOpen: displayMode === DisplayMode.Embedded && isDrawerOpen,
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
          {/*  If there is no data, don't render the Toolbar */}
          {!hasData ? null : (
            <DrawerWithToolbarWrapper
              displayMode={displayMode}
              isDrawerOpen={isDrawerOpen}
            >
              <Toolbar data-lgid={lgIds.toolbar}>
                {data?.map(toolbar => (
                  <ToolbarIconButton
                    key={toolbar.glyph}
                    glyph={toolbar.glyph}
                    label={toolbar.label}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                      if (!toolbar.content) {
                        // If the toolbar item does not have content, we don't want to open/update/close the drawer
                        // but we still want to call the onClick function if it exists. E.g. open a modal or perform an action
                        toolbar.onClick?.(event);
                        return;
                      }

                      return handleIconClick(
                        event,
                        toolbar.id,
                        toolbar.onClick,
                      );
                    }}
                    active={toolbar.id === id}
                  />
                ))}
              </Toolbar>
              <Drawer
                displayMode={displayMode}
                open={isDrawerOpen}
                onClose={handleOnClose}
                title={title}
                data-lgid={`${dataLgId}`}
              >
                {content}
              </Drawer>
            </DrawerWithToolbarWrapper>
          )}
        </LayoutComponent>
      </DrawerStackProvider>
    </LeafyGreenProvider>
  );
};

DrawerToolbarLayoutContainer.displayName = 'DrawerToolbarLayoutContainer';
