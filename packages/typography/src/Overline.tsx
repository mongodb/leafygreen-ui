import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { sharedStyles } from './styles';

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

const Overline: ExtendableBox<{
  className?: string;
}> = ({ className, ...rest }: { className?: string }) => {
  return <Box className={cx(sharedStyles, overline, className)} {...rest} />;
};

Overline.displayName = 'Overline';

export default Overline;
