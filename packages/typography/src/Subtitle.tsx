import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { baseTypographyStyles } from './styles';
import { CommonTypographyProps, Mode } from './types';
import { palette } from '@leafygreen-ui/palette';

/**
 * Subtitle
 */
const subtitle = css`
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
`;

const subtitleColor: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.black};
  `,
  [Mode.Dark]: css`
    color: ${palette.gray.light2};
  `,
};

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
        subtitleColor[mode],
        className,
      )}
      {...rest}
    />
  );
};

Subtitle.displayName = 'Subtitle';

export default Subtitle;
