import React from 'react';
import { cx } from '@leafygreen-ui/emotion';
import { useUpdatedBaseFontSize } from '../useUpdatedBaseFontSize';
import BaseTypography, {
  BaseTypographyProps,
} from '../BaseTypography/BaseTypography';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  descriptionColorStyle,
  descriptionStyle,
  descriptionTypeScale,
  disabledDescriptionColorStyle,
} from './styles';

type DescriptionProps = BaseTypographyProps<'p'> & {
  disabled?: boolean;
};

export const Description = ({
  darkMode: darkModeProp,
  disabled = false,
  className,
  ...rest
}: DescriptionProps) => {
  const baseFontSize = useUpdatedBaseFontSize();
  const { theme } = useDarkMode(darkModeProp);

  return (
    <BaseTypography
      className={cx(
        descriptionStyle,
        descriptionColorStyle[theme],
        descriptionTypeScale[baseFontSize],
        {
          [disabledDescriptionColorStyle[theme]]: disabled,
        },
        className,
      )}
      {...rest}
    />
  );
};

Description.displayName = 'Description';

export default Description;
