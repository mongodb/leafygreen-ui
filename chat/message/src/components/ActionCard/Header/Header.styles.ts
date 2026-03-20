import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import { State } from '../shared.types';

export const getBaseContainerStyles = ({
  isErrorState,
  theme,
}: {
  isErrorState: boolean;
  theme: Theme;
}) => css`
  background-color: ${color[theme].background[
    isErrorState ? Variant.Error : Variant.Secondary
  ][InteractionState.Default]};
  padding: ${spacing[200]}px ${spacing[200]}px ${spacing[300]}px
    ${spacing[300]}px;
  display: flex;
  flex-direction: column;
`;

export const getContainerStyles = ({
  className,
  isErrorState,
  theme,
}: {
  className?: string;
  isErrorState: boolean;
  theme: Theme;
}) => cx(getBaseContainerStyles({ isErrorState, theme }), className);

export const upperRowStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spacing[100]}px;
`;

export const titleContainerStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[150]}px;
`;

const getCanceledTextStyles = (theme: Theme) => css`
  color: ${color[theme].text[Variant.Secondary][InteractionState.Default]};
`;

const getErrorTextStyles = (theme: Theme) => css`
  color: ${color[theme].text[Variant.OnError][InteractionState.Default]};
`;

const getDefaultTextStyles = (theme: Theme) => css`
  color: ${color[theme].text[Variant.Primary][InteractionState.Default]};
`;

export const getTextStyles = ({
  state,
  theme,
}: {
  state: State;
  theme: Theme;
}) => {
  switch (state) {
    case State.Canceled:
      return getCanceledTextStyles(theme);
    case State.Error:
      return getErrorTextStyles(theme);
    case State.Idle:
    case State.Running:
    case State.Success:
    default:
      return getDefaultTextStyles(theme);
  }
};

export const chipsContainerStyles = css`
  padding-top: ${spacing[200]}px;
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[200]}px;
`;
