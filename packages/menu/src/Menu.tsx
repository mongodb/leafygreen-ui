import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Popover, { Align, Justify, PopoverProps } from '@leafygreen-ui/popover';
import { useEventListener, useEscapeKey } from '@leafygreen-ui/hooks';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { transparentize } from 'polished';

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

interface MenuProps extends Omit<PopoverProps, 'active' | 'spacing'> {
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
  setOpen: (
    open: boolean,
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Callback to determine whether or not Menu should close when user tries to close it.
   *
   */
  shouldClose?: () => boolean;
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
  const childrenArray = React.Children.toArray(children);

  const getMenuitems = childArray => {
    return childArray.reduce((acc, child) => {
      if (child.type.displayName === 'MenuItem') {
        return [...acc, child];
      }

      if (typeof child.props.children === 'object') {
        return [...acc, ...getMenuitems(child.props.children)];
      }

      return acc;
    }, []);
  };

  const menuitems = getMenuitems(childrenArray);

  const getActiveMenuItems = () => {
    return menuitems.findIndex(child => child.props.active);
  };

  const isControlled = typeof controlledSetOpen === 'function';
  const [uncontrolledOpen, uncontrolledSetOpen] = useState(false);
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = isControlled ? controlledSetOpen : uncontrolledSetOpen;

  const [selected, setSelected] = useState(getActiveMenuItems());

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

  function handleKeyDown(e: React.KeyboardEvent) {
    const enabledIndexes = menuitems.reduce(
      (acc, child, index) => {
        if (child.props.disabled) {
          return acc;
        }

        return [...acc, index];
      },
      [] as Array<number>,
    );

    const enabledCurrentIndex = enabledIndexes.indexOf(selected!);

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        setSelected(
          enabledIndexes[(enabledCurrentIndex + 1) % enabledIndexes.length],
        );
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        setSelected(
          enabledIndexes[
            (enabledCurrentIndex - 1 + enabledIndexes.length) %
              enabledIndexes.length
          ],
        );
        break;
    }
  }

  useEventListener('keydown', handleKeyDown, {
    enabled,
  });

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
        {children}
      </ul>
    </Popover>
  );

  if (trigger) {
    if (typeof trigger === 'function') {
      return trigger({
        onClick: () =>
          uncontrolledSetOpen(uncontrolledOpen => !uncontrolledOpen),
        children: popoverContent,
      });
    }

    return React.cloneElement(trigger, {
      onClick: (e: React.MouseEvent) => {
        uncontrolledSetOpen(uncontrolledOpen => !uncontrolledOpen);

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
  refEl: PropTypes.object,
  usePortal: PropTypes.bool,
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default Menu;
