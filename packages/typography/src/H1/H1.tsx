import React from 'react';

import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { baseTypographyStyles } from '../styles';

import { h1Color,h1Styles } from './H1.styles';
import { H1Props } from './H1.types';

const H1: ExtendableBox<H1Props, 'h1'> = ({
  darkMode: darkModeProp,
  className,
  ...rest
}: H1Props) => {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <Box
      as="h1"
      className={cx(baseTypographyStyles, h1Styles, h1Color[theme], className)}
      {...rest}
    />
  );
};

H1.displayName = 'H1';

export default H1;
