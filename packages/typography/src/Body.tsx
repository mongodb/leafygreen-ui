import React from 'react';
import Box from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { baseTypographyStyles, bodyTypeScaleStyles } from './styles';
import { useUpdatedBaseFontSize } from '.';
import { CommonTypographyProps, Mode } from './types';
import { palette } from '@leafygreen-ui/palette';

/**
 * Body
 */

type BodyFontWeight = 'regular' | 'medium';
type BodyProps<T extends keyof JSX.IntrinsicElements> = HTMLElementProps<T> & CommonTypographyProps & {
  /**
   * font-weight applied to typography element
   * default: `regular`
   */
  weight?: BodyFontWeight;
  as?: T;
};

const fontWeights: Record<
  'default' | 'strong',
  Record<BodyFontWeight, number>
> = {
  default: {
    regular: 400,
    medium: 500,
  },
  strong: {
    regular: 700,
    medium: 700,
  },
} as const;

const bodyColor: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.black};
  `,
  [Mode.Dark]: css`
    color: ${palette.gray.light2};
  `,
};

export function Body<T extends keyof JSX.IntrinsicElements>({
  darkMode,
  className,
  weight = 'regular',
  as = 'p' as T,
  ...rest
}: BodyProps<T>) {
  // TODO: Replace with context
  const mode = darkMode ? Mode.Dark : Mode.Light;
  const baseFontSize = useUpdatedBaseFontSize();

  // Currently hardcoding selectors to keys; could consider a dynamic solution that runs once
  const fontWeight = css`
    font-weight: ${fontWeights['default'][weight]};
    strong,
    b {
      font-weight: ${fontWeights['strong'][weight]};
    }
  `;

  return (
    <Box
      as={as}
      className={cx(baseTypographyStyles,
        bodyTypeScaleStyles[baseFontSize],
        bodyColor[mode],
        fontWeight,
        className,)}
      {...rest}
    />
  );
}

Body.displayName = 'Body';

export default Body;
