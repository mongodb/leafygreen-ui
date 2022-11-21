import React from 'react';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { useUpdatedBaseFontSize } from '../utils/useUpdatedBaseFontSize';
import {
  labelStyle,
  labelColorStyle,
  disabledLabelColorStyle,
  labelTypeScaleStyles,
} from './Label.styles';
import { LabelProps } from './Label.types';

export const Label = ({
  darkMode: darkModeProp,
  className,
  children,
  disabled = false,
  ...rest
}: LabelProps) => {
  const baseFontSize = useUpdatedBaseFontSize();
  const { theme } = useDarkMode(darkModeProp);

  return (
    <label
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
    </label>
  );
};

Label.displayName = 'Label';

export default Label;
