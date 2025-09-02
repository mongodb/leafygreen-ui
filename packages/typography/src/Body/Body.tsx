import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';
import {
  FontWeight,
  fontWeights as fontWeightTokens,
} from '@leafygreen-ui/tokens';

import {
  baseTypographyStyles,
  bodyTypeScaleStyles,
  defaultTextColor,
} from '../styles';
import { useUpdatedBaseFontSize } from '../utils/useUpdatedBaseFontSize';

import { BaseBodyProps } from './Body.types';

const Body = Polymorphic<BaseBodyProps>(
  ({
    baseFontSize: baseFontSizeOverride,
    darkMode: darkModeProp,
    className,
    weight = FontWeight.Regular,
    as = 'p' as PolymorphicAs,
    ...rest
  }) => {
    const { theme } = useDarkMode(darkModeProp);
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeOverride);
    const { Component } = usePolymorphic(as);

    // Currently hardcoding selectors to keys; could consider a dynamic solution that runs once
    const fontWeight = css`
      font-weight: ${fontWeightTokens[weight]};
      strong,
      b {
        font-weight: ${fontWeightTokens.semiBold};
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
