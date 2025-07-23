import { css } from '@leafygreen-ui/emotion';
import { typeScales } from '@leafygreen-ui/tokens';

import { Size } from '../types';

// base styles
export const basePipelineStyles = css`
  display: flex;
  counter-reset: hiddenCount;
  font-weight: 600;
`;

export const basePipelineListStyles = css`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  overflow: hidden;
  list-style: none;
  padding: 0;
  margin: 0;
  min-width: 74px;
`;

export const counterVisibleStyles = css`
  display: flex;
`;

export const baseSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    font-size: ${typeScales.body1.fontSize}px;
    height: 22px;
  `,
  [Size.Small]: css`
    font-size: ${typeScales.body1.fontSize}px;
    height: 28px;
  `,
  [Size.Normal]: css`
    font-size: ${typeScales.body1.fontSize}px;
    height: 36px;
  `,
  [Size.Large]: css`
    font-size: 18px;
    height: 48px;
  `,
};

export const tooltipStyles = css`
  max-width: 400px;
`;
