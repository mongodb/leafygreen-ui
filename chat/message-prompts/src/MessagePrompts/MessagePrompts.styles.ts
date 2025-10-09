import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  transitionDuration,
  Variant,
} from '@leafygreen-ui/tokens';

const CONTAINER_MAX_WIDTH = 400;
const FOCUS_RING_WIDTH = 4;

const baseOuterWrapperStyles = css`
  max-width: ${CONTAINER_MAX_WIDTH}px;
  overflow: hidden;
  margin: -${FOCUS_RING_WIDTH}px;
  padding: ${FOCUS_RING_WIDTH}px;
  display: grid;
  grid-template-rows: 1fr;
  gap: ${spacing[200]}px;
`;

const transitionStyles = css`
  transform-origin: bottom right;
  transition-property: grid-template-rows, opacity, transform;
  transition-duration: ${transitionDuration.slower}ms;
  transition-timing-function: ease-out;
`;

const hiddenWrapperStyles = css`
  grid-template-rows: 0fr;
  opacity: 0;
  transform: scale(0.8);
`;

export const getOuterWrapperStyles = ({
  enableTransition,
  shouldHide,
}: {
  enableTransition: boolean;
  shouldHide: boolean;
}) =>
  cx(baseOuterWrapperStyles, {
    [transitionStyles]: enableTransition,
    [hiddenWrapperStyles]: shouldHide,
  });

export const innerWrapperStyles = css`
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing[200]}px;
  align-items: flex-start;
`;

export const headerStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[50]}px;
`;

export const getLabelStyles = (theme: Theme) => css`
  color: ${color[theme].text[Variant.Secondary][InteractionState.Default]};
`;

export const childrenContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[200]}px;
`;
