import React from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  Polymorphic,
  PolymorphicAs,
  usePolymorphic,
} from '@leafygreen-ui/polymorphic';

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
