import React, { ComponentType, ReactElement } from 'react';
import isEmpty from 'lodash/isEmpty';

import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { Menu as LGMenu, MenuItemProps } from '@leafygreen-ui/menu';

import {
  triggerBaseStyles,
  triggerSizeStyles,
  triggerThemeStyles,
} from './Menu.styles';
import { MenuProps } from './Menu.types';

/**
 * @internal
 */
export const Menu = ({
  variant,
  disabled,
  align,
  justify,
  size,
  baseFontSize,
  menuItems,
  containerRef,
  id,
  ...rest
}: MenuProps) => {
  const { theme } = useDarkMode();

  const renderMenuItems = () => {
    if (menuItems) {
      if ('props' in menuItems) {
        if (!isEmpty(menuItems.props)) {
          // Array of menuItems
          if (Array.isArray(menuItems.props.children)) {
            return menuItems.props.children.map(
              (
                menuItem: ComponentType<MenuItemProps>,
                index: number,
              ): ReactElement | undefined => {
                if (menuItem == null) {
                  return menuItem;
                }

                if (isComponentType(menuItem, 'MenuItem')) {
                  return React.cloneElement(menuItem, {
                    active: false,
                    key: `menuItem-${index}`,
                  });
                }
              },
            );
          }

          // Object with one menuItem
          // React returns an object instead of an array if there is one item
          const menuItem = menuItems.props.children;

          if (isComponentType(menuItem, 'MenuItem')) {
            return React.cloneElement(menuItem, {
              active: false,
            });
          }
        }
      }
    }
  };

  return (
    <LGMenu
      data-testid="lg-split-button-menu"
      align={align}
      justify={justify}
      refEl={containerRef}
      trigger={
        <Button
          type="button"
          disabled={disabled}
          leftGlyph={<Icon glyph="CaretDown" />}
          variant={variant}
          size={size}
          baseFontSize={baseFontSize}
          className={cx(triggerBaseStyles, triggerSizeStyles[size!], {
            [triggerThemeStyles(theme, variant!)]: !disabled,
          })}
          aria-label="More options" // TODO: should this be a prop for consumers?
          aria-haspopup={true}
          aria-owns={id}
        />
      }
      id={id}
      {...rest}
    >
      {renderMenuItems()}
    </LGMenu>
  );
};

Menu.displayName = 'Menu';
