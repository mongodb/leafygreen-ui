import React from 'react';

import { css } from '@leafygreen-ui/emotion';

const getColorDotStyle = (color: string) => css`
  display: inline-block;
  margin-right: 5px;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: ${color};
`;

export function SeriesListItemColorDot({ color }: { color: string }) {
  return <span className={getColorDotStyle(color)}></span>;
}
