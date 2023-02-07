import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import {
  useBaseFontSize,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

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
  const { baseFontSize } = useBaseFontSize(baseFontSizeOverride);

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
