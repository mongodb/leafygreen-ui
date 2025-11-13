import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  transitionDuration,
  Variant,
} from '@leafygreen-ui/tokens';

const containerStyles = css`
  display: flex;
  gap: ${spacing[100]}px;
  align-items: center;
  opacity: 1;
  transition-property: opacity, display;
  transition-duration: ${transitionDuration.slower}ms;
  transition-timing-function: ease-out;
  transition-behavior: allow-discrete;
`;

const fadedContainerStyles = css`
  opacity: 0;
  display: none;
`;

export const getContainerStyles = (shouldFade: boolean) =>
  cx(containerStyles, {
    [fadedContainerStyles]: shouldFade,
  });

export const getIconFill = (theme: Theme) =>
  color[theme].icon[Variant.Success][InteractionState.Default];

export const getTextStyles = (theme: Theme) => css`
  color: ${color[theme].text[Variant.Secondary][InteractionState.Default]};
`;
