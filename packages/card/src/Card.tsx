import React from 'react';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Box, { BoxProps, ExtendableBox } from '@leafygreen-ui/box';

export const ContentStyle = {
  None: 'none',
  Clickable: 'clickable',
} as const;

export type ContentStyle = typeof ContentStyle[keyof typeof ContentStyle];

const baseBoxShadow = `0 4px 10px -4px ${transparentize(0.7, uiColors.black)}`;
const hoverBoxShadow = `0 2px 6px -2px ${transparentize(0.4, uiColors.black)}`;
const focusBoxShadow = '0 0 0 3px #9dd0e7';

const containerStyle = css`
  position: relative;
  background-color: white;
  border: 1px solid ${uiColors.gray.light2};
  border-radius: 7px;
  box-shadow: ${baseBoxShadow};
  transition: border 300ms ease-in-out, box-shadow 300ms ease-in-out;
`;

const clickableStyle = css`
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: ${baseBoxShadow}, ${focusBoxShadow};
  }

  &:hover {
    border: 1px solid ${uiColors.gray.light2};
    box-shadow: ${hoverBoxShadow};

    &:focus {
      box-shadow: ${hoverBoxShadow}, ${focusBoxShadow};
    }
  }
`;

interface CardProps {
  className?: string;
  contentStyle?: ContentStyle;
}

const Card: ExtendableBox<CardProps> = ({
  className,
  contentStyle,
  ...rest
}: BoxProps<'div', CardProps>) => {
  if (
    contentStyle === undefined &&
    (('onClick' in rest && rest.onClick !== undefined) ||
      ('href' in rest && !!rest.href))
  ) {
    contentStyle = ContentStyle.Clickable;
  }

  return (
    <Box
      // @ts-expect-error
      className={cx(
        containerStyle,
        { [clickableStyle]: contentStyle === ContentStyle.Clickable },
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
