import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

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

export const getLoadingOverlayStyles = (theme: Theme) => css`
  background: ${color[theme].background[Variant.Primary][
    InteractionState.Default
  ]};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

export const getLoadingTextStyles = (theme: Theme) => css`
  color: ${color[theme].text[Variant.Secondary][InteractionState.Default]};
`;
