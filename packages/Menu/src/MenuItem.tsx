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
  href?: string;
  children?: React.ReactNode;
  className?: string;
  onSelect?: React.MouseEventHandler;
}

function MenuItem({ href, onSelect, children, className }: Props) {
  const Root = href ? 'a' : 'span';

  return (
    <li className={cx(containerStyle, className)}>
      <Root onClick={onSelect} href={href} className={textStyle}>
        {children}
      </Root>
    </li>
  );
}

MenuItem.displayName = 'MenuItem';

MenuItem.propTypes = {
  href: PropTypes.string,
  onSelect: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default MenuItem;
