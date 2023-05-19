import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

import { useUpdatedBaseFontSize } from '../utils/useUpdatedBaseFontSize';

import {
  disabledLabelColorStyle,
  labelColorStyle,
  labelStyle,
  labelTypeScaleStyles,
} from './Label.styles';
import { BaseLabelProps } from './Label.types';

export const Label = Polymorphic<BaseLabelProps>(
  ({
    baseFontSize: baseFontSizeOverride,
    darkMode: darkModeProp,
    className,
    children,
    disabled = false,
    as = 'label' as PolymorphicAs,
    ...rest
  }) => {
    const { theme } = useDarkMode(darkModeProp);
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeOverride);
    const { Component } = usePolymorphic(as);

    return (
      <Component
        className={cx(
          labelStyle,
          labelColorStyle[theme],
          labelTypeScaleStyles[baseFontSize],
          { [disabledLabelColorStyle[theme]]: disabled },
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Label.displayName = 'Label';

export default Label;
