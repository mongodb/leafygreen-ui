import React from 'react';
import Box from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { baseTypographyStyles, defaultTextColor } from './styles';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { TypographyProps } from './types';

/**
 * Subtitle
 */
const subtitle = css`
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
`;

type SubtitleProps = TypographyProps<'h6'>;

const Subtitle = ({
  darkMode: darkModeProp,
  className,
  as = 'h6',
  ...rest
}: SubtitleProps) => {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <Box
      as={as}
      className={cx(
        baseTypographyStyles,
        subtitle,
        defaultTextColor[theme],
        className,
      )}
      {...rest}
    />
  );
};

Subtitle.displayName = 'Subtitle';

export default Subtitle;
