import * as React from 'react';
import PropTypes from 'prop-types';
import Popover from '@leafygreen-ui/popover';
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
  margin-block-start: 5px;
  margin-block-end: 5px;
  pointer-events: none;
`;

type Align = 'top' | 'bottom' | 'left' | 'right';
type Justify = 'start' | 'middle' | 'end';
interface Props {
  active: boolean;
  align: Align;
  justify: Justify;
  children?: React.ReactNode;
  className?: string;
  refEl?: React.RefObject<HTMLElement>;
  withoutPortal?: boolean;
}

function Menu({
  active,
  align = 'bottom',
  justify = 'end',
  children,
  className,
  refEl,
  withoutPortal,
  ...rest
}: Props) {
  return (
    <Popover
      active={active}
      align={align}
      justify={justify}
      refEl={refEl}
      withoutPortal={withoutPortal}
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
  withoutPortal: PropTypes.bool,
};

Menu.defaultProps = {
  align: 'bottom',
  justify: 'start',
  withoutPortal: false,
};

export default Menu;
