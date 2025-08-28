import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  transitionDuration,
  Variant,
} from '@leafygreen-ui/tokens';

const CONTAINER_MAX_WIDTH = 400;

export const containerStyles = css`
  max-width: ${CONTAINER_MAX_WIDTH}px;
  display: flex;
  flex-direction: column;
  gap: ${spacing[200]}px;
  align-items: flex-start;
`;

export const getLabelStyles = (theme: Theme) => css`
  color: ${color[theme].text[Variant.Secondary][InteractionState.Default]};
`;

export const childrenContainerStyles = css`
  transition: opacity ${transitionDuration.slower}ms ease-in;
  display: flex;
  flex-direction: column;
  gap: ${spacing[200]}px;
`;
