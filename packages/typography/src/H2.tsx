import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { baseTypographyStyles } from './styles';
import { CommonTypographyProps, Mode } from './types';

/**
 * H2
 */
const h2 = css`
  font-size: 32px;
  line-height: 40px;
  font-weight: 400;
  font-family: ${fontFamilies.serif};
`;

const h2Color: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.green.dark2};
  `,
  [Mode.Dark]: css`
    color: ${palette.green.light1};
  `,
};

type H2Props = HTMLElementProps<'h2'> & CommonTypographyProps;

const H2: ExtendableBox<H2Props, 'h2'> = ({
  darkMode,
  className,
  ...rest
}: H2Props) => {
  // TODO: Replace with context
  const mode = darkMode ? Mode.Dark : Mode.Light;
  return (
    <Box
      as="h2"
      className={cx(baseTypographyStyles, h2, h2Color[mode], className)}
      {...rest}
    />
  );
};

H2.displayName = 'H2';

export default H2;
