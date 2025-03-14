import { css } from '@leafygreen-ui/emotion';

import { SeriesListItemColorDotProps } from './SeriesListItemColorDot.types';

export const getColorDotStyle = (
  color: SeriesListItemColorDotProps['color'],
) => css`
  display: inline-block;
  margin-right: 5px;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: ${color};
`;
