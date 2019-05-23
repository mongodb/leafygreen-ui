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
   * Text to appear before DropdownGroup components.
   */
  title: string;

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
 * @param props.className Classname applied to DropdownGroup.
 * @param props.children Content to appear inside of the DropdownGroup.
 * @param props.title Text to appear before DropdownGroup components.
 *
 */
export default function DropdownGroup({ children, className, title }: Props) {
  return (
    <div role="menu" className={cx(borderStyle, className)}>
      {title && <p>{title}</p>}
      {children}
    </div>
  );
}

DropdownGroup.displayName = 'DropdownGroup';

DropdownGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
};
