import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { baseTypographyStyles } from './styles';
import { CommonTypographyProps, Mode } from './types';
import { palette } from '@leafygreen-ui/palette';

/**
 * Disclaimer
 */
const disclaimer = css`
  display: block;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.2px;
`;

export const disclaimerTextColor: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Mode.Dark]: css`
    color: ${palette.gray.light1};
  `,
};

type DisclaimerProps = HTMLElementProps<'small'> & CommonTypographyProps;

export function Disclaimer({
  darkMode,
  children,
  className,
  ...rest
}: DisclaimerProps) {
  // TODO: Replace with context
  const mode = darkMode ? Mode.Dark : Mode.Light;
  return (
    <small
      {...rest}
      className={cx(
        baseTypographyStyles,
        disclaimer,
        disclaimerTextColor[mode],
        className,
      )}
    >
      {children}
    </small>
  );
}

Disclaimer.displayName = 'Disclaimer';

export default Disclaimer;
