import React, { forwardRef, useLayoutEffect } from 'react';

import { Toolbar, ToolbarIconButton } from '@leafygreen-ui/toolbar';

import { Drawer } from '../../Drawer/Drawer';
import { useDrawerLayoutContext } from '../../DrawerLayout';
import { LayoutComponent } from '../../LayoutComponent';
import { DEFAULT_LGID_ROOT, getLgIds } from '../../utils';
import { useDrawerToolbarContext } from '../DrawerToolbarContext/DrawerToolbarContext';

import {
  DrawerToolbarLayoutContentProps,
  LayoutData,
} from './DrawerToolbarLayout.types';

/**
 * @internal
 *
 * DrawerToolbarLayoutContent is a component that provides a layout for displaying content in a drawer with a toolbar.
 * It manages the state of the drawer and toolbar, and renders the appropriate components based on the display mode.
 *
 * If all toolbar items are not visible, the toolbar will not be rendered.
 */
export const DrawerToolbarLayoutContent = forwardRef<
  HTMLDivElement,
  DrawerToolbarLayoutContentProps
>(
  (
    {
      children,
      darkMode: darkModeProp,
      'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
      ...rest
    }: DrawerToolbarLayoutContentProps,
    forwardRef,
  ) => {
    const {
      openDrawer,
      closeDrawer,
      getActiveDrawerContent,
      isDrawerOpen,
      visibleToolbarItems,
      shouldRenderToolbar,
    } = useDrawerToolbarContext();
    const {
      id,
      title,
      content,
      hasPadding = true,
      scrollable = true,
    } = getActiveDrawerContent() || {};
    const { onClose, displayMode, setIsDrawerOpen, setHasToolbar } =
      useDrawerLayoutContext();
    const lgIds = getLgIds(dataLgId);

    // runs synchronously after the DOM is updated and before the browser paints to avoid flickering of the toolbar
    useLayoutEffect(() => {
      setIsDrawerOpen(isDrawerOpen);
    }, [isDrawerOpen, setIsDrawerOpen]);

    // runs synchronously after the DOM is updated and before the browser paints to avoid flickering of the toolbar
    useLayoutEffect(() => {
      setHasToolbar(shouldRenderToolbar);
    }, [shouldRenderToolbar, setHasToolbar]);

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

    const renderDrawer = () => {
      return (
        <Drawer
          displayMode={displayMode}
          open={isDrawerOpen}
          onClose={handleOnClose}
          title={title}
          hasPadding={hasPadding}
          scrollable={scrollable}
          data-lgid={`${dataLgId}`}
          data-testid={`${dataLgId}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {content}
        </Drawer>
      );
    };

    const renderToolbar = () => {
      return (
        <Toolbar data-lgid={lgIds.toolbar} data-testid={lgIds.toolbar}>
          {visibleToolbarItems?.map(toolbarItem => (
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
              ref={toolbarItem.ref}
              tooltipEnabled={toolbarItem.tooltipEnabled}
            />
          ))}
        </Toolbar>
      );
    };

    const renderDrawerWithToolbar = () => (
      <>
        {renderToolbar()}
        {renderDrawer()}
      </>
    );

    return (
      <LayoutComponent
        {...rest}
        ref={forwardRef}
        panelContent={
          shouldRenderToolbar ? renderDrawerWithToolbar() : renderDrawer()
        }
      >
        {children}
      </LayoutComponent>
    );
  },
);

DrawerToolbarLayoutContent.displayName = 'DrawerToolbarLayoutContent';
