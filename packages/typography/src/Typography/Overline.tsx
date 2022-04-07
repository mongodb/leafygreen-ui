import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';

const sharedStyles = css`
  margin: unset;
  font-family: ${fontFamilies.default};
  color: ${palette.black};
`;

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
  return <Box className={cx(sharedStyles, overline, className)} {...rest} />;
};

Overline.displayName = 'Overline';
