import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { baseTypographyStyles } from '../styles';

/**
 * Overline
 */
const overline = css`
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 16px;
  letter-spacing: 0.3px;
`;

export const Overline: ExtendableBox<{
  className?: string;
}> = ({ className, ...rest }: { className?: string }) => {
  return (
    <Box className={cx(baseTypographyStyles, overline, className)} {...rest} />
  );
};

Overline.displayName = 'Overline';
