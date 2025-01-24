import { css } from '@leafygreen-ui/emotion';

export const chartContainerStyles = css`
  display: grid;
  grid-template-areas:
    'chartHeader'
    'chart';
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
  width: 100%;
`;

export const chartHeaderContainerStyles = css`
  grid-area: chartHeader;
`;

export const chartStyles = css`
  display: block;
  grid-area: chart;
  height: 280px;
  width: 100%;
`;
