import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';

const sharedStyles = css`
  margin: unset;
  font-family: ${fontFamilies.default};
  color: ${palette.black};
`;

/**
 * H3
 */
const h3 = css`
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.3px;
  font-weight: 500;
`;

type H3Props = HTMLElementProps<'h3'>;

export const H3: ExtendableBox<H3Props, 'h3'> = ({
  className,
  ...rest
}: H3Props) => {
  return <Box as="h3" className={cx(sharedStyles, h3, className)} {...rest} />;
};

H3.displayName = 'H3';
