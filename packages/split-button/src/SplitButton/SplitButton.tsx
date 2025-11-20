import React from 'react';

import { Button, Size } from '@leafygreen-ui/button';
import {
  CompoundComponent,
  findChildren,
} from '@leafygreen-ui/compound-component';
import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef, useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import {
  InferredPolymorphic,
  type InferredPolymorphicComponentType,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import {
  Menu,
  SplitButtonMenuItem,
} from '../Menu';
import { getLgIds } from '../utils/getLgIds';

import {
  buttonBaseStyles,
  buttonContainerStyles,
  buttonThemeStyles,
} from './SplitButton.styles';
import {
  Align,
  type InternalSplitButtonProps,
  Justify,
  RenderMode,
  Variant,
} from './SplitButton.types';

/**
 * A Split Button combines the functionality of a dropdown Menu and a Button, allowing users to select from a primary action or the dropdown with related actions
 */
export const SplitButton = CompoundComponent(
  InferredPolymorphic<InternalSplitButtonProps, 'button'>(
    (
      {
        darkMode: darkModeProp,
        variant = Variant.Default,
        type = 'button',
        align = Align.Bottom,
        justify = Justify.End,
        size = Size.Default,
        disabled = false,
        menuItems,
        as,
        baseFontSize,
        label,
        className,
        maxHeight,
        adjustOnMutation,
        popoverZIndex,
        renderMode = RenderMode.TopLayer,
        portalClassName,
        portalContainer,
        portalRef,
        scrollContainer,
        open,
        setOpen,
        onTriggerClick,
        triggerAriaLabel,
        onChange,
        renderDarkMenu,
        'data-lgid': dataLgId,
        children,
        ...rest
      },
      ref: React.Ref<any>,
    ) => {
      const { Component } = useInferredPolymorphic(as, rest, 'button');
      const { darkMode, theme } = useDarkMode(darkModeProp);
      const lgIds = getLgIds(dataLgId);
      const containerRef = useForwardedRef(ref, null);
      const menuId = useIdAllocator({ prefix: 'lg-split-button-menu' });

      const isAnchor = Component === 'a';

      const buttonProps = {
        // only add these props if not an anchor
        ...(!isAnchor && { type }),
      } as const;

      const sharedButtonProps = {
        variant,
        size,
        baseFontSize,
        disabled,
      } as const;

      // Find SplitButton.MenuItem children
      const menuItemChildren = findChildren(children, 'isSplitButtonMenuItem');

      return (
        <div
          className={cx(buttonContainerStyles, className)}
          ref={containerRef}
          data-testid={lgIds.root}
          data-lgid={lgIds.root}
        >
          <LeafyGreenProvider darkMode={darkMode}>
            <Button
              as={Component}
            {...sharedButtonProps}
            {...buttonProps}
            className={cx(buttonBaseStyles, {
              [buttonThemeStyles(theme, variant)]: !disabled,
            })}
              data-testid={lgIds.button}
              data-lgid={lgIds.button}
              {...rest}
            >
              {label}
            </Button>
            <Menu
              {...sharedButtonProps}
              maxHeight={maxHeight}
              adjustOnMutation={adjustOnMutation}
              popoverZIndex={popoverZIndex}
              renderMode={renderMode}
              portalClassName={portalClassName}
              portalContainer={portalContainer}
              portalRef={portalRef}
              scrollContainer={scrollContainer}
              align={align}
              justify={justify}
              containerRef={containerRef}
              menuItems={menuItems}
              id={menuId}
              disabled={disabled}
              open={open}
              setOpen={setOpen}
              onTriggerClick={onTriggerClick}
              triggerAriaLabel={triggerAriaLabel}
              onChange={onChange}
              renderDarkMenu={renderDarkMenu}
              lgIds={lgIds}
            >
              {menuItemChildren}
            </Menu>
          </LeafyGreenProvider>
        </div>
      );
    },
    'SplitButton',
  ) as InferredPolymorphicComponentType<InternalSplitButtonProps>,
  {
    displayName: 'SplitButton',
    MenuItem: SplitButtonMenuItem,
  },
);
