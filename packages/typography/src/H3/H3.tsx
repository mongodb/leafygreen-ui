import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { baseTypographyStyles, defaultTextColor } from '../styles';
import { h3Styles } from './H3.styles'
import { H3Props } from './H3.types'


const H3: ExtendableBox<H3Props, 'h3'> = ({
  darkMode: darkModeProp,
  className,
  ...rest
}: H3Props) => {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <Box
      as="h3"
      className={cx(
        baseTypographyStyles,
        h3Styles,
        defaultTextColor[theme],
        className,
      )}
      {...rest}
    />
  );
};

H3.displayName = 'H3';

export default H3;
