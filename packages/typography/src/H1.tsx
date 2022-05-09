import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { baseTypographyStyles } from './styles';
import { CommonTypographyProps, Mode } from './types';

/**
 * H1
 */
const h1 = css`
  font-weight: 400;
  font-size: 48px;
  line-height: 62px;
  font-family: ${fontFamilies.serif};
`;

const h1Color: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.green.dark2};
  `,
  [Mode.Dark]: css`
    color: ${palette.green.light1};
  `,
};

type H1Props = HTMLElementProps<'h1'> & CommonTypographyProps;

const H1: ExtendableBox<H1Props, 'h1'> = ({ darkMode, className, ...rest }: H1Props) => {
  // TODO: Replace with context
  const mode = darkMode ? Mode.Dark : Mode.Light;
  return <Box as="h1" className={cx(baseTypographyStyles, h1, h1Color[mode], className)} {...rest} />;
};

H1.displayName = 'H1';

export default H1;
