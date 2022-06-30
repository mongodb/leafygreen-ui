import React from 'react';
import { cx } from '@leafygreen-ui/emotion';
import BaseTypography, {
  BaseTypographyProps,
} from '../BaseTypography/BaseTypography';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { disclaimerBaseStyles, disclaimerTextColor } from './styles';

type DisclaimerProps = BaseTypographyProps<'small'>;

/**
 * Disclaimer
 */
export function Disclaimer({
  darkMode: darkModeProp,
  className,
  ...rest
}: DisclaimerProps) {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <BaseTypography
      as="small"
      className={cx(
        disclaimerBaseStyles,
        disclaimerTextColor[theme],
        className,
      )}
      {...rest}
    />
  );
}

Disclaimer.displayName = 'Disclaimer';

export default Disclaimer;
