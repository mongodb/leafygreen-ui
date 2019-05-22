import * as React from 'react';
import PropTypes from 'prop-types';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import { cx } from 'emotion';

const { css } = emotion;

const containerStyle = css`
  list-style: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  padding-left: 16px;
  text-decoration: none;
  margin: 0px;
  &:hover {
    background-color: ${colors.gray[8]};
    transition: background 300ms ease-in-out;
  }
`;

const textStyle = css`
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  margin: 0px;
  color: ${colors.gray[1]};
  text-decoration: none;
`;

interface Props {
  /**
   * If supplied, Menu Item will be rendered inside of `a` tags.
   */
  href?: string;

  /**
   * Content that will appear inside of DropdownItem component.
   */
  children?: React.ReactNode;

  /**
   * Class name that will be applied to root DropdownItem element.
   */
  className?: string;

  /**
   * Callback function to be executed when DropdownItem is clicked.
   */
  onSelect?: React.MouseEventHandler;
}

/**
 * # DropdownItem
 *
 * `''
<DropdownItem>Hello World!</DropdownItem>
 * `''
 * ---
 * @param props.href If supplied, DropdownItem will render inside of `a` tags.
 * @param props.onSelect Function to be executed when DropdownItem is clicked.
 * @param props.className Classname applied to DropdownItem.
 * @param props.children Content to appear inside of the DropdownItem.
 *
 *
 */
export default function DropdownItem({
  href,
  onSelect,
  children,
  className,
}: Props) {
  const Root = href ? 'a' : 'span';

  return (
    <li className={cx(containerStyle, className)}>
      <Root onClick={onSelect} href={href} className={textStyle}>
        {children}
      </Root>
    </li>
  );
}

DropdownItem.displayName = 'DropdownItem';

DropdownItem.propTypes = {
  href: PropTypes.string,
  onSelect: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};
