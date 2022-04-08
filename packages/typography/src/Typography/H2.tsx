import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { baseTypographyStyles } from '../styles';
import { CommonTypographyProps } from '../types';

/**
 * H2
 */
const h2 = css`
  font-size: 32px;
  line-height: 40px;
  letter-spacing: -0.3px;
  font-weight: 400;
  font-family: ${fontFamilies.serif};
  color: ${palette.green.dark2};
`;

type H2Props = HTMLElementProps<'h2'> & CommonTypographyProps;

export const H2: ExtendableBox<H2Props, 'h2'> = ({
  className,
  ...rest
}: H2Props) => {
  return (
    <Box
      as="h2"
      className={cx(baseTypographyStyles, h2, className)}
      {...rest}
    />
  );
};

H2.displayName = 'H2';
