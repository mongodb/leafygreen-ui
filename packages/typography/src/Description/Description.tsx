import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useUpdatedBaseFontSize } from '../utils/useUpdatedBaseFontSize';

import {
  descriptionColorStyle,
  descriptionStyle,
  descriptionTypeScaleStyles,
  disabledDescriptionColorStyle,
} from './Description.styles';
import { DescriptionProps } from './Description.types';

export const Description = ({
  baseFontSize: baseFontSizeOverride,
  'data-lgid': dataLgId = 'lg-description',
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
        descriptionStyle,
        descriptionColorStyle[theme],
        descriptionTypeScaleStyles[baseFontSize],
        {
          [disabledDescriptionColorStyle[theme]]: disabled,
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
