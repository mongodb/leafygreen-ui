import React from 'react';
import Box from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { baseTypographyStyles, defaultTextColor } from './styles';
import { TypographyProps } from './types';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

/**
 * H3
 */
const h3 = css`
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
`;

type H3Props = TypographyProps<'h3'>;

const H3 = ({
  darkMode: darkModeProp,
  className,
  as = 'h3',
  ...rest
}: H3Props) => {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <Box
      as={as}
      className={cx(
        baseTypographyStyles,
        h3,
        defaultTextColor[theme],
        className,
      )}
      {...rest}
    />
  );
};

H3.displayName = 'H3';

export default H3;
