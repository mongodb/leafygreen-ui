import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps } from '@leafygreen-ui/lib';

import { CommonTypographyProps } from '../types';

import { errorMessageModeStyle, errorMessageStyle } from './Error.styles';

const Error = ({
  children,
  darkMode: darkModeProp,
  className,
  ...rest
}: HTMLElementProps<'p'> & CommonTypographyProps) => {
  const { theme } = useDarkMode(darkModeProp);

  return (
    <p
      {...rest}
      className={cx(errorMessageStyle, errorMessageModeStyle[theme], className)}
    >
      {children}
    </p>
  );
};

export default Error;
