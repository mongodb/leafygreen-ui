import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { HTMLElementProps } from '@leafygreen-ui/lib';

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

interface CardProps {
  children: React.ReactNode;
  as?: React.ElementType<any>;
  className?: string;
}

function Card({ children, as = 'section', className, ...rest }: CardProps) {
  const Root = as;

  return (
    <Root
      {...(rest as HTMLElementProps<any>)}
      className={cx(containerStyle, className)}
    >
      {children}
    </Root>
  );
}

Card.displayName = 'Card';

Card.propTypes = {
  children: PropTypes.node,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string,
};

export default Card;
