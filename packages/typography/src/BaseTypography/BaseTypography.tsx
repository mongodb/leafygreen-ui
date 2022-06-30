import React from 'react';
import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import Box from '@leafygreen-ui/box';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { cx } from '@leafygreen-ui/emotion';
import { baseTypographyStyles } from '../styles';
import { defaultTextColor } from './styles';

export type BaseTypographyProps<T extends keyof JSX.IntrinsicElements> =
  HTMLElementProps<T> &
    DarkModeProps & {
      as?: T;
    };

type TypographyTypes = keyof JSX.IntrinsicElements;

const BaseTypography = ({
  darkMode: darkModeProp,
  as = 'p' as TypographyTypes,
  className,
  ...rest
}: BaseTypographyProps<TypographyTypes>) => {
  const { theme } = useDarkMode(darkModeProp);

  return (
    <Box
      as={as}
      className={cx(baseTypographyStyles, defaultTextColor[theme], className)}
      {...rest}
    />
  );
};

export default BaseTypography;
