import React, { forwardRef } from 'react';

import { Toolbar, ToolbarIconButton } from '@leafygreen-ui/toolbar';

import { Drawer } from '../Drawer/Drawer';
import { DisplayMode } from '../Drawer/Drawer.types';
import { useDrawerToolbarContext } from '../DrawerToolbarContext';
import { DrawerWithToolbarWrapper } from '../DrawerWithToolbarWrapper';
import { LayoutComponent } from '../LayoutComponent';
import { DEFAULT_LGID_ROOT, getLgIds } from '../utils';

import { contentStyles } from './DrawerToolbarLayout.styles';
import {
  DrawerToolbarLayoutContainerProps,
  LayoutData,
} from './DrawerToolbarLayout.types';

/**
 * @internal
 *
 * DrawerToolbarLayoutContainer is a component that provides a layout for displaying content in a drawer with a toolbar.
 * It manages the state of the drawer and toolbar, and renders the appropriate components based on the display mode.
 */
export const DrawerToolbarLayoutContainer = forwardRef<
  HTMLDivElement,
  DrawerToolbarLayoutContainerProps
>(
  (
    {
      children,
      displayMode = DisplayMode.Overlay,
      toolbarData,
      onClose,
      darkMode: darkModeProp,
      'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
      ...rest
    }: DrawerToolbarLayoutContainerProps,
    forwardRef,
  ) => {
    const { openDrawer, closeDrawer, getActiveDrawerContent, isDrawerOpen } =
      useDrawerToolbarContext();
    const {
      id,
      title,
      content,
      scrollable = true,
    } = getActiveDrawerContent() || {};
    const lgIds = getLgIds(dataLgId);
    const hasData = toolbarData && toolbarData.length > 0;

    const handleOnClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClose?.(event);
      closeDrawer();
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
      <LayoutComponent
        {...rest}
        ref={forwardRef}
        displayMode={displayMode}
        hasToolbar={hasData}
        isDrawerOpen={isDrawerOpen}
      >
        <div className={contentStyles}>{children}</div>
        <DrawerWithToolbarWrapper
          displayMode={displayMode}
          isDrawerOpen={isDrawerOpen}
        >
          <Toolbar data-lgid={lgIds.toolbar} data-testid={lgIds.toolbar}>
            {toolbarData?.map(toolbarItem => (
              <ToolbarIconButton
                key={toolbarItem.glyph}
                glyph={toolbarItem.glyph}
                label={toolbarItem.label}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  if (!toolbarItem.content) {
                    // If the toolbar item does not have content, we don't want to open/update/close the drawer
                    // but we still want to call the onClick function if it exists. E.g. open a modal or perform an action
                    toolbarItem.onClick?.(event);
                    return;
                  }

                  return handleIconClick(
                    event,
                    toolbarItem.id,
                    toolbarItem.onClick,
                  );
                }}
                active={toolbarItem.id === id}
                disabled={toolbarItem.disabled}
              />
            ))}
          </Toolbar>
          <Drawer
            displayMode={displayMode}
            open={isDrawerOpen}
            onClose={handleOnClose}
            title={title}
            scrollable={scrollable}
            data-lgid={`${dataLgId}`}
            data-testid={`${dataLgId}`}
            aria-live="polite"
            aria-atomic="true"
          >
            {content}
          </Drawer>
        </DrawerWithToolbarWrapper>
      </LayoutComponent>
    );
  },
);

DrawerToolbarLayoutContainer.displayName = 'DrawerToolbarLayoutContainer';
