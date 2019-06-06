import React, { useState, useCallback, EventHandler } from 'react';
import PropTypes from 'prop-types';
import Popover, { Align, Justify, PopoverProps } from '@leafygreen-ui/popover';
import { useDocumentEventListener } from './hooks';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import { cx } from 'emotion';

const { css } = emotion;

const rootMenuStyle = css`
  width: 200px;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  background-color: ${colors.mongodb.white};
`;

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
  active,
  children,
  className,
  refEl,
  trigger,
  ...rest
}: MenuProps): React.ReactElement {
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

  const nativeToggleEventHandler: EventListener = useCallback((e: Event) => {
    e.stopImmediatePropagation();
    setActiveState(current => !current);
  }, []);

  const handleEscape = (e: KeyboardEvent) => {
    const EscapeKey = 27;
    e.keyCode === EscapeKey && nativeToggleEventHandler(e);
  };

  const enabled = trigger && isActive;

  useDocumentEventListener(
    'click',
    nativeToggleEventHandler,
    { once: true },
    [isActive, trigger],
    enabled,
  );

  useDocumentEventListener(
    'keydown',
    handleEscape,
    { once: true },
    [isActive, trigger],
    enabled,
  );

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

  return trigger || popoverContent;
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
