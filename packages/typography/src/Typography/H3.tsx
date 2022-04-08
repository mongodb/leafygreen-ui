import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { baseTypographyStyles } from '../styles';
import { CommonTypographyProps, Mode } from '../types';
import { palette } from '@leafygreen-ui/palette';

/**
 * H3
 */
const h3 = css`
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.3px;
  font-weight: 500;
`;

const h3Color: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.black};
  `,
  [Mode.Dark]: css`
    color: ${palette.gray.light2};
  `,
};

type H3Props = HTMLElementProps<'h3'> & CommonTypographyProps;

export const H3: ExtendableBox<H3Props, 'h3'> = ({
  darkMode,
  className,
  ...rest
}: H3Props) => {
  // TODO: Replace with context
  const mode = darkMode ? Mode.Dark : Mode.Light;
  return (
    <Box
      as="h3"
      className={cx(baseTypographyStyles, h3, h3Color[mode], className)}
      {...rest}
    />
  );
};

H3.displayName = 'H3';
