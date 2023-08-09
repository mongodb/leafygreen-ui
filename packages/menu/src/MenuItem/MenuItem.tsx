import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, getNodeTextContent } from '@leafygreen-ui/lib';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import MenuContext from '../MenuContext/MenuContext';
import {
  activeDescriptionTextStyle,
  activeIconStyle,
  activeMenuItemContainerStyle,
  activeTitleTextStyle,
  descriptionTextThemeStyle,
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
import { useDescendant } from '../utils/useDescendants';

import { disabledIconStyle } from './MenuItem.styles';
import { MenuItemProps } from './MenuItem.types';

const menuItemContainerClassName = createUniqueClassName('menu-item-container');

export const MenuItem = InferredPolymorphic<MenuItemProps, 'button'>(
  (
    {
      as,
      disabled = false,
      active = false,
      size = Size.Default,
      className,
      children,
      description,
      glyph,
      ...rest
    },
    __,
  ) => {
    const { ref } = useDescendant({ disabled });
    const { Component } = useInferredPolymorphic(as, rest, 'button');
    const { theme } = useContext(MenuContext);
    const hoverStyles = getHoverStyles(menuItemContainerClassName, theme);
    const focusStyles = getFocusedStyles(menuItemContainerClassName, theme);

    const isAnchor = Component === 'a';

    const updatedGlyph =
      glyph &&
      React.cloneElement(glyph, {
        role: 'presentation',
        className: cx(
          mainIconBaseStyle,
          mainIconThemeStyle[theme],
          focusStyles.iconStyle,
          {
            [activeIconStyle[theme]]: active,
            [disabledIconStyle[theme]]: disabled,
          },
          glyph.props?.className,
        ),
      });

    const baseProps = {
      ref,
      role: 'menuitem',
      tabIndex: -1,
      'aria-disabled': disabled,
      'aria-current': active ?? undefined,
      // only add a disabled prop if not an anchor
      ...(!isAnchor && { disabled }),
    };

    const anchorProps = isAnchor
      ? {
          target: '_self',
          rel: '',
        }
      : {};

    const content = (
      <>
        {updatedGlyph}
        <div className={textContainer}>
          <div
            // Add text as data attribute to ensure no layout shift on hover
            data-text={getNodeTextContent(children)}
            className={cx(
              titleTextStyle,
              hoverStyles.text,
              {
                [activeTitleTextStyle[theme]]: active,
                [hoverStyles.activeText]: active,
                [disabledTextStyle[theme]]: disabled,
              },
              focusStyles.textStyle,
            )}
          >
            {children}
          </div>
          {description && (
            <div
              className={cx(
                descriptionTextThemeStyle[theme],
                {
                  [activeDescriptionTextStyle[theme]]: active,
                  [disabledTextStyle[theme]]: disabled,
                  [linkDescriptionTextStyle]: isAnchor,
                },
                focusStyles.descriptionStyle,
              )}
            >
              {description}
            </div>
          )}
        </div>
      </>
    );

    return (
      <li role="none">
        <Component
          {...baseProps}
          {...anchorProps}
          {...rest}
          className={cx(
            menuItemContainerClassName,
            menuItemContainerStyle,
            menuItemContainerThemeStyle[theme],
            menuItemHeight(size),
            linkStyle,
            {
              [activeMenuItemContainerStyle[theme]]: active,
              [disabledMenuItemContainerThemeStyle[theme]]: disabled,
            },
            focusedMenuItemContainerStyle[theme],
            className,
          )}
        >
          {content}
        </Component>
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
