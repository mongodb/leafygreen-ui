import React from 'react';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { baseTypographyStyles, defaultTextColor } from './styles';
import { CommonTypographyProps, Mode } from './types';

/**
 * H3
 */
const h3 = css`
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
`;

type H3Props = HTMLElementProps<'h3'> & CommonTypographyProps;

const H3: ExtendableBox<H3Props, 'h3'> = ({
  darkMode,
  className,
  ...rest
}: H3Props) => {
  // TODO: Replace with context
  const mode = darkMode ? Mode.Dark : Mode.Light;
  return (
    <Box
      as="h3"
      className={cx(
        baseTypographyStyles,
        h3,
        defaultTextColor[mode],
        className,
      )}
      {...rest}
    />
  );
};

H3.displayName = 'H3';

export default H3;
