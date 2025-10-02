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

const baseContainerStyles = css`
  max-width: ${CONTAINER_MAX_WIDTH}px;
  display: flex;
  flex-direction: column;
  gap: ${spacing[200]}px;
  align-items: flex-start;
`;

const transitionStyles = css`
  transform-origin: bottom right;
  transition: opacity ${transitionDuration.slower}ms ease-out,
    transform ${transitionDuration.slower}ms ease-out,
    display ${transitionDuration.slower}ms ease-out allow-discrete;
`;

const hiddenContainerStyles = css`
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
  display: none;
`;

export const getContainerStyles = ({
  enableTransition,
  shouldHide,
}: {
  enableTransition: boolean;
  shouldHide: boolean;
}) =>
  cx(baseContainerStyles, {
    [transitionStyles]: enableTransition,
    [hiddenContainerStyles]: shouldHide,
  });

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
