import React from 'react';
import { css, cx } from 'emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { borderColor, leftRightPadding } from './styles';

const listItemStyle = css`
  ${leftRightPadding}
  width: 50%;
  height: 68px;
  background-color: ${uiColors.gray.light3};
  border-bottom: 1px solid ${borderColor};
  display: flex;
  align-items: center;
  color: ${uiColors.gray.dark1};
  font-size: 16px;
  line-height: 24px;

  &:nth-child(odd) {
    border-right: 1px solid ${borderColor};
  }
`;

const activeStyle = css`
  background-color: ${uiColors.green.light3};
`;

function MobileNavigationItem({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <li className={cx(listItemStyle, { [activeStyle]: active })}>{children}</li>
  );
}

export default MobileNavigationItem;
