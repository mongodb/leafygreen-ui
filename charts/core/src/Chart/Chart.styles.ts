import { CSS, Transform } from '@dnd-kit/utilities';

import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

import { ChartStates } from './Chart.types';

const getBaseContainerStyles = (theme: Theme) => css`
  background: ${color[theme].background[Variant.Primary][
    InteractionState.Default
  ]};
  display: grid;
  grid-template-areas:
    'chartHeader'
    'chart';
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
  width: 100%;
`;

const getSortableContainerStyles = (
  transform: Transform | null,
  transition?: string,
) => css`
  transform: ${CSS.Transform.toString(transform)};
  transition: ${transition};
  cursor: move;
`;

const getDraggingContainerStyles = () => css`
  opacity: 0.3;
`;

const getOverlayContainerStyles = (theme: Theme) => css`
  box-shadow: 0 18px 18px -15px rgba(0, 30, 43, 0.2);
  border: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]};
  border-top: none; // border-top is already applied to the header
`;

export const getChartContainerStyles = ({
  theme,
  transform,
  transition,
  isSortable,
  state,
}: {
  theme: Theme;
  transform: Transform | null;
  transition?: string;
  isSortable: boolean;
  state: ChartStates;
}) =>
  cx(getBaseContainerStyles(theme), {
    [getSortableContainerStyles(transform, transition)]: isSortable,
    [getDraggingContainerStyles()]: state === ChartStates.Dragging,
    [getOverlayContainerStyles(theme)]: state === ChartStates.Overlay,
  });

export const getChartHeaderContainerStyles = (
  theme: Theme,
  state: ChartStates,
) => css`
  grid-area: chartHeader;
  background: ${state === ChartStates.Overlay
    ? color[theme].background[Variant.Primary][InteractionState.Hover]
    : 'none'};
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
