import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Popover, { Align, Justify, PopoverProps } from '@leafygreen-ui/popover';
import { useEventListener, useEscapeKey } from '@leafygreen-ui/hooks';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { transparentize } from 'polished';
import MenuItem, { MenuItemProps } from './MenuItem';

const rootMenuStyle = css`
  width: 200px;
  border-radius: 3px;
  box-shadow: 0 2px 6px ${transparentize(0.8, uiColors.black)};
  background-color: ${uiColors.white};
  list-style: none;
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-inline-start: 0px;
`;

function isMenuItemElement(
  element: React.ReactNode,
): element is React.ReactElement<MenuItemProps, typeof MenuItem> {
  return (
    element != null &&
    typeof element === 'object' &&
    'type' in element &&
    (element.type as any).displayName === 'MenuItem'
  );
}

interface MenuProps
  extends Omit<PopoverProps, 'active' | 'spacing' | 'children'> {
  /**
   * A slot for the element used to trigger the Menu. Passing a trigger allows
   * Menu to control opening and closing itself internally.
   */
  trigger?: React.ReactElement | Function;

  /**
   * Determines the open state of the menu
   *
   * default: `false`
   */
  open?: boolean;

  /**
   * Callback to change the open state of the Menu.
   *
   */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Callback to determine whether or not Menu should close when user tries to close it.
   *
   */
  shouldClose?: () => boolean;

  children: React.ReactElement;
}

/**
 * # Menu
 *
 * Menu component
 *
 * ```
<button>
  <Menu open={true}>
    <MenuItem>Hello World!</MenuItem>
  </Menu>
</button>
```
 * @param props.children Content to appear inside of Menu.
 * @param props.open Boolean to describe whether or not Menu is open.
 * @param props.setOpen Callback to change the open state of the Menu.
 * @param props.shouldClose Callback to determine whether or not Menu should close when user tries to close it.
 * @param props.className Classname applied to Menu.
 * @param props.align Alignment of Menu relative to another element: `top`, `bottom`, `left`, `right`.
 * @param props.justify Justification of Menu relative to another element: `start`, `middle`, `end`.
 * @param props.refEl Reference element that Menu should be positioned against.
 * @param props.usePortal Boolean to describe if content should be portaled to end of DOM, or appear in DOM tree.
 * @param props.trigger Trigger element can be ReactNode or function, and, if present, internally manages active state of Menu.
 */
function Menu({
  align = Align.Bottom,
  justify = Justify.End,
  usePortal = true,
  adjustOnMutation = false,
  shouldClose = () => true,
  open: controlledOpen,
  setOpen: controlledSetOpen,
  children,
  className,
  refEl,
  trigger,
  ...rest
}: MenuProps) {
  const [focused, setFocused] = useState(0);

  const refs: Array<HTMLElement> = [];
  const menuitems: Array<React.ReactElement> = [];

  const updateChildren = (
    childset: React.ReactElement,
  ): Array<React.ReactElement> => {
    return React.Children.map(childset, child => {
      if (isMenuItemElement(child)) {
        menuitems.push(child);
        return React.cloneElement(child, {
          ref: (ref: HTMLElement) => refs.push(ref),
        });
      }

      if (typeof child.props.children === 'object') {
        return React.cloneElement(child, {
          children: updateChildren(child.props.children),
        });
      }

      return child;
    });
  };

  const updatedChildren = updateChildren(children);

  const enabledIndexes = menuitems.reduce(
    (acc, child, index) => {
      if (child.props.disabled) {
        return acc;
      }

      return [...acc, index];
    },
    [] as Array<number>,
  );
  const enabledCurrentIndex = enabledIndexes.indexOf(focused!);

  const isControlled = typeof controlledOpen === 'boolean';
  const [uncontrolledOpen, uncontrolledSetOpen] = useState(false);
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = isControlled ? controlledSetOpen : uncontrolledSetOpen;

  const popoverRef: React.RefObject<HTMLUListElement> = useRef(null);

  const handleClose = () => {
    if (shouldClose()) {
      setOpen(false);
    }
  };

  const handleBackdropClick = (e: MouseEvent) => {
    const popoverReference = popoverRef && popoverRef.current;

    if (
      popoverReference &&
      !popoverReference.contains(e.target as HTMLElement)
    ) {
      handleClose();
    }
  };

  const enabled = open;

  useEventListener('click', handleBackdropClick, {
    enabled,
  });

  useEscapeKey(handleClose, { enabled });

  function handleKeyDown(e: KeyboardEvent) {
    let focusedIndex: number;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        focusedIndex =
          enabledIndexes[(enabledCurrentIndex + 1) % enabledIndexes.length];
        setFocused(focusedIndex);
        refs[focusedIndex].focus();
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        focusedIndex =
          enabledIndexes[
            (enabledCurrentIndex - 1 + enabledIndexes.length) %
              enabledIndexes.length
          ];
        setFocused(focusedIndex);
        refs[focusedIndex].focus();
        break;

      case ' ':
      case 'Space Bar':
      case 'Enter':
        focusedIndex = enabledIndexes[0];
        setFocused(focusedIndex);
        refs[focusedIndex].focus();
        break;

      case 'Tab':
        e.preventDefault();
        setOpen(false);
        break;
    }
  }

  useEventListener('keydown', handleKeyDown, {
    enabled,
  });

  const handleClick = () => {
    setOpen((curr: boolean) => !curr);

    const focusedIndex = enabledIndexes[0];
    setFocused(focusedIndex);
    refs[focusedIndex].focus();
  };

  const popoverContent = (
    <Popover
      key="popover"
      active={open || uncontrolledOpen}
      align={align}
      justify={justify}
      refEl={refEl}
      usePortal={usePortal}
      spacing={15}
      adjustOnMutation={adjustOnMutation}
    >
      <ul
        {...rest}
        className={cx(rootMenuStyle, className)}
        role="menu"
        ref={popoverRef}
      >
        {updatedChildren}
      </ul>
    </Popover>
  );

  if (trigger) {
    if (typeof trigger === 'function') {
      return trigger({
        onClick: handleClick,
        children: popoverContent,
      });
    }

    return React.cloneElement(trigger, {
      onClick: (e: React.MouseEvent) => {
        handleClick();

        if (trigger.props.onClick) {
          trigger.props.onClick(e);
        }
      },
      children: [...trigger.props.children, popoverContent],
    });
  }

  return popoverContent;
}

Menu.displayName = 'Menu';

Menu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  align: PropTypes.oneOf(Object.values(Align)),
  justify: PropTypes.oneOf(Object.values(Justify)),
  refEl: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  usePortal: PropTypes.bool,
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default Menu;
