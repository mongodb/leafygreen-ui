import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { baseTypographyStyles, defaultTextColor } from './styles';
import { CommonTypographyProps } from './types';
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

type OverlineProps = HTMLElementProps<'div'> & CommonTypographyProps;

export const Overline: ExtendableBox<OverlineProps, 'div'> = ({
  darkMode: darkModeProp,
  className,
  ...rest
}: OverlineProps) => {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <Box
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
