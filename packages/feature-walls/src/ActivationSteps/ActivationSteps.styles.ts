import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, spacing, transitionDuration } from '@leafygreen-ui/tokens';

const CARD_HORIZONTAL_SPACING = spacing[800];
export const TRANSITION_DURATION = transitionDuration.slower;

export const cardStyles = css`
  overflow: hidden;
  padding: ${spacing[800]}px ${CARD_HORIZONTAL_SPACING}px 0
    ${CARD_HORIZONTAL_SPACING}px;
`;

export const verticalStepperStyles = css`
  padding-bottom: ${spacing[400]}px;
`;

export const childrenContainerStyles = css`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${spacing[200]}px;
`;

const getBaseMessageContainerStyles = (theme: Theme) => css`
  width: calc(100% + 2 * ${CARD_HORIZONTAL_SPACING}px);
  margin: 0 -${CARD_HORIZONTAL_SPACING}px;
  background-color: ${color[theme].background.success.default};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${spacing[100]}px;

  transition-property: content-visibility, opacity, padding, transform;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;
  transition-behavior: allow-discrete;
  content-visibility: hidden;
  opacity: 0;
  padding: 0;
  transform: scaleY(0) translateY(100%);
`;

const visibleMessageContainerStyles = css`
  content-visibility: visible;
  opacity: 1;
  padding: ${spacing[100]}px 0;
  transform: scaleY(1) translateY(0);
`;

export const getMessageContainerStyles = (theme: Theme, showMessage: boolean) =>
  cx(getBaseMessageContainerStyles(theme), {
    [visibleMessageContainerStyles]: showMessage,
  });

export const getIconFill = (theme: Theme) => color[theme].icon.success.default;

export const getMessageStyles = (theme: Theme) => css`
  color: ${palette.green[theme === Theme.Light ? 'dark2' : 'light2']};
`;
