import * as React from 'react';
import PropTypes from 'prop-types';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import { cx } from 'emotion';

const { css } = emotion;

const borderStyle = css`
  border-bottom: 1px solid ${colors.gray[7]};
`;
interface Props {
  /**
   * Content that will appear inside of MenuList component.
   */
  children: React.ReactNode;

  /**
   * Class name that will be applied to root MenuList element.
   */
  className?: string;
}

/**
 * # MenuList
 *
 * `''
<MenuList>
  <MenuItem>Hello World!</MenuItem>
</MenuList>
 * `''
 * ---
 * @param props.className Classname applied to MenuList.
 * @param props.children Content to appear inside of the MenuList.
 *
 */
export default function MenuList({ children, className }: Props) {
  return (
    <div role="menu" className={cx(borderStyle, className)}>
      {children}
    </div>
  );
}

MenuList.displayName = 'MenuList';

MenuList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
