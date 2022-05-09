import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { baseTypographyStyles } from './styles';
import { CommonTypographyProps, Mode } from './types';
import { palette } from '@leafygreen-ui/palette';

/**
 * Charts
 */
const chart = css`
  display: block;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.2px;
`;

const chartColor: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.black};
  `,
  [Mode.Dark]: css`
    color: ${palette.gray.light2};
  `,
};

type ChartProps = HTMLElementProps<'small'> & CommonTypographyProps;

export function Chart({
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
        chartColor[mode],
        className,
      )}
    >
      {children}
    </small>
  );
}

Chart.displayName = 'Chart';

export default Chart;
