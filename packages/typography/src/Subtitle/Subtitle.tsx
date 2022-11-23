import React from 'react';
import Box from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { baseTypographyStyles, defaultTextColor } from '../styles';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { TypographyProps } from '../types';

/**
 * Subtitle
 */
const subtitleStyles = css`
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
`;

type SubtitleProps<T extends keyof JSX.IntrinsicElements> = TypographyProps<T>;

const Subtitle = <T extends keyof JSX.IntrinsicElements>({
  darkMode: darkModeProp,
  className,
  as = 'h6' as T,
  ...rest
}: SubtitleProps<T>) => {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <Box
      as={as}
      className={cx(
        baseTypographyStyles,
        subtitleStyles,
        defaultTextColor[theme],
        className,
      )}
      {...rest}
    />
  );
};

Subtitle.displayName = 'Subtitle';

export default Subtitle;
