import React from 'react';

import Box from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  baseTypographyStyles,
  bodyTypeScaleStyles,
  defaultTextColor,
} from '../styles';
import { useUpdatedBaseFontSize } from '../utils/useUpdatedBaseFontSize';

import { BodyFontWeight, BodyProps } from './Body.types';

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
  baseFontSize: baseFontSizeOverride,
  darkMode: darkModeProp,
  className,
  weight = 'regular',
  as = 'p' as T,
  ...rest
}: BodyProps<T>) {
  const { theme } = useDarkMode(darkModeProp);
  const providerBaseFontSize = useUpdatedBaseFontSize();
  const baseFontSize = baseFontSizeOverride ?? providerBaseFontSize;

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
        defaultTextColor[theme],
        fontWeight,
        className,
      )}
      {...rest}
    />
  );
}

Body.displayName = 'Body';

export default Body;
