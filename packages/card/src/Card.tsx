import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Box, { BoxProps } from '@leafygreen-ui/box';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import omit from 'lodash/omit';

const containerStyle = css`
  background-color: white;
  border: 1px solid ${uiColors.gray.light2};
  border-radius: 4px;
  box-shadow: 0px 4px 10px -4px ${uiColors.gray.light1};
  transition: border 300ms ease-in-out, box-shadow 300ms ease-in-out;

  &:hover {
    border: 1px solid ${uiColors.gray.light2};
    box-shadow: 0px 3px 6px -2px ${uiColors.gray.base};
  }
`;

type CardProps<T> = BoxProps<T> & {
  as?: React.ElementType<any>;
};

function Card<T extends React.ReactNode>(props: CardProps<T>) {
  const { as, className, children } = props;
  const rest = omit(props as any, ['as', 'className', 'children']);

  return (
    <Box
      className={cx(containerStyle, className)}
      component={as}
      {...(rest as HTMLElementProps<any>)}
    >
      {children}
    </Box>
  );
}

Card.displayName = 'Card';

Card.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default Card;
