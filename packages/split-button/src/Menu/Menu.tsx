import React, {
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  useRef,
  useState,
} from 'react';
import isEmpty from 'lodash/isEmpty';

import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import { useBackdropClick, useEventListener } from '@leafygreen-ui/hooks';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType, keyMap } from '@leafygreen-ui/lib';
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
  onTriggerClick,
  triggerAriaLabel,
  open: controlledOpen,
  setOpen: controlledSetOpen,
  ...rest
}: MenuProps) => {
  const { theme } = useDarkMode();
  const [uncontrolledOpen, uncontrolledSetOpen] = useState<boolean>(false);
  const buttonRef = useRef<null | HTMLButtonElement>(null);
  const menuRef = useRef<null | HTMLDivElement>(null);

  const setOpen =
    (typeof controlledOpen === 'boolean' && controlledSetOpen) ||
    uncontrolledSetOpen;
  const open = controlledOpen ?? uncontrolledOpen;

  const handleTriggerClick: MouseEventHandler = e => {
    onTriggerClick?.(e);
    if (typeof controlledOpen !== 'boolean') {
      setOpen(o => !o);
    }
  };

  const handleClose = () => {
    buttonRef.current?.focus();
    setOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case keyMap.Tab:
      case keyMap.Escape:
        handleClose();
        break;
    }
  };

  useEventListener('keydown', handleKeyDown, { enabled: open });
  useBackdropClick(handleClose, [buttonRef, menuRef], open);

  const renderMenuItems = () => {
    const onMenuItemClick = (
      e: MouseEvent,
      menuItem: ReactElement<MenuItemProps>,
    ) => {
      handleClose();
      // @ts-expect-error - onClick is inferred from inferredPolymorphic
      menuItem.props.onClick?.(e);
    };

    const renderMenuItem = (
      menuItem: ReactElement<MenuItemProps>,
      index = 0,
    ) => {
      if (isComponentType(menuItem, 'MenuItem')) {
        return React.cloneElement(menuItem, {
          active: false,
          key: `menuItem-${index}`,
          // @ts-expect-error - onClick is inferred from inferredPolymorphic
          onClick: (e: MouseEvent) => onMenuItemClick(e, menuItem),
        });
      } else {
        console.warn('Please use a LeafyGreen <MenuItem> component.');
      }
    };

    if (menuItems) {
      if ('props' in menuItems) {
        if (!isEmpty(menuItems.props)) {
          // Array of menuItems
          if (Array.isArray(menuItems.props.children)) {
            return menuItems.props.children.map(
              (
                menuItem: ReactElement<MenuItemProps>,
                index: number,
              ): ReactElement<MenuItemProps> | undefined => {
                if (menuItem == null) {
                  return menuItem;
                }

                return renderMenuItem(menuItem, index);
              },
            );
          }

          // Object with one menuItem
          // React returns an object instead of an array if there is one item
          return renderMenuItem(menuItems.props.children);
        }
      }
    }
  };

  return (
    <>
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
        aria-label={triggerAriaLabel || 'More options'}
        aria-controls={open ? id : ''}
        onClick={handleTriggerClick}
        ref={buttonRef}
        aria-expanded={open}
        aria-haspopup={true}
      />
      <LGMenu
        data-testid="lg-split-button-menu"
        align={align}
        justify={justify}
        id={id}
        open={open}
        ref={menuRef}
        {...rest}
      >
        {renderMenuItems()}
      </LGMenu>
    </>
  );
};

Menu.displayName = 'Menu';
