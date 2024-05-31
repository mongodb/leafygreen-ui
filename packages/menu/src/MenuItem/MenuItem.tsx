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
    const { theme, highlightIndex: _highlightIndex } = useContext(MenuContext);
    const { index: _index, ref } = useDescendant(
      MenuDescendantsContext,
      fwdRef,
      {
        active,
        disabled,
      },
    );
    const hoverStyles = getHoverStyles(menuItemContainerClassName, theme);
    const focusStyles = getFocusedStyles(menuItemContainerClassName, theme);
    const isDestructive = variant === Variant.Destructive;
    const showActiveStyles = active && !isDestructive;

    const updatedGlyph =
      glyph &&
      React.cloneElement(glyph, {
        role: 'presentation',
        className: cx(
          mainIconBaseStyle,
          mainIconThemeStyle[theme],
          focusStyles.iconStyle,
          {
            [activeIconStyle[theme]]: showActiveStyles,
            [destructiveIconStyle[theme]]: isDestructive,
            [disabledIconStyle[theme]]: disabled,
          },
          glyph.props?.className,
        ),
      });

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
          aria-disabled={disabled}
          aria-current={active ?? undefined}
          highlighted={active}
          {...conditionalProps}
          {...rest}
          className={css`
            width: 100%;
            min-height: ${spacing[800]}px;
            padding-block: ${spacing[50]}px;
            padding-inline-start: ${glyph ? spacing[400] : spacing[600]}px;
          `}
        >
          <InputOptionContent
            className={css`
              grid-template-areas: '${glyph
                ? 'left-glyph'
                : 'text'} text ${'text'}';
            `}
            leftGlyph={glyph}
            description={description}
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
