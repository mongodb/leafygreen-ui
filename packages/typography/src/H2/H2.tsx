import React from 'react';
import Box from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { baseTypographyStyles } from '../styles';
import { h2Styles, h2Color } from './H2.styles';
import { H2Props } from './H2.types';

const H2 = <T extends keyof JSX.IntrinsicElements>({
  darkMode: darkModeProp,
  className,
  ...rest
}: H2Props<T>) => {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <Box
      as="h2"
      className={cx(baseTypographyStyles, h2Styles, h2Color[theme], className)}
      {...rest}
    />
  );
};

H2.displayName = 'H2';

export default H2;
