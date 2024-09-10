import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { LGIDS_TYPOGRAPHY } from '../constants';
import { useUpdatedBaseFontSize } from '../utils/useUpdatedBaseFontSize';

import {
  descriptionTypeScaleStyles,
  getDescriptionStyle,
  getDisabledDescriptionColorStyle,
} from './Description.styles';
import { DescriptionProps } from './Description.types';

export const Description = ({
  baseFontSize: baseFontSizeOverride,
  'data-lgid': dataLgId = LGIDS_TYPOGRAPHY.description,
  darkMode: darkModeProp,
  disabled = false,
  children,
  className,
  ...rest
}: DescriptionProps) => {
  const { theme } = useDarkMode(darkModeProp);
  const baseFontSize = useUpdatedBaseFontSize(baseFontSizeOverride);

  return (
    <p
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
    </p>
  );
};

Description.displayName = 'Description';

export default Description;
