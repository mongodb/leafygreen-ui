import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { sharedStyles } from './styles';

/**
 * H3
 */
const h3 = css`
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.3px;
  font-weight: 600;
`;

type H3Props = HTMLElementProps<'h3'>;

const H3: ExtendableBox<H3Props, 'h3'> = ({ className, ...rest }: H3Props) => {
  return <Box as="h3" className={cx(sharedStyles, h3, className)} {...rest} />;
};

H3.displayName = 'H3';

export default H3;
