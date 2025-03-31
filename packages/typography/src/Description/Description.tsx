import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Polymorphic, usePolymorphic } from '@leafygreen-ui/polymorphic';

import { useUpdatedBaseFontSize } from '../utils/useUpdatedBaseFontSize';

import {
  descriptionTypeScaleStyles,
  getDescriptionStyle,
  getDisabledDescriptionColorStyle,
} from './Description.styles';
import { DescriptionProps } from './Description.types';
import { getLgIds } from '../utils';
import { DEFAULT_LGID_ROOT } from '../utils/getLgIds';

export const Description = Polymorphic<DescriptionProps>(
  ({
    as: asProp,
    baseFontSize: baseFontSizeOverride,
    children,
    className,
    darkMode: darkModeProp,
    'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
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
        data-lgid={getLgIds(dataLgId).description}
        data-testid={getLgIds(dataLgId).label}
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
