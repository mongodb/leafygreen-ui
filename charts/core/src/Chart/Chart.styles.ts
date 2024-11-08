import { css } from '@leafygreen-ui/emotion';

export const chartContainerStyles = css`
  display: grid;
  grid-template-areas:
    'chartHeader'
    'chart';
  width: 100%;
`;

export const chartStyles = css`
  display: block;
  grid-area: chart;
  height: 280px;
  width: 100%;
`;
