import { CSS, Transform } from '@dnd-kit/utilities';

import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

import { ChartStates } from './Chart.types';

export const chartWrapperClassName = createUniqueClassName('chart-wrapper');

const getBaseContainerStyles = (theme: Theme) => css`
  background: ${color[theme].background[Variant.Primary][
    InteractionState.Default
  ]};
  display: grid;
  grid-template-areas:
    'chartHeader'
    'chart';
  height: 316px; // 280px + 36px for header
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr;
  width: 100%;
`;

/**
 * The CSS helper is a helper for generating CSS transform strings, and is
 * equivalent to manually constructing the string as such:
 *
 * CSS.Translate.toString(transform) === `translate3d(${translate.x}, ${translate.y}, 0)`
 */
const getDraggableContainerStyles = (
  transform: Transform | null,
  transition?: string,
) => css`
  transform: ${CSS.Transform.toString(transform)};
  transition: ${transition};
`;

const getDraggingContainerStyles = () => css`
  opacity: 0.3;
`;

// TODO: This should be a token once we audit our shadows
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
  isDraggable,
  state,
}: {
  theme: Theme;
  transform: Transform | null;
  transition?: string;
  isDraggable: boolean;
  state: ChartStates;
}) =>
  cx(getBaseContainerStyles(theme), {
    [getDraggableContainerStyles(transform, transition)]: isDraggable,
    [getDraggingContainerStyles()]: state === ChartStates.Dragging,
    [getOverlayContainerStyles(theme)]: state === ChartStates.Overlay,
  });

export const getChartHeaderContainerStyles = ({
  theme,
  state,
  isDraggable,
}: {
  theme: Theme;
  state: ChartStates;
  isDraggable: boolean;
}) =>
  cx(
    css`
      grid-area: chartHeader;
      background: ${state === ChartStates.Overlay
        ? color[theme].background[Variant.Primary][InteractionState.Hover]
        : 'none'};
    `,
    {
      [css`
        cursor: move;
      `]: isDraggable,
    },
  );

const baseChartWrapperStyles = css`
  position: relative;
  display: block;
  grid-area: chart;
  width: 100%;
`;

export const chartWrapperStyles = cx(
  baseChartWrapperStyles,
  chartWrapperClassName,
);

export const chartStyles = css`
  height: 100%;
  width: 100%;
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
