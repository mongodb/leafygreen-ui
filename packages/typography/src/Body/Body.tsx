import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';
import { fontWeights as fontWeightTokens } from '@leafygreen-ui/tokens';

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
    regular: fontWeightTokens.regular,
    medium: fontWeightTokens.medium,
  },
  strong: {
    regular: fontWeightTokens.bold,
    medium: fontWeightTokens.bold,
  },
} as const;

const Body = Polymorphic<BodyProps>(
  ({
    baseFontSize: baseFontSizeOverride,
    darkMode: darkModeProp,
    className,
    weight = 'regular',
    as = 'p' as PolymorphicAs,
    ...rest
  }) => {
    const { theme } = useDarkMode(darkModeProp);
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeOverride);
    const { Component } = usePolymorphic(as);

    // Currently hardcoding selectors to keys; could consider a dynamic solution that runs once
    const fontWeight = css`
      font-weight: ${fontWeights['default'][weight]};
      strong,
      b {
        font-weight: ${fontWeights['strong'][weight]};
      }
    `;

    return (
      <Component
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
  },
);

Body.displayName = 'Body';

export default Body;
