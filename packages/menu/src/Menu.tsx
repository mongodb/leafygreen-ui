import React, { useState, useCallback, EventHandler } from 'react';
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

const EscapeKey = 27;

interface MenuProps extends Omit<PopoverProps, 'spacing'> {
  /**
   * A slot for the element used to trigger the Menu. Passing a trigger allows
   * Menu to control opening and closing itself internally.
   */
  trigger?: React.ReactElement | Function;
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
 * @param props.active Boolean to describe whether or not Menu is active.
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
  active,
  children,
  className,
  refEl,
  trigger,
  ...rest
}: MenuProps) {
  const [isActive, setActiveState] = useState(false);

  const popoverContent = (
    <Popover
      key="popover"
      active={trigger ? isActive : active}
      align={align}
      justify={justify}
      refEl={refEl}
      usePortal={usePortal}
      spacing={15}
      adjustOnMutation={adjustOnMutation}
    >
      <div {...rest} className={cx(rootMenuStyle, className)} role="menu">
        {children}
      </div>
    </Popover>
  );

  const syntheticToggleEventHandler: EventHandler<
    React.SyntheticEvent
  > = useCallback(e => {
    e.nativeEvent.stopImmediatePropagation();
    setActiveState(current => !current);
  }, []);

  const closeMenuNativeHandler: EventListener = useCallback((e: Event) => {
    e.stopImmediatePropagation();
    setActiveState(false);
  }, []);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.keyCode === EscapeKey) {
      closeMenuNativeHandler(e);
    }
  }, []);

  const enabled = trigger && isActive;

  useEventListener('click', closeMenuNativeHandler, {
    options: { once: true },
    dependencies: [isActive, trigger],
    enabled,
  });

  useEventListener('keydown', handleEscape, {
    options: { once: true },
    dependencies: [isActive, trigger],
    enabled,
  });

  if (trigger) {
    if (typeof trigger === 'function') {
      return trigger({
        onClick: syntheticToggleEventHandler,
        children: popoverContent,
      });
    }

    return React.cloneElement(trigger, {
      onClick: syntheticToggleEventHandler,
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
