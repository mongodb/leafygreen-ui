import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { baseTypographyStyles } from '../styles';
import { CommonTypographyProps } from '../types';

/**
 * H3
 */
const h3 = css`
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.3px;
  font-weight: 500;
`;

type H3Props = HTMLElementProps<'h3'> & CommonTypographyProps;

export const H3: ExtendableBox<H3Props, 'h3'> = ({
  className,
  ...rest
}: H3Props) => {
  return (
    <Box
      as="h3"
      className={cx(baseTypographyStyles, h3, className)}
      {...rest}
    />
  );
};

H3.displayName = 'H3';
