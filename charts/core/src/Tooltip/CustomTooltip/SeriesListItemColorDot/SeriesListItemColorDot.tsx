import React from 'react';

import { getColorDotStyle } from './SeriesListItemColorDot.styles';
import { SeriesListItemColorDotProps } from './SeriesListItemColorDot.types';

export function SeriesListItemColorDot({ color }: SeriesListItemColorDotProps) {
  return <span className={getColorDotStyle(color)}></span>;
}
