import React, { useState, useRef } from 'react';
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
  pointer-events: none;
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
  children?: React.ReactNode;

  /**
   * Class name applied to Dropdown.
   */
  className?: string;

  /**
   * A reference to the element against which the Dropdown will be positioned.
   */
  refEl?: React.RefObject<HTMLElement>;

  /**
   * A reference to the element against which the Dropdown will be positioned.
   */
  trigger?: React.ReactNode;

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
    `''
 * ---
 * @param props.children Content to appear inside of Dropdown.
 * @param props.active Boolean to describe whether or not Dropdown is active.
 * @param props.className Classname applied to Dropdown.
 * @param props.align Alignment of Dropdown relative to another element: `top`, `bottom`, `left`, `right`.
 * @param props.justify Justification of Dropdown relative to another element: `start`, `middle`, `end`.
 * @param props.refEl Reference element that Dropdown should be positioned against.
 * @param props.usePortal Boolean to describe if content should be portaled to end of DOM, or appear in DOM tree.
 *
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
  let triggerElement;
  const [isActive, setActiveState] = useState(false);
  const triggerRef = useRef(null);

  function handleClick() {
    setActiveState(!isActive);
  }

  if (trigger) {
    triggerElement = React.cloneElement(trigger, {
      onClick: handleClick,
      ref: triggerRef,
    });
  }

  return (
    <>
      {trigger && triggerElement}
      <Popover
        active={trigger ? isActive : active}
        align={align}
        justify={justify}
        refEl={trigger ? triggerElement : refEl}
        usePortal={usePortal}
      >
        <ul {...rest} className={cx(rootDropdownStyle, className)}>
          {children}
        </ul>
      </Popover>
    </>
  );
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
