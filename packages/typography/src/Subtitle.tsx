import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { baseTypographyStyles, defaultTextColor } from './styles';
import { CommonTypographyProps } from './types';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

/**
 * Subtitle
 */
const subtitle = css`
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
`;

type SubtitleProps = HTMLElementProps<'h6'> & CommonTypographyProps;

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
