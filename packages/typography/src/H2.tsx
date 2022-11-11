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
 * H2
 */
const h2 = css`
  font-size: 32px;
  line-height: 40px;
  font-weight: 400;
  font-family: ${fontFamilies.serif};
`;

const h2Color: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.green.dark2};
  `,
  [Theme.Dark]: css`
    color: ${palette.green.light1};
  `,
};

type H2Props<T extends keyof JSX.IntrinsicElements> = TypographyProps<T>;

const H2 = <T extends keyof JSX.IntrinsicElements>({
  darkMode: darkModeProp,
  className,
  as = 'h2' as T,
  ...rest
}: H2Props<T>) => {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <Box
      as={as}
      className={cx(baseTypographyStyles, h2, h2Color[theme], className)}
      {...rest}
    />
  );
};

H2.displayName = 'H2';

export default H2;
