import { CSS, Transform } from '@dnd-kit/utilities';

import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  InteractionState,
  spacing,
  transitionDuration,
  Variant,
} from '@leafygreen-ui/tokens';

import { ChartCardStates } from './ChartCard.types';

const getBaseContainerStyles = (theme: Theme) => css`
  background: ${color[theme].background[Variant.Primary][
    InteractionState.Default
  ]};
  border: 1px solid
    ${color[theme].border[Variant.Disabled][InteractionState.Default]};
  border-radius: ${borderRadius[200]}px;
  overflow: hidden;
  width: 100%;
  display: grid;
  grid-template-rows: 40px 0fr;
  transition: grid-template-rows ${transitionDuration.slower}ms ease-in-out;
`;

const getSortableContainerStyles = (
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
const getOverlayContainerStyles = () => css`
  box-shadow: 0 18px 18px -15px rgba(0, 30, 43, 0.2);
`;

export const getContainerStyles = ({
  theme,
  transition,
  transform,
  isDraggable,
  isOpen,
  state,
  className,
}: {
  theme: Theme;
  transition?: string;
  transform: Transform | null;
  isDraggable: boolean;
  isOpen: boolean;
  state: ChartCardStates;
  className?: string;
}) =>
  cx(
    getBaseContainerStyles(theme),
    {
      [openContainerStyles]: isOpen,
      [getSortableContainerStyles(transform, transition)]: isDraggable,
      [getDraggingContainerStyles()]: state === ChartCardStates.Dragging,
      [getOverlayContainerStyles()]: state === ChartCardStates.Overlay,
    },
    className,
  );

export const openContainerStyles = css`
  grid-template-rows: 40px 1fr;
`;

export const getHeaderStyles = ({
  theme,
  state,
  isDraggable,
  className,
}: {
  theme: Theme;
  state: ChartCardStates;
  isDraggable: boolean;
  className?: string;
}) =>
  cx(
    css`
      width: 100%;
      height: 100%;
      padding: ${spacing[150]}px ${spacing[300]}px;
      display: grid;
      grid-template-columns: auto 1fr;
      background: 'none';
    `,
    {
      [css`
        cursor: move;
      `]: isDraggable,
      [css`
        background: ${color[theme].background[Variant.Primary][
          InteractionState.Hover
        ]};
      `]: state === ChartCardStates.Overlay,
    },
    className,
  );

export const childrenContainerStyles = css`
  overflow: hidden;
`;

export const toggleButtonStyles = css`
  margin-right: ${spacing[100]}px;
`;

export const toggleIconStyles = css`
  transform: rotate(-90deg);
  transition: transform ${transitionDuration.slower}ms ease-in-out;
`;

export const openToggleIconStyles = css`
  transform: rotate(0deg);
`;

export const leftInnerContainerStyles = css`
  display: flex;
  align-items: center;
`;
