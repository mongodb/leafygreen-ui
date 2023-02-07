import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import {
  useBaseFontSize,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

import {
  disabledLabelColorStyle,
  labelColorStyle,
  labelStyle,
  labelTypeScaleStyles,
} from './Label.styles';
import { LabelProps } from './Label.types';

export const Label = Polymorphic<LabelProps>(
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
    const { baseFontSize } = useBaseFontSize(baseFontSizeOverride);
    const { Component } = usePolymorphic(as);

    console.log({ baseFontSize, baseFontSizeOverride });

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
