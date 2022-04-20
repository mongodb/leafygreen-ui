import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { sharedStyles } from './styles';

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

type H1Props = HTMLElementProps<'h1'>;

const H1: ExtendableBox<H1Props, 'h1'> = ({ className, ...rest }: H1Props) => {
  return <Box as="h1" className={cx(sharedStyles, h1, className)} {...rest} />;
};

H1.displayName = 'H1';

export default H1;
