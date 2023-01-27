import React from 'react';

import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { baseTypographyStyles, defaultTextColor } from '../styles';

import { overlineStyles } from './Overline.styles';
import { OverlineProps } from './Overline.types';

export const Overline: ExtendableBox<OverlineProps, 'div'> = ({
  darkMode: darkModeProp,
  className,
  ...rest
}: OverlineProps) => {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <Box
      className={cx(
        baseTypographyStyles,
        overlineStyles,
        defaultTextColor[theme],
        className,
      )}
      {...rest}
    />
  );
};

Overline.displayName = 'Overline';

export default Overline;
