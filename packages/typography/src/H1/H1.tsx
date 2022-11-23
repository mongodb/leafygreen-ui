import React from 'react';
import Box from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { baseTypographyStyles } from '../styles';
import { h1Styles, h1Color } from './H1.styles';
import { H1Props } from './H1.types';

const H1 = <T extends keyof JSX.IntrinsicElements>({
  darkMode: darkModeProp,
  className,
  as = 'h1' as T,
  ...rest
}: H1Props<T>) => {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <Box
      as={as}
      className={cx(baseTypographyStyles, h1Styles, h1Color[theme], className)}
      {...rest}
    />
  );
};

H1.displayName = 'H1';

export default H1;
