import React from 'react';
import Box from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { Theme } from '@leafygreen-ui/lib';
import { baseTypographyStyles } from './styles';
import { TypographyProps } from './types';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

/**
 * H1
 */
const h1 = css`
  font-weight: 400;
  font-size: 48px;
  line-height: 62px;
  font-family: ${fontFamilies.serif};
`;

const h1Color: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.green.dark2};
  `,
  [Theme.Dark]: css`
    color: ${palette.green.light1};
  `,
};

type H1Props = TypographyProps<'h1'>;

const H1 = ({
  darkMode: darkModeProp,
  className,
  as = 'h1',
  ...rest
}: H1Props) => {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <Box
      as={as}
      className={cx(baseTypographyStyles, h1, h1Color[theme], className)}
      {...rest}
    />
  );
};

H1.displayName = 'H1';

export default H1;
