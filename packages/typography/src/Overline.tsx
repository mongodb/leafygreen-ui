import React from 'react';
import Box from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { baseTypographyStyles, defaultTextColor } from './styles';
import { TypographyProps } from './types';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

/**
 * Overline
 */
const overline = css`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 20px;
  letter-spacing: 0.4px;
`;

type OverlineProps<T extends keyof JSX.IntrinsicElements> = TypographyProps<T>;

export const Overline = <T extends keyof JSX.IntrinsicElements>({
  darkMode: darkModeProp,
  className,
  as = 'div' as T,
  ...rest
}: OverlineProps<T>) => {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <Box
      as={as}
      className={cx(
        baseTypographyStyles,
        overline,
        defaultTextColor[theme],
        className,
      )}
      {...rest}
    />
  );
};

Overline.displayName = 'Overline';

export default Overline;
