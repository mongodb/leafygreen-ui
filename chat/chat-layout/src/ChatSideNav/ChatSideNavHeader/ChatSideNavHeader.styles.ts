import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import {
  COLLAPSED_SIDE_NAV_WIDTH,
  PINNED_SIDE_NAV_WIDTH,
  SIDE_NAV_TRANSITION_DURATION,
} from '../../constants';

const ASSISTANT_AVATAR_SIZE = 20;
const AVATAR_WRAPPER_HORIZONTAL_PADDING = 14;
/**
 * Adding 1px to the height due to the border being included in the height
 * when `box-sizing: border-box` is used
 */
const HEADER_SUB_CONTAINER_HEIGHT = 48 + 1;

const getBorderBottomStyle = (theme: Theme) => css`
  border-bottom: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
`;

const getBaseHeaderStyles = (theme: Theme) => css`
  background-color: ${color[theme].background[Variant.Secondary][
    InteractionState.Default
  ]};
  width: 100%;
  max-width: ${PINNED_SIDE_NAV_WIDTH}px;
  transition: max-width ${SIDE_NAV_TRANSITION_DURATION}ms ease-in-out;

  ${getBorderBottomStyle(theme)};
`;

const collapsedHeaderStyles = css`
  max-width: ${COLLAPSED_SIDE_NAV_WIDTH}px;
`;

export const getHeaderStyles = ({
  className,
  shouldRenderExpanded,
  theme,
}: {
  className?: string;
  shouldRenderExpanded: boolean;
  theme: Theme;
}) =>
  cx(
    getBaseHeaderStyles(theme),
    {
      [collapsedHeaderStyles]: !shouldRenderExpanded,
    },
    className,
  );

const baseAvatarContainerStyles = css`
  overflow: hidden;
  height: ${HEADER_SUB_CONTAINER_HEIGHT}px;
  padding: 0 ${AVATAR_WRAPPER_HORIZONTAL_PADDING}px;
  display: grid;
  grid-template-columns: ${ASSISTANT_AVATAR_SIZE}px auto;
  align-items: center;
  gap: ${spacing[150]}px;
  transition: grid-template-columns ${SIDE_NAV_TRANSITION_DURATION}ms
    ease-in-out;
`;

const collapsedAvatarContainerStyles = css`
  grid-template-columns: ${ASSISTANT_AVATAR_SIZE}px 0fr;
`;

export const getAvatarContainerStyles = ({
  addBorderBottom,
  shouldRenderExpanded,
  theme,
}: {
  addBorderBottom: boolean;
  shouldRenderExpanded: boolean;
  theme: Theme;
}) =>
  cx(baseAvatarContainerStyles, {
    [collapsedAvatarContainerStyles]: !shouldRenderExpanded,
    [getBorderBottomStyle(theme)]: addBorderBottom,
  });

const baseAssistantNameStyles = css`
  width: 198px;
  opacity: 1;
  transition-property: opacity;
  transition-duration: ${SIDE_NAV_TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;
`;

const hiddenAssistantNameStyles = css`
  opacity: 0;
`;

export const getAssistantNameStyles = ({
  shouldRender,
}: {
  shouldRender: boolean;
}) =>
  cx(baseAssistantNameStyles, {
    [hiddenAssistantNameStyles]: !shouldRender,
  });

export const getButtonStyles = (theme: Theme) => {
  const textColor = palette.green[theme === Theme.Dark ? 'light2' : 'dark2'];

  return css`
    border-radius: 0;
    border: none;
    height: ${HEADER_SUB_CONTAINER_HEIGHT}px;
    // Non-token value used because ButtonContent padding is not customizable
    padding: ${spacing[300]}px 9px;
    width: 100%;
    background-color: ${color[theme].background[Variant.Secondary][
      InteractionState.Default
    ]};
    color: ${textColor};

    &:hover,
    &:active {
      box-shadow: none;
      background-color: ${color[theme].background[Variant.Secondary][
        InteractionState.Hover
      ]};
      color: ${textColor};
    }

    &:focus-visible {
      box-shadow: none;
      background-color: ${color[theme].background[Variant.Secondary][
        InteractionState.Focus
      ]};
      color: ${color[theme].text[Variant.Secondary][InteractionState.Focus]};

      svg {
        color: ${color[theme].text[Variant.Secondary][InteractionState.Focus]};
      }
    }

    // Override the justify-content property in ButtonContent
    div:nth-child(2) {
      justify-content: flex-start;
    }
  `;
};

export const buttonChildrenStyles = css`
  display: grid;
  grid-template-columns: ${ASSISTANT_AVATAR_SIZE}px auto;
  align-items: center;
  gap: ${spacing[200]}px;
  text-align: left;
`;

const baseButtonTextStyles = css`
  width: 200px;
  opacity: 1;
  transition-property: opacity;
  transition-duration: ${SIDE_NAV_TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;
`;

const hiddenButtonTextStyles = css`
  opacity: 0;
`;

export const getButtonTextStyles = ({
  shouldRender,
}: {
  shouldRender: boolean;
}) =>
  cx(baseButtonTextStyles, {
    [hiddenButtonTextStyles]: !shouldRender,
  });
