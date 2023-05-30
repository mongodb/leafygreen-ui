import React from 'react';
import PropTypes from 'prop-types';

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
import { BaseFontSize } from '@leafygreen-ui/tokens';

import { Menu } from '../Menu';

import {
  buttonBaseStyles,
  buttonContainerStyles,
  buttonThemeStyles,
} from './SplitButton.styles';
import { Align, Justify, SplitButtonProps, Variant } from './SplitButton.types';

export const SplitButton = InferredPolymorphic<SplitButtonProps, 'button'>(
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
      usePortal,
      portalClassName,
      portalContainer,
      scrollContainer,
      open,
      setOpen,
      onTriggerClick,
      triggerAriaLabel,
      onChange,
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
      ...(!isAnchor && { disabled, type }),
    };

    const sharedButtonProps = { variant, size, baseFontSize };

    return (
      <div className={cx(buttonContainerStyles, className)} ref={containerRef}>
        <LeafyGreenProvider darkMode={darkMode}>
          {/* TODO: remove when Button is updated to use `InferredPolymorphic` */}
          {/* https://jira.mongodb.org/browse/LG-3260 */}
          {/* @ts-expect-error - Types of property `href` are incompatible. Button types href as string, but InferredPolymorphicProps types it as NodeUrlLike | ((string | NodeUrlLike) & string). This should not be an issue once Button is also using InferredPolymorphic. */}
          <Button
            as={Component}
            {...sharedButtonProps}
            {...buttonProps}
            className={cx(buttonBaseStyles, {
              [buttonThemeStyles(theme, variant)]: !disabled,
            })}
            {...rest}
          >
            {label}
          </Button>
          <Menu
            {...sharedButtonProps}
            maxHeight={maxHeight}
            adjustOnMutation={adjustOnMutation}
            popoverZIndex={popoverZIndex}
            usePortal={usePortal}
            portalClassName={portalClassName}
            portalContainer={portalContainer}
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
          />
        </LeafyGreenProvider>
      </div>
    );
  },
  'SplitButton',
);

SplitButton.displayName = 'SplitButton';

SplitButton.propTypes = {
  darkMode: PropTypes.bool,
  className: PropTypes.string,
  align: PropTypes.oneOf(Object.values(Align)),
  justify: PropTypes.oneOf(Object.values(Justify)),
  variant: PropTypes.oneOf(Object.values(Variant)),
  label: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.element).isRequired,
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
  disabled: PropTypes.bool,
  leftGlyph: PropTypes.element,
  onChange: PropTypes.func,
  onTriggerClick: PropTypes.func,
  triggerAriaLabel: PropTypes.string,
  // Popover Props
  popoverZIndex: PropTypes.number,
  scrollContainer:
    typeof window !== 'undefined'
      ? PropTypes.instanceOf(Element)
      : PropTypes.any,
  portalContainer:
    typeof window !== 'undefined'
      ? PropTypes.instanceOf(Element)
      : PropTypes.any,
  portalClassName: PropTypes.string,
} as any;
