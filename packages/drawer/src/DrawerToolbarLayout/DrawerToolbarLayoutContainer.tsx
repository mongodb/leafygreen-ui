import React, { forwardRef, useState } from 'react';

import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { Toolbar, ToolbarIconButton } from '@leafygreen-ui/toolbar';
import { Body } from '@leafygreen-ui/typography';

import { Drawer } from '../Drawer/Drawer';
import { DisplayMode } from '../Drawer/Drawer.types';
import { DrawerWithToolbarWrapper } from '../DrawerWithToolbarWrapper';
import { LayoutComponent } from '../LayoutComponent';

import { contentStyles } from './DrawerToolbarLayout.styles';
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

export const DrawerToolbarLayoutContainer = forwardRef<
  HTMLDivElement,
  DrawerToolbarLayoutContainerProps
>(
  (
    {
      children,
      displayMode = DisplayMode.Embedded,
      toolbarData,
      onClose,
      darkMode: darkModeProp,
      ...rest
    }: DrawerToolbarLayoutContainerProps,
    forwardRef,
  ) => {
    const [open, setOpen] = useState(false);

    const handleOnClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClose?.(event);
      setOpen(false);

      // TODO: add call to context to update the drawer content
    };

    const handleIconClick = (
      event: React.MouseEvent<HTMLButtonElement>,
      onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    ) => {
      onClick?.(event);
      setOpen(true);
    };

    return (
      <LayoutComponent
        {...rest}
        ref={forwardRef}
        displayMode={displayMode}
        hasToolbar
        isDrawerOpen={open}
      >
        <div className={contentStyles}>{children}</div>
        <DrawerWithToolbarWrapper displayMode={displayMode} isDrawerOpen={open}>
          <Toolbar>
            {toolbarData?.map(toolbarItem => (
              <ToolbarIconButton
                key={toolbarItem.glyph}
                glyph={toolbarItem.glyph}
                label={toolbarItem.label}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  handleIconClick(e, toolbarItem.onClick)
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
    );
  },
);

DrawerToolbarLayoutContainer.displayName = 'DrawerToolbarLayoutContainer';
