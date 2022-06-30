import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps, ThemedStyles } from '@leafygreen-ui/lib';
import { baseTypographyStyles } from './styles';
import { CommonTypographyProps, Theme } from './types';
import { palette } from '@leafygreen-ui/palette';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

/**
 * Disclaimer
 */
const disclaimer = css`
  display: block;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.2px;
`;

export const disclaimerTextColor: ThemedStyles = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
};

type DisclaimerProps = HTMLElementProps<'small'> & CommonTypographyProps;

export function Disclaimer({
  darkMode: darkModeProp,
  children,
  className,
  ...rest
}: DisclaimerProps) {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <small
      {...rest}
      className={cx(
        baseTypographyStyles,
        disclaimer,
        disclaimerTextColor[theme],
        className,
      )}
    >
      {children}
    </small>
  );
}

Disclaimer.displayName = 'Disclaimer';

export default Disclaimer;
