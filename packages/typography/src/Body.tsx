import React from 'react';
import Box from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import {
  baseTypographyStyles,
  bodyTypeScaleStyles,
  defaultTextColor,
} from './styles';
import { CommonTypographyProps, Mode } from './types';
import { useUpdatedBaseFontSize } from '.';

/**
 * Body
 */

type BodyFontWeight = 'regular' | 'medium';
type BodyProps<T extends keyof JSX.IntrinsicElements> = HTMLElementProps<T> &
  CommonTypographyProps & {
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
      className={cx(
        baseTypographyStyles,
        bodyTypeScaleStyles[baseFontSize],
        defaultTextColor[mode],
        fontWeight,
        className,
      )}
      {...rest}
    />
  );
}

Body.displayName = 'Body';

export default Body;
