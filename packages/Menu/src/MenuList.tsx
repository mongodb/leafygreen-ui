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
  children: React.ReactNode;
  className?: string;
}

function MenuList({ children, className }: Props) {
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

export default MenuList;
