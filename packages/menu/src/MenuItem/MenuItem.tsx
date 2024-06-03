import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useDescendant } from '@leafygreen-ui/descendants';
import { css, cx } from '@leafygreen-ui/emotion';
import { InputOption, InputOptionContent } from '@leafygreen-ui/input-option';
import { createUniqueClassName, getNodeTextContent } from '@leafygreen-ui/lib';
import {
  InferredPolymorphic,
  PolymorphicAs,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';
import { spacing } from '@leafygreen-ui/tokens';
import { Description } from '@leafygreen-ui/typography';

import { MenuContext, MenuDescendantsContext } from '../MenuContext';
import {
  activeDescriptionTextStyle,
  activeIconStyle,
  activeMenuItemContainerStyle,
  activeTitleTextStyle,
  descriptionTextThemeStyle,
  destructiveTextStyle,
  disabledMenuItemContainerThemeStyle,
  disabledTextStyle,
  focusedMenuItemContainerStyle,
  getFocusedStyles,
  getHoverStyles,
  linkDescriptionTextStyle,
  linkStyle,
  mainIconBaseStyle,
  mainIconThemeStyle,
  menuItemContainerStyle,
  menuItemContainerThemeStyle,
  menuItemHeight,
  textContainer,
  titleTextStyle,
} from '../styles';
import { Size } from '../types';

import {
  destructiveIconStyle,
  disabledIconStyle,
  menuItemContainerStyles,
} from './MenuItem.styles';
import { MenuItemProps, Variant } from './MenuItem.types';

const menuItemContainerClassName = createUniqueClassName('menu-item-container');

export const MenuItem = InferredPolymorphic<MenuItemProps, 'button'>(
  (
    {
      as = 'button' as PolymorphicAs,
      disabled = false,
      active = false,
      size = Size.Default,
      className,
      children,
      description,
      glyph,
      variant = Variant.Default,
      ...rest
    },
    fwdRef: React.Ref<any>,
  ) => {
    // const { Component } = useInferredPolymorphic(as, rest, 'button');
    const { theme, highlightIndex } = useContext(MenuContext);
    const { index, ref } = useDescendant(MenuDescendantsContext, fwdRef, {
      active,
      disabled,
    });

    const isHighlighted = index === highlightIndex;

    // const hoverStyles = getHoverStyles(menuItemContainerClassName, theme);
    // const focusStyles = getFocusedStyles(menuItemContainerClassName, theme);
    // const isDestructive = variant === Variant.Destructive;
    // const showActiveStyles = active && !isDestructive;

    const conditionalProps =
      as === 'a'
        ? {
            target: '_self',
            rel: '',
          }
        : { disabled };

    return (
      <li role="none" ref={ref} className={menuItemContainerStyles}>
        <InputOption
          showWedge
          as={as}
          role="menuitem"
          tabIndex={-1}
          data-index={index}
          aria-disabled={disabled}
          aria-current={active ?? undefined}
          highlighted={isHighlighted}
          {...conditionalProps}
          {...rest}
          className={css`
            width: 100%;
            min-height: ${size === Size.Large ? spacing[1200] : spacing[800]}px;
            padding-block: ${spacing[50]}px;
          `}
        >
          <InputOptionContent
            leftGlyph={glyph}
            description={description}
            preserveIconSpace={false}
            className={cx({
              [css`
                padding-inline-start: ${spacing[300]}px;
              `]: !glyph,
            })}
          >
            <div
              className={css`
                font-weight: 500;
              `}
            >
              {children}
            </div>
          </InputOptionContent>
        </InputOption>
      </li>
    );
  },
  'MenuItem',
);

MenuItem.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  description: PropTypes.node,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  children: PropTypes.node,
};

export default MenuItem;
