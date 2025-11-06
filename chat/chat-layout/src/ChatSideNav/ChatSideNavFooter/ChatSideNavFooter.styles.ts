import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
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

const BUTTON_HEIGHT = 48;
/**
 * Adding 1px to the height due to the border being included in the height
 * when `box-sizing: border-box` is used
 */
const FOOTER_HEIGHT = 48 + 1;

const getBaseFooterStyles = (theme: Theme) => css`
  overflow: hidden;
  background-color: ${color[theme].background[Variant.Secondary][
    InteractionState.Default
  ]};
  width: 100%;
  max-width: ${PINNED_SIDE_NAV_WIDTH}px;
  height: ${FOOTER_HEIGHT}px;
  border-top: 1px solid
    ${color[theme].border[Variant.Secondary][InteractionState.Default]};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: max-width ${SIDE_NAV_TRANSITION_DURATION}ms ease-in-out;
`;

const collapsedFooterStyles = css`
  max-width: ${COLLAPSED_SIDE_NAV_WIDTH}px;
`;

export const getFooterStyles = ({
  className,
  shouldRenderExpanded,
  theme,
}: {
  className?: string;
  shouldRenderExpanded: boolean;
  theme: Theme;
}) =>
  cx(
    getBaseFooterStyles(theme),
    {
      [collapsedFooterStyles]: !shouldRenderExpanded,
    },
    className,
  );

export const getButtonStyles = (theme: Theme) => css`
  border-radius: 0;
  border: none;
  height: ${BUTTON_HEIGHT}px;
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

  // Override the properties in ButtonContent
  div:nth-child(2) {
    padding: ${spacing[400]}px;
    justify-content: flex-end;
  }
`;
