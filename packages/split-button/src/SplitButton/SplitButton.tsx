import React from 'react';

import Button, { Size } from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef, useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';
import { RenderMode } from '@leafygreen-ui/popover';

import { LGIDs } from '../constants';
import { Menu } from '../Menu';

import {
  buttonBaseStyles,
  buttonContainerStyles,
  buttonThemeStyles,
} from './SplitButton.styles';
import {
  Align,
  InternalSplitButtonProps,
  Justify,
  Variant,
} from './SplitButton.types';

export const SplitButton = InferredPolymorphic<
  InternalSplitButtonProps,
  'button'
>(
  (
    {
      darkMode: darkModeProp,
      variant = Variant.Default,
      type = 'button',
      align = Align.Bottom,
      justify = Justify.End,
      size = Size.Default,
      disabled = false,
      menuItems = [],
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
      'data-testid': testId = LGIDs.root,
      ...rest
    },
    ref: React.Ref<any>,
  ) => {
    const { Component } = useInferredPolymorphic(as, rest, 'button');
    const { darkMode, theme } = useDarkMode(darkModeProp);
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

    return (
      <div
        className={cx(buttonContainerStyles, className)}
        ref={containerRef}
        data-testid={testId}
        data-lgid={LGIDs.root}
      >
        <LeafyGreenProvider darkMode={darkMode}>
          <Button
            as={Component}
            {...sharedButtonProps}
            {...buttonProps}
            className={cx(buttonBaseStyles, {
              [buttonThemeStyles(theme, variant)]: !disabled,
            })}
            data-testid={LGIDs.button}
            data-lgid={LGIDs.button}
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
          />
        </LeafyGreenProvider>
      </div>
    );
  },
  'SplitButton',
);

SplitButton.displayName = 'SplitButton';
