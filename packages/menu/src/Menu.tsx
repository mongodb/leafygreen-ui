import React, { useState, useRef, SetStateAction } from 'react';
import PropTypes from 'prop-types';
import Popover, { Align, Justify, PopoverProps } from '@leafygreen-ui/popover';
import { useEventListener } from '@leafygreen-ui/hooks';
import { css, cx } from '@leafygreen-ui/emotion';
import { colors } from '@leafygreen-ui/theme';

const rootMenuStyle = css`
  width: 200px;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  background-color: ${colors.mongodb.white};
`;

interface MenuProps extends Omit<PopoverProps, 'spacing, active'> {
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
  setOpen: (open: boolean) => void | React.Dispatch<SetStateAction<boolean>>;

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
  <Menu active={true}>
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

const escapeKey = 27;

function Menu({
  align = Align.Bottom,
  justify = Justify.End,
  usePortal = true,
  adjustOnMutation = false,
  open = false,
  shouldClose = () => true,
  setOpen,
  children,
  className,
  refEl,
  trigger,
  ...rest
}: MenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const popoverRef: React.RefObject<HTMLDivElement> = useRef(null);

  const handleClose = () => {
    if (setOpen && shouldClose()) {
      setOpen(false);
    }

    if (!setOpen && shouldClose()) {
      setUncontrolledOpen(false);
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

  const enabled = open || uncontrolledOpen;

  useEventListener('click', handleBackdropClick, {
    enabled,
  });

  const handleEscape = (e: KeyboardEvent) => {
    e.stopImmediatePropagation();

    if (e.keyCode === escapeKey) {
      handleClose();
    }
  };

  useEventListener('keydown', handleEscape, {
    enabled,
  });

  const popoverContent = (
    <Popover
      key="popover"
      active={setOpen ? open : uncontrolledOpen}
      align={align}
      justify={justify}
      refEl={refEl}
      usePortal={usePortal}
      spacing={15}
      adjustOnMutation={adjustOnMutation}
    >
      <div
        {...rest}
        className={cx(rootMenuStyle, className)}
        role="menu"
        ref={popoverRef}
      >
        {children}
      </div>
    </Popover>
  );

  if (trigger) {
    if (typeof trigger === 'function') {
      return trigger({
        onClick: () => setUncontrolledOpen(open => !open),
        children: popoverContent,
      });
    }

    return React.cloneElement(trigger, {
      onClick: (e: React.MouseEvent) => {
        setUncontrolledOpen(open => !open);

        if (trigger.props && trigger.props.onClick) {
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
  active: PropTypes.bool,
  className: PropTypes.string,
  align: PropTypes.oneOf(Object.values(Align)),
  justify: PropTypes.oneOf(Object.values(Justify)),
  refEl: PropTypes.object,
  usePortal: PropTypes.bool,
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default Menu;
