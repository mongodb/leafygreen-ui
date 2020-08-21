import React from 'react';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Box, { ExtendableBox } from '@leafygreen-ui/box';

const containerStyle = css`
  background-color: white;
  border: 1px solid ${uiColors.gray.light2};
  border-radius: 4px;
  box-shadow: 0px 4px 10px -4px ${transparentize(0.7, uiColors.black)};
  transition: border 300ms ease-in-out, box-shadow 300ms ease-in-out;

  &:hover {
    border: 1px solid ${uiColors.gray.light2};
    box-shadow: 0px 3px 6px -2px ${uiColors.gray.base};
  }
`;

interface CardProps {
  className?: string;
}

const Card: ExtendableBox<CardProps> = ({ className, ...rest }: CardProps) => {
  return <Box className={cx(containerStyle, className)} {...rest} />;
};

Card.displayName = 'Card';

Card.propTypes = {
  className: PropTypes.string,
};

export default Card;
