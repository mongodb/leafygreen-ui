import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { baseTypographyStyles } from '../styles';
import { CommonTypographyProps, Mode } from '../types';
import { palette } from '@leafygreen-ui/palette';
import { HTMLElementProps } from '@leafygreen-ui/lib';

/**
 * Overline
 */
const overline = css`
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 16px;
  letter-spacing: 0.3px;
`;

const overlineColor: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.black};
  `,
  [Mode.Dark]: css`
    color: ${palette.gray.light2};
  `,
};

type OverlineProps = HTMLElementProps<'div'> & CommonTypographyProps;

export const Overline: ExtendableBox<OverlineProps, 'div'> = ({
  darkMode,
  className,
  ...rest
}: OverlineProps) => {
  // TODO: Replace with context
  const mode = darkMode ? Mode.Dark : Mode.Light;
  return (
    <Box
      className={cx(
        baseTypographyStyles,
        overline,
        overlineColor[mode],
        className,
      )}
      {...rest}
    />
  );
};

Overline.displayName = 'Overline';
