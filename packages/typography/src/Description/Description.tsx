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
  darkMode: darkModeProp,
  disabled = false,
  children,
  className,
  ...rest
}: DescriptionProps) => {
  const { theme } = useDarkMode(darkModeProp);
  const providerBaseFontSize = useUpdatedBaseFontSize();
  const baseFontSize = baseFontSizeOverride ?? providerBaseFontSize;

  return (
    <p
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
