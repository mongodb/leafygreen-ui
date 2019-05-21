import * as React from 'react';
import PropTypes from 'prop-types';
import Popover, { Align, Justify } from '@leafygreen-ui/popover';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import { cx } from 'emotion';

const { css } = emotion;

const rootMenuStyle = css`
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
  children?: React.ReactNode;

  /**
   * Class name applied to Menu.
   */
  className?: string;

  /**
   * A reference to the element against which the Menu will be positioned.
   */
  refEl?: React.RefObject<HTMLElement>;

  /**
   * Specifies that the popover content will appear portaled to the end of the DOM,
   * rather than in the DOM tree.
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
 * `''
<button>
  <Menu active={true}>
    <MenuItem>Hello World!</MenuItem>
  </Menu>
</button>
    `''
 * ---
 * @param props.children Content to appear inside of Menu.
 * @param props.active Boolean to describe whether or not Menu is active.
 * @param props.className Classname applied to Menu.
 * @param props.align Alignment of Menu relative to another element: `top`, `bottom`, `left`, `right`.
 * @param props.justify Justification of Menu relative to another element: `start`, `middle`, `end`.
 * @param props.refEl Reference element that Menu should be positioned against.
 * @param props.usePortal Boolean to describe if content should be portaled to end of DOM, or appear in DOM tree.
 *
 *
 */
export default function Menu({
  active,
  align,
  justify,
  children,
  className,
  refEl,
  usePortal,
  ...rest
}: Props) {
  return (
    <Popover
      active={active}
      align={align}
      justify={justify}
      refEl={refEl}
      usePortal={usePortal}
    >
      <ul {...rest} className={cx(rootMenuStyle, className)}>
        {children}
      </ul>
    </Popover>
  );
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
};

Menu.defaultProps = {
  align: 'bottom',
  justify: 'end',
  usePortal: true,
};
