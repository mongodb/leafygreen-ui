import React, { useState, useEffect, useCallback, EventHandler } from 'react';
import PropTypes from 'prop-types';
import Popover, { Align, Justify } from '@leafygreen-ui/popover';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import { cx } from 'emotion';

const { css } = emotion;

const rootMenuStyle = css`
  width: 202px;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  background-color: ${colors.mongodb.white};
`;

interface MenuProps {
  /**
   * Determines the active state of the Menu.
   *
   * default: `false`
   */
  active: boolean;

  /**
   * Determines the alignment of the Menu relative to a trigger element.
   *
   * default: `bottom`
   */
  align: Align;

  /**
   * Determines the justification of the Menu relative to a trigger element.
   *
   * default: `end`
   */
  justify: Justify;

  /**
   * Content that will appear inside of the Menu.
   */
  children?: React.ReactElement;

  /**
   * className applied to Menu.
   */
  className?: string;

  /**
   * A reference to the element against which the Menu will be positioned.
   */
  refEl?: React.RefObject<HTMLElement>;

  /**
   * A slot for the element used to trigger the Menu. Passing a trigger allows
   * Menu to control opening and closing itself internally.
   */
  trigger?: React.ReactElement;

  /**
   * Specifies that the popover content will appear portaled to the end of the DOM,
   * rather than in the React subset of the DOM tree.
   *
   * default: `true`
   */
  usePortal?: boolean;
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
 * ```
 * @param props.children Content to appear inside of Menu.
 * @param props.active Boolean to describe whether or not Menu is active.
 * @param props.className Classname applied to Menu.
 * @param props.align Alignment of Menu relative to another element: `top`, `bottom`, `left`, `right`.
 * @param props.justify Justification of Menu relative to another element: `start`, `middle`, `end`.
 * @param props.refEl Reference element that Menu should be positioned against.
 * @param props.usePortal Boolean to describe if content should be portaled to end of DOM, or appear in DOM tree.
 * @param props.trigger Trigger element to set active state of Menu, makes component controlled
 */
function Menu({
  align = 'bottom',
  justify = 'end',
  usePortal = true,
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
    >
      <div {...rest} className={cx(rootMenuStyle, className)} role="menu">
        {children}
      </div>
    </Popover>
  );

  let triggerElement: React.ReactNode = null;

  const syntheticToggleEventHandler: EventHandler<
    React.SyntheticEvent
  > = useCallback(
    e => {
      e.nativeEvent.stopImmediatePropagation();
      setActiveState(!isActive);
    },
    [isActive],
  );

  const nativeToggleEventHandler = (e: Event) => {
    e.stopImmediatePropagation();
    setActiveState(!isActive);
  };

  const handleEscape = (e: KeyboardEvent) => {
    e.keyCode === 27 && nativeToggleEventHandler(e);
  };

  if (trigger) {
    useEffect(() => {
      if (isActive) {
        document.addEventListener('click', nativeToggleEventHandler, {
          once: true,
        });
        document.addEventListener('keydown', handleEscape, { once: true });
      }

      return () => {
        document.removeEventListener('click', nativeToggleEventHandler);
        document.removeEventListener('keydown', handleEscape);
      };
    });

    triggerElement = React.cloneElement(trigger, {
      onClick: syntheticToggleEventHandler,
      children: [...trigger.props.children, popoverContent],
    });
  }

  return triggerElement || popoverContent;
}

Menu.displayName = 'Menu';

Menu.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  className: PropTypes.string,
  align: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  justify: PropTypes.oneOf(['start', 'middle', 'end']),
  refEl: PropTypes.object,
  usePortal: PropTypes.bool,
  trigger: PropTypes.node,
};

export default Menu;
