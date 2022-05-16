import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { baseTypographyStyles, defaultTextColor } from './styles';
import { CommonTypographyProps, Mode } from './types';

/**
 * ChartLabel
 */
const chart = css`
  display: block;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.2px;
`;

type ChartProps = HTMLElementProps<'small'> & CommonTypographyProps;

export function ChartLabel({
  darkMode,
  children,
  className,
  ...rest
}: ChartProps) {
  // TODO: Replace with context
  const mode = darkMode ? Mode.Dark : Mode.Light;
  return (
    <small
      {...rest}
      className={cx(
        baseTypographyStyles,
        chart,
        defaultTextColor[mode],
        className,
      )}
    >
      {children}
    </small>
  );
}

ChartLabel.displayName = 'ChartLabel';

export default ChartLabel;
