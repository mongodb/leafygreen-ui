import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  InteractionState,
  Variant,
} from '@leafygreen-ui/tokens';

const TOOL_CARD_MIN_WIDTH = 200;

export const getBaseContainerStyles = ({
  isErrorState,
  theme,
}: {
  isErrorState: boolean;
  theme: Theme;
}) => css`
  overflow: hidden;
  min-width: ${TOOL_CARD_MIN_WIDTH}px;
  border: 1px solid
    ${color[theme].border[isErrorState ? Variant.OnError : Variant.Secondary][
      InteractionState.Default
    ]};
  border-radius: ${borderRadius[200]}px;
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

export const getContentContainerStyles = ({
  isErrorState,
  shouldRenderBorderTop,
  theme,
}: {
  isErrorState: boolean;
  shouldRenderBorderTop: boolean;
  theme: Theme;
}) =>
  shouldRenderBorderTop
    ? css`
        border-top: 1px solid
          ${color[theme].border[
            isErrorState ? Variant.OnError : Variant.Secondary
          ][InteractionState.Default]};
      `
    : css``;
