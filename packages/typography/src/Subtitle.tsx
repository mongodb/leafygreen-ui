import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { baseTypographyStyles, defaultTextColor } from './styles';
import { CommonTypographyProps, Mode } from './types';

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
  darkMode,
  className,
  ...rest
}: SubtitleProps) => {
  // TODO: Replace with context
  const mode = darkMode ? Mode.Dark : Mode.Light;
  return (
    <Box
      as="h6"
      className={cx(
        baseTypographyStyles,
        subtitle,
        defaultTextColor[mode],
        className,
      )}
      {...rest}
    />
  );
};

Subtitle.displayName = 'Subtitle';

export default Subtitle;
