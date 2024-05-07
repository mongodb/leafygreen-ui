import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

import { LGIDS_TYPOGRAPHY } from '../constants';
import { useUpdatedBaseFontSize } from '../utils/useUpdatedBaseFontSize';

import {
  getDisabledLabelColorStyle,
  getLabelStyles,
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
    'data-lgid': dataLgId = LGIDS_TYPOGRAPHY.label,
    ...rest
  }) => {
    const { theme } = useDarkMode(darkModeProp);
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeOverride);
    const { Component } = usePolymorphic(as);

    return (
      <Component
        data-lgid={dataLgId}
        className={cx(
          getLabelStyles(theme),
          labelTypeScaleStyles[baseFontSize],
          { [getDisabledLabelColorStyle(theme)]: disabled },
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
