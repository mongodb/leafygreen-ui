import { css } from '@leafygreen-ui/emotion';

export const chartContainerStyles = css`
  display: grid;
  grid-template-areas:
    'chartHeader'
    'chart';
  width: 100%;
`;

export const chartWrapperStyles = css`
  position: relative;
  display: block;
  grid-area: chart;
  height: 280px;
  width: 100%;
`;

export const chartStyles = css`
  height: 100%;
  width: 100%;
  z-index: 0;
`;

export const loadingOverlayStyles = css`
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
`;
