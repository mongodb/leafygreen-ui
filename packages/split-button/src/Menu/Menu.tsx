import React, {
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

import {
  triggerBaseStyles,
  triggerSizeStyles,
  triggerThemeStyles,
} from './Menu.styles';
import { ItemClickHandler, MenuProps } from './Menu.types';

function hasOnClickHandler(
  element: React.ReactElement<unknown>,
): element is React.ReactElement<{
  onClick: React.MouseEventHandler<unknown>;
}> {
  return (
    typeof element.props === 'object' &&
    element.props !== null &&
    'onClick' in element.props &&
    typeof element.props.onClick === 'function'
  );
}

export const defaultItemClick: ItemClickHandler = (
  event,
  { close, element },
) => {
  close();
  if (hasOnClickHandler(element)) {
    element.props.onClick(event);
  }
};

/**
 * @internal
 */
export const Menu = ({
  children,
  variant,
  disabled,
  align,
  justify,
  size,
  baseFontSize,
  containerRef,
  portalRef,
  id,
  onTriggerClick,
  triggerAriaLabel,
  open: controlledOpen,
  setOpen: controlledSetOpen,
  onItemClick,
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
    switch (e.key) {
      case keyMap.Tab:
      case keyMap.Escape:
        handleClose();
        break;
    }
  };

  useEventListener('keydown', handleKeyDown, { enabled: open });
  useBackdropClick(handleClose, [buttonRef, menuRef], open);

  const enhancedChildren = useMemo(() => {
    return React.Children.map(children, (child): React.ReactNode => {
      if (isComponentType(child, 'MenuItem')) {
        return React.cloneElement(child, {
          onClick(event: React.MouseEvent<unknown>) {
            onItemClick(event, { element: child, close: handleClose });
          },
        });
      } else {
        return child;
      }
    });
  }, [handleClose, children, onItemClick]);

  return (
    <LGMenu
      data-testid="lg-split-button-menu"
      align={align}
      justify={justify}
      id={id}
      open={open}
      ref={menuRef}
      portalRef={portalRef}
      {...rest}
      trigger={
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
      }
    >
      {enhancedChildren}
    </LGMenu>
  );
};

Menu.displayName = 'Menu';
