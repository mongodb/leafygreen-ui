import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Polymorphic, usePolymorphic } from '@leafygreen-ui/polymorphic';

import { LGIDS_TYPOGRAPHY } from '../constants';
import { useUpdatedBaseFontSize } from '../utils/useUpdatedBaseFontSize';

import {
  descriptionTypeScaleStyles,
  getDescriptionStyle,
  getDisabledDescriptionColorStyle,
} from './Description.styles';
import { DescriptionProps } from './Description.types';

export const Description = Polymorphic<DescriptionProps>(
  ({
    as: asProp,
    baseFontSize: baseFontSizeOverride,
    children,
    className,
    darkMode: darkModeProp,
    'data-lgid': dataLgId = LGIDS_TYPOGRAPHY.description,
    disabled = false,
    ...rest
  }) => {
    const { theme } = useDarkMode(darkModeProp);
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeOverride);
    const asDerivedFromChildren = ['string', 'number'].includes(typeof children)
      ? 'p'
      : 'div';
    const as = asProp ?? asDerivedFromChildren;
    const { Component } = usePolymorphic(as);

    return (
      <Component
        data-lgid={dataLgId}
        className={cx(
          getDescriptionStyle(theme),
          descriptionTypeScaleStyles[baseFontSize],
          {
            [getDisabledDescriptionColorStyle(theme)]: disabled,
          },
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Description.displayName = 'Description';

export default Description;
