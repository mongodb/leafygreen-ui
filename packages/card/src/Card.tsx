import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Box, { OverrideComponentProps } from '@leafygreen-ui/box';

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

interface BaseCardProps {
  className?: string;
}

type CardProps<C extends React.ElementType> = OverrideComponentProps<
  C,
  BaseCardProps
>;

function Card<C extends React.ElementType = 'div'>({
  className,
  ...rest
}: CardProps<C>) {
  return (
    <Box component="div" className={cx(containerStyle, className)} {...rest} />
  );
}

Card.displayName = 'Card';

Card.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.elementType,
  ]),
  className: PropTypes.string,
};

export default Card;
