import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { palette } from '@leafygreen-ui/palette';
import { baseTypographyStyles } from '../styles';
import { CommonTypographyProps } from '../types';

/**
 * H1
 */
const h1 = css`
  font-weight: 400;
  font-size: 48px;
  line-height: 62px;
  letter-spacing: -0.3px;
  font-family: ${fontFamilies.serif};
  color: ${palette.green.dark2};
`;

type H1Props = HTMLElementProps<'h1'> & CommonTypographyProps;

export const H1: ExtendableBox<H1Props, 'h1'> = ({
  className,
  ...rest
}: H1Props) => {
  return (
    <Box
      as="h1"
      className={cx(baseTypographyStyles, h1, className)}
      {...rest}
    />
  );
};

H1.displayName = 'H1';
