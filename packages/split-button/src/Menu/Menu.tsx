import React, {
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import { useBackdropClick, useEventListener } from '@leafygreen-ui/hooks';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType, keyMap } from '@leafygreen-ui/lib';
import { Menu as LGMenu } from '@leafygreen-ui/menu';

import { MenuItemType } from '../SplitButton';

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
  onChange,
  triggerAriaLabel,
  open: controlledOpen,
  setOpen: controlledSetOpen,
  ...rest
}: MenuProps) => {
  const { theme } = useDarkMode();
  const [uncontrolledOpen, uncontrolledSetOpen] = useState<boolean>(false);
  const buttonRef = useRef<null | HTMLButtonElement>(null);
  const menuRef = useRef<null | HTMLDivElement>(null);

  // TODO: make hook
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

  const handleClose = useCallback(() => {
    buttonRef.current?.focus();
    setOpen(false);
  }, [setOpen]);

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

  const renderMenuItems = useMemo(() => {
    const onMenuItemClick = (e: MouseEvent, menuItem: MenuItemType) => {
      handleClose();
      menuItem.props.onClick?.(e);
      onChange?.(e);
    };

    const renderMenuItem = (menuItem: MenuItemType) => {
      if (isComponentType(menuItem, 'MenuItem')) {
        return React.cloneElement(menuItem, {
          active: false,
          key: `menuItem-${menuItem.key}`,
          onClick: (e: MouseEvent) => onMenuItemClick(e, menuItem),
        });
      } else {
        console.warn(
          'Please use a LeafyGreen <MenuItem /> component. Received: ',
          menuItem,
        );
      }
    };

    if (Array.isArray(menuItems) && menuItems.length) {
      return menuItems.map(
        (menuItem: MenuItemType): MenuItemType | undefined => {
          if (menuItem == null) {
            return menuItem;
          }

          return renderMenuItem(menuItem);
        },
      );
    }
  }, [handleClose, menuItems, onChange]);

  return (
    <>
      <Button
        type="button"
        disabled={disabled}
        leftGlyph={<Icon glyph="CaretDown" />}
        variant={variant}
        size={size}
        baseFontSize={baseFontSize}
        className={cx(triggerBaseStyles, triggerSizeStyles[size], {
          [triggerThemeStyles(theme, variant)]: !disabled,
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
        {renderMenuItems}
      </LGMenu>
    </>
  );
};

Menu.displayName = 'Menu';
