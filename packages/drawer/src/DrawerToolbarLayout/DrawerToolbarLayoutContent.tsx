import React, { forwardRef, useEffect } from 'react';

import { Toolbar, ToolbarIconButton } from '@leafygreen-ui/toolbar';

import { Drawer } from '../Drawer/Drawer';
import { useDrawerLayoutContext } from '../DrawerLayout';
import { useDrawerToolbarContext } from './DrawerToolbarContext/DrawerToolbarContext';
import { DrawerWithToolbarWrapper } from './DrawerWithToolbarWrapper/DrawerWithToolbarWrapper';
import { LayoutComponent } from '../LayoutComponent';
import { DEFAULT_LGID_ROOT, getLgIds } from '../utils';

import { contentStyles } from './DrawerToolbarLayout.styles';
import {
  DrawerToolbarLayoutContentProps,
  LayoutData,
} from './DrawerToolbarLayout.types';

/**
 * @internal
 *
 * DrawerToolbarLayoutContent is a component that provides a layout for displaying content in a drawer with a toolbar.
 * It manages the state of the drawer and toolbar, and renders the appropriate components based on the display mode.
 */
export const DrawerToolbarLayoutContent = forwardRef<
  HTMLDivElement,
  DrawerToolbarLayoutContentProps
>(
  (
    {
      children,
      toolbarData,
      darkMode: darkModeProp,
      'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
      ...rest
    }: DrawerToolbarLayoutContentProps,
    forwardRef,
  ) => {
    const { openDrawer, closeDrawer, getActiveDrawerContent, isDrawerOpen } =
      useDrawerToolbarContext();
    const { id, title, content } = getActiveDrawerContent() || {};
    const { onClose, displayMode, setIsDrawerOpen } = useDrawerLayoutContext();

    useEffect(() => {
      setIsDrawerOpen(isDrawerOpen);
    }, [isDrawerOpen, setIsDrawerOpen]);

    const lgIds = getLgIds(dataLgId);

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
      <LayoutComponent {...rest} ref={forwardRef}>
        <div className={contentStyles}>{children}</div>
        <DrawerWithToolbarWrapper>
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

DrawerToolbarLayoutContent.displayName = 'DrawerToolbarLayoutContent';
