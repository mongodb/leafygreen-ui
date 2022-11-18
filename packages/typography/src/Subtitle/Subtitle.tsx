import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { baseTypographyStyles, defaultTextColor } from '../styles';
import { subtitleStyles } from './Subtitle.styles'
import { SubtitleProps } from './Subtitle.types';

const Subtitle: ExtendableBox<SubtitleProps, 'h6'> = ({
  darkMode: darkModeProp,
  className,
  ...rest
}: SubtitleProps) => {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <Box
      as="h6"
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
