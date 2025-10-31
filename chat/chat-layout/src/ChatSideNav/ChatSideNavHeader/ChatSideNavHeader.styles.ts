import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

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
  width: 100%;

  ${getBorderBottomStyle(theme)};
`;

export const getHeaderStyles = ({
  className,
  theme,
}: {
  className?: string;
  theme: Theme;
}) => cx(getBaseHeaderStyles(theme), className);

const baseAvatarContainerStyles = css`
  height: ${HEADER_SUB_CONTAINER_HEIGHT}px;
  display: flex;
  align-items: center;
  gap: ${spacing[150]}px;
  padding: 0 ${spacing[400]}px;
`;

export const getAvatarContainerStyles = ({
  addBorderBottom,
  theme,
}: {
  addBorderBottom: boolean;
  theme: Theme;
}) =>
  cx(baseAvatarContainerStyles, {
    [getBorderBottomStyle(theme)]: addBorderBottom,
  });

export const getButtonStyles = (theme: Theme) => css`
  border-radius: 0;
  border: none;
  height: ${HEADER_SUB_CONTAINER_HEIGHT}px;
  // Non-token value used because ButtonContent padding is not customizable
  padding: ${spacing[300]}px 9px;
  width: 100%;
  background-color: ${color[theme].background[Variant.Secondary][
    InteractionState.Default
  ]};

  &:hover,
  &:active {
    box-shadow: none;
    background-color: ${color[theme].background[Variant.Secondary][
      InteractionState.Hover
    ]};
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
