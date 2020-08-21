import React from 'react';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Box, { ExtendableBox } from '@leafygreen-ui/box';

const containerStyle = css`
  background-color: white;
  border: 1px solid ${uiColors.gray.light2};
  border-radius: 7px;
  box-shadow: 0 4px 10px -4px ${transparentize(0.7, uiColors.black)};
  transition: border 300ms ease-in-out, box-shadow 300ms ease-in-out;
`;

const hoverStyle = css`
  &:hover {
    border: 1px solid ${uiColors.gray.light2};
    box-shadow: 0 2px 6px -2px ${transparentize(0.4, uiColors.black)};
  }
`;

interface CardProps {
  className?: string;
  onClick?: () => void;
}

const Card: ExtendableBox<CardProps> = ({ className, ...rest }: CardProps) => {
  return (
    <Box
      className={cx(
        containerStyle,
        { [hoverStyle]: rest.onClick !== undefined },
        className,
      )}
      {...rest}
    />
  );
};

Card.displayName = 'Card';

Card.propTypes = {
  className: PropTypes.string,
};

export default Card;
