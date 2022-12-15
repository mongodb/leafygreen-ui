import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Polymorphic, PolymorphicAs, usePolymorphic } from '@leafygreen-ui/polymorphic';

import { baseTypographyStyles } from '../styles';

import { h2Color, h2Styles } from './H2.styles';
import { H2Props } from './H2.types';

const H2 = Polymorphic<H2Props>(({
  darkMode: darkModeProp,
  className,
  as = 'h2' as PolymorphicAs,
  ...rest
}) => {
  const { theme } = useDarkMode(darkModeProp);
  const { Component } = usePolymorphic(as)

  return (
    <Component
      as="h1"
      className={cx(baseTypographyStyles, h2Styles, h2Color[theme], className)}
      {...rest}
    />
  );
});

H2.displayName = 'H2';

export default H2;