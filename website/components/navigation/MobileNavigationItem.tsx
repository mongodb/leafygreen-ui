import React from 'react';
import { css, cx } from 'emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { borderColor } from './styles';
import { padding } from 'styles/spacing';

const listItemStyle = css`
  width: 50%;
  height: 68px;
  background-color: ${uiColors.gray.light3};
  border-bottom: 1px solid ${borderColor};
  display: flex;
  align-items: center;
  color: ${uiColors.gray.dark1};
  font-size: 16px;
  line-height: 24px;
  text-transform: capitalize;

  &:nth-child(odd) {
    border-right: 1px solid ${borderColor};
  }
`;

const activeStyle = css`
  background-color: ${uiColors.green.light3};
`;

type MobileNavigationItemProps = JSX.IntrinsicElements['li'] & {
  children: React.ReactNode;
  active?: boolean;
};

function MobileNavigationItem({
  children,
  active,
  ...rest
}: MobileNavigationItemProps) {
  return (
    <li
      className={cx(listItemStyle, padding.x4, { [activeStyle]: active })}
      {...rest}
    >
      {children}
    </li>
  );
}

export default MobileNavigationItem;
