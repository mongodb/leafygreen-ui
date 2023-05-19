import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

import { errorMessageModeStyle, errorMessageStyle } from './Error.styles';
import { BaseErrorProps } from './Error.types';

const Error = Polymorphic<BaseErrorProps>(
  ({
    as = 'p' as PolymorphicAs,
    darkMode: darkModeProp,
    children,
    className,
    ...rest
  }) => {
    const { theme } = useDarkMode(darkModeProp);
    const { Component } = usePolymorphic(as);

    return (
      <Component
        {...rest}
        className={cx(
          errorMessageStyle,
          errorMessageModeStyle[theme],
          className,
        )}
      >
        {children}
      </Component>
    );
  },
);

export default Error;
