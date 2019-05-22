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
   * Content that will appear inside of DropdownGroup component.
   */
  children: React.ReactNode;

  /**
   * Class name that will be applied to root DropdownGroup element.
   */
  className?: string;
}

/**
 * # DropdownGroup
 *
 * `''
<DropdownGroup>
  <MenuItem>Hello World!</MenuItem>
</DropdownGroup>
 * `''
 * ---
 * @param props.className Classname applied to DropdownGroup.
 * @param props.children Content to appear inside of the DropdownGroup.
 *
 */
export default function DropdownGroup({ children, className }: Props) {
  return (
    <div role="menu" className={cx(borderStyle, className)}>
      {children}
    </div>
  );
}

DropdownGroup.displayName = 'DropdownGroup';

DropdownGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
