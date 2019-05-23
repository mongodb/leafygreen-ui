import React, { useState, useEffect, EventHandler } from 'react';
import PropTypes from 'prop-types';
import Popover, { Align, Justify } from '@leafygreen-ui/popover';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import { cx } from 'emotion';

const { css } = emotion;

const rootDropdownStyle = css`
  width: 202px;
  border: 1px solid ${colors.gray[7]};
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${colors.mongodb.white};
  margin-block-start: 0px;
  margin-block-end: 0px;
`;

interface Props {
  /**
   * Determines the active state of the Dropdown.
   *
   * default: `false`
   */
  active: boolean;

  /**
   * Determines the alignment of the Dropdown relative to a trigger element.
   *
   * default: `bottom`
   */
  align: Align;

  /**
   * Determines the justification of the Dropdown relative to a trigger element.
   *
   * default: `end`
   */
  justify: Justify;

  /**
   * Content that will appear inside of the Dropdown.
   */
  children?: React.ReactElement;

  /**
   * Class name applied to Dropdown.
   */
  className?: string;

  /**
   * A reference to the element against which the Dropdown will be positioned.
   */
  refEl?: React.RefObject<HTMLElement>;

  /**
   * A reference to the passed in trigger element.
   */
  trigger?: React.ReactElement;

  /**
   * Specifies that the popover content will appear portaled to the end of the DOM,
   * rather than in the DOM tree.
   *
   * default: `true`
   */
  usePortal?: boolean;
}

/**
 * # Dropdown
 *
 * Dropdown component
 *
 * `''
<button>
  <Dropdown active={true}>
    <DropdownItem>Hello World!</DropdownItem>
  </Dropdown>
</button>
 * `''
 * @param props.children Content to appear inside of Dropdown.
 * @param props.active Boolean to describe whether or not Dropdown is active.
 * @param props.className Classname applied to Dropdown.
 * @param props.align Alignment of Dropdown relative to another element: `top`, `bottom`, `left`, `right`.
 * @param props.justify Justification of Dropdown relative to another element: `start`, `middle`, `end`.
 * @param props.refEl Reference element that Dropdown should be positioned against.
 * @param props.usePortal Boolean to describe if content should be portaled to end of DOM, or appear in DOM tree.
 * @param props.trigger Trigger element to set active state of Dropdown, makes component controlled
 *
 */
export default function Dropdown({
  active,
  align,
  justify,
  children,
  className,
  refEl,
  usePortal,
  trigger,
  ...rest
}: Props) {
  const [isActive, setActiveState] = useState(false);

  const syntheticToggleEventHandler: EventHandler<React.SyntheticEvent> = e => {
    e.nativeEvent.stopImmediatePropagation();
    setActiveState(!isActive);
  };

  const nativeToggleEventHandler = (e: Event) => {
    e.stopImmediatePropagation();
    setActiveState(!isActive);
  };

  const handleEscape = (e: KeyboardEvent) => {
    e.keyCode === 27 && nativeToggleEventHandler(e);
  };

  let triggerElement: React.ReactNode = null;

  const popoverContent = (
    <Popover
      key="popover"
      active={trigger ? isActive : active}
      align={align}
      justify={justify}
      refEl={refEl}
      usePortal={usePortal}
    >
      <ul {...rest} className={cx(rootDropdownStyle, className)}>
        {children}
      </ul>
    </Popover>
  );

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

  return triggerElement ? triggerElement : popoverContent;
}

Dropdown.displayName = 'Dropdown';

Dropdown.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  className: PropTypes.string,
  align: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  justify: PropTypes.oneOf(['start', 'middle', 'end']),
  refEl: PropTypes.object,
  usePortal: PropTypes.bool,
  trigger: PropTypes.node,
};

Dropdown.defaultProps = {
  align: 'bottom',
  justify: 'end',
  usePortal: true,
};
